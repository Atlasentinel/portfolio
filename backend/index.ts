/**
 * Portfolio — serveur Bun
 *  - sert le build React (dossier build/) avec cache + compression
 *  - expose une petite API JSON : lecture publique, écriture réservée à l'admin
 *
 * Variables d'environnement : voir backend/.env.example
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { rename } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

// ─── Configuration ───────────────────────────────────────────────────────────
const ROOT       = resolve(import.meta.dir, "..");
const DATA_DIR   = resolve(process.env.DATA_DIR ?? join(ROOT, "src/data"));
const BUILD_DIR  = resolve(process.env.BUILD_DIR ?? join(ROOT, "build"));
const PORT       = Number(process.env.PORT ?? 3001);
const ADMIN_KEY  = (process.env.ADMIN_KEY ?? "").trim();
const TRUST_PROXY = process.env.TRUST_PROXY === "true"; // true uniquement derrière un reverse proxy (nginx, Caddy…)
const HSTS        = process.env.HSTS === "true";        // true uniquement si le site est servi en HTTPS
const GITHUB_USER = /^[A-Za-z0-9-]{1,39}$/.test(process.env.GITHUB_USER ?? "") ? process.env.GITHUB_USER! : "Atlasentinel";

const list = (v: string | undefined, def: string) =>
  (v ?? def).split(",").map((s) => s.trim()).filter(Boolean);

const ALLOWED_ORIGINS = list(process.env.ALLOWED_ORIGINS, "http://localhost:3000");
const ADMIN_IPS       = list(process.env.ADMIN_IPS, "127.0.0.1,::1").map(normalizeIp);

// Une clé faible ou laissée par défaut désactive complètement l'écriture.
const WEAK_KEYS = new Set(["", "CHANGE_MOI_AVANT_DE_DEPLOYER", "portfolio-admin-key", "mon-mot-de-passe-secret"]);
const WRITE_ENABLED = !WEAK_KEYS.has(ADMIN_KEY) && ADMIN_KEY.length >= 32;
const ADMIN_KEY_HASH = createHash("sha256").update(ADMIN_KEY).digest();

const DATA_FILES = { projects: "projects.json", education: "education.json", experience: "experience.json" } as const;

// ─── En-têtes de sécurité ────────────────────────────────────────────────────
const CSP = [
  "default-src 'self'",
  // uspot.fr : widget officiel Uspot (script + images + API publique)
  "script-src 'self' https://uspot.fr",
  // 'unsafe-inline' : le widget Uspot injecte sa feuille de style dans son Shadow DOM
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://uspot.fr",
  "font-src 'self'",
  "connect-src 'self' https://uspot.fr",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(HSTS ? ["upgrade-insecure-requests"] : []),
].join("; ");

const SEC: Record<string, string> = {
  "Content-Security-Policy": CSP,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  ...(HSTS ? { "Strict-Transport-Security": "max-age=31536000; includeSubDomains" } : {}),
};

// ─── Utilitaires ─────────────────────────────────────────────────────────────
function normalizeIp(ip: string) {
  return ip.replace(/^::ffff:/, "").trim();
}

function log(lvl: "INFO" | "WARN" | "ERROR", msg: string) {
  // retire les retours à la ligne pour éviter l'injection dans les logs
  console.log(`[${new Date().toISOString()}] [${lvl}] ${msg.replace(/[\r\n]+/g, " ").slice(0, 500)}`);
}

function clientIp(req: Request, server: { requestIP(r: Request): { address: string } | null }) {
  if (TRUST_PROXY) {
    // Le reverse proxy AJOUTE l'IP du client à droite : c'est la seule valeur fiable.
    const xff = req.headers.get("x-forwarded-for");
    const last = xff?.split(",").map((s) => s.trim()).filter(Boolean).pop();
    if (last) return normalizeIp(last);
  }
  return normalizeIp(server.requestIP(req)?.address ?? "unknown");
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...SEC, ...extra, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// ─── Limitation de débit (mémoire, par IP) ───────────────────────────────────
const rl = new Map<string, { n: number; reset: number }>();
const RL_MAX_KEYS = 10_000;

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rl) if (now > v.reset) rl.delete(k);
}, 60_000).unref?.();

function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const e = rl.get(key);
  if (!e || now > e.reset) {
    if (rl.size >= RL_MAX_KEYS) rl.clear(); // protège la mémoire
    rl.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  if (e.n >= max) return false;
  e.n++;
  return true;
}

// ─── Authentification admin ──────────────────────────────────────────────────
function isAdmin(req: Request, ip: string) {
  if (!WRITE_ENABLED) return false;
  if (!ADMIN_IPS.includes(ip)) return false; // correspondance EXACTE
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return false;
  const given = createHash("sha256").update(auth.slice(7).trim()).digest();
  return timingSafeEqual(given, ADMIN_KEY_HASH); // comparaison à temps constant
}

// ─── Validation des projets ──────────────────────────────────────────────────
const ID_RE    = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const IMG_RE   = /^[a-z0-9][a-z0-9._-]*\.(webp|png|jpe?g)$/i;
const KINDS    = ["perso", "school", "internship", "client"];
const STATUSES = ["live", "wip", "offline", "private"];

type Bi = { fr: string; en: string };
type Project = Record<string, unknown>;

class ValidationError extends Error {}
const fail = (m: string): never => { throw new ValidationError(m); };

const str = (v: unknown, name: string, max = 300) =>
  typeof v === "string" && v.length <= max ? v : fail(`${name} : chaîne ≤ ${max} caractères attendue`);

const bi = (v: unknown, name: string, max = 400): Bi => {
  if (!v || typeof v !== "object") fail(`${name} : objet {fr, en} attendu`);
  const o = v as Record<string, unknown>;
  return { fr: str(o.fr, `${name}.fr`, max), en: str(o.en, `${name}.en`, max) };
};

const biList = (v: unknown, name: string) => {
  if (!v || typeof v !== "object") fail(`${name} : objet {fr: [], en: []} attendu`);
  const o = v as Record<string, unknown>;
  const arr = (a: unknown, n: string) =>
    Array.isArray(a) && a.length <= 10 ? a.map((s, i) => str(s, `${n}[${i}]`, 1200)) : fail(`${n} : tableau (≤ 10) attendu`);
  return { fr: arr(o.fr, `${name}.fr`), en: arr(o.en, `${name}.en`) };
};

const httpsUrl = (v: unknown, name: string) => {
  const s = str(v, name, 500);
  if (s.startsWith("/files/") && !s.includes("..")) return s;
  try {
    const u = new URL(s);
    if (u.protocol === "https:") return u.href;
  } catch { /* fallthrough */ }
  return fail(`${name} : URL https:// ou chemin /files/… attendu`);
};

function validateProject(input: unknown): Project {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("Objet JSON attendu");
  const b = input as Record<string, unknown>;

  const id = str(b.id, "id", 60);
  if (!ID_RE.test(id)) fail("id : minuscules, chiffres et tirets uniquement");

  const slug = b.slug === null || b.slug === undefined ? null : str(b.slug, "slug", 60);
  if (slug !== null && !ID_RE.test(slug)) fail("slug : minuscules, chiffres et tirets uniquement");

  const kind = str(b.kind ?? "perso", "kind", 20);
  if (!KINDS.includes(kind)) fail(`kind : ${KINDS.join(" | ")}`);
  const status = str(b.status ?? "offline", "status", 20);
  if (!STATUSES.includes(status)) fail(`status : ${STATUSES.join(" | ")}`);

  const date_start = str(b.date_start, "date_start", 7);
  if (!MONTH_RE.test(date_start)) fail("date_start : format AAAA-MM");
  const date_end = b.date_end === null || b.date_end === undefined ? null : str(b.date_end, "date_end", 7);
  if (date_end !== null && !MONTH_RE.test(date_end)) fail("date_end : format AAAA-MM ou null");

  const tags = Array.isArray(b.tags) && b.tags.length <= 12
    ? b.tags.map((t, i) => str(t, `tags[${i}]`, 30))
    : fail("tags : tableau (≤ 12) attendu");

  const img = (v: unknown, n: string) => { const s = str(v, n, 100); return IMG_RE.test(s) ? s : fail(`${n} : nom de fichier image invalide`); };
  const cover = img(b.cover, "cover");
  const gallery = Array.isArray(b.gallery ?? []) && ((b.gallery as unknown[]) ?? []).length <= 12
    ? ((b.gallery as unknown[]) ?? []).map((g, i) => img(g, `gallery[${i}]`))
    : fail("gallery : tableau (≤ 12) attendu");

  const links: Record<string, string> = {};
  if (b.links !== undefined) {
    if (!b.links || typeof b.links !== "object") fail("links : objet attendu");
    for (const k of ["demo", "source", "doc"]) {
      const v = (b.links as Record<string, unknown>)[k];
      if (v !== undefined && v !== null && v !== "") links[k] = httpsUrl(v, `links.${k}`);
    }
  }

  // Liste blanche : tout champ inconnu est ignoré
  const out: Project = {
    id, slug, title: str(b.title, "title", 80),
    featured: b.featured === true,
    kind, status, date_start, date_end, tags,
    summary: bi(b.summary, "summary"),
    links, cover, gallery,
  };
  if (b.cover_fit === "contain") out.cover_fit = "contain";
  if (b.body !== undefined) out.body = biList(b.body, "body");
  if (b.highlights !== undefined) out.highlights = biList(b.highlights, "highlights");
  return out;
}

// ─── Activité GitHub (graphe de contributions, mis en cache) ────────────────
type Contributions = { user: string; total: number; from: string; to: string; updated: string; days: Record<string, [number, number]> };
let ghCache: { at: number; data: Contributions } | null = null;
let ghPending: Promise<Contributions> | null = null;
const GH_TTL = 6 * 60 * 60 * 1000; // 6 h

export function parseContributions(html: string, user: string): Contributions {
  const tips = new Map<string, string>();
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) tips.set(m[1], m[2].trim());

  const days: Contributions["days"] = {};
  let from = "", to = "";
  for (const m of html.matchAll(/<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g)) {
    const tag = m[0];
    const date = m[1];
    const level = Math.min(4, Math.max(0, Number(tag.match(/\bdata-level="(\d)"/)?.[1] ?? 0)));
    const id = tag.match(/\bid="([^"]+)"/)?.[1] ?? "";
    const count = Number((tips.get(id) ?? "").match(/^(\d[\d,]*) contributions?/)?.[1]?.replace(/,/g, "") ?? 0);
    if (!from || date < from) from = date;
    if (!to || date > to) to = date;
    if (level > 0 || count > 0) days[date] = [level, count];
  }
  if (!from) throw new Error("Graphe GitHub introuvable");
  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : Object.values(days).reduce((s, d) => s + d[1], 0);
  return { user, total, from, to, updated: new Date().toISOString().slice(0, 10), days };
}

let ghFailedAt = 0;
const GH_RETRY = 10 * 60 * 1000; // après un échec, on ne réessaie pas avant 10 min

async function getContributions(): Promise<Contributions> {
  if (ghCache && Date.now() - ghCache.at < GH_TTL) return ghCache.data;
  if (Date.now() - ghFailedAt < GH_RETRY) {
    if (ghCache) return ghCache.data;
    throw new Error("GitHub indisponible (nouvel essai plus tard)");
  }
  ghPending ??= (async () => {
    try {
      const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
        headers: { "User-Agent": "portfolio-noe-ziadi", Accept: "text/html" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      const data = parseContributions(await res.text(), GITHUB_USER);
      ghCache = { at: Date.now(), data };
      return data;
    } finally {
      ghPending = null;
    }
  })();
  try {
    return await ghPending;
  } catch (err) {
    ghFailedAt = Date.now();
    if (ghCache) return ghCache.data; // dernière version connue plutôt qu'une erreur
    throw err;
  }
}

// ─── Accès aux fichiers JSON (écritures sérialisées et atomiques) ───────────
async function readData<T>(file: string): Promise<T> {
  return JSON.parse(await Bun.file(join(DATA_DIR, file)).text());
}

let writeQueue: Promise<unknown> = Promise.resolve();
function writeData(file: string, data: unknown) {
  const run = async () => {
    const target = join(DATA_DIR, file);
    const tmp = `${target}.${process.pid}.tmp`;
    await Bun.write(tmp, JSON.stringify(data, null, 2) + "\n");
    await rename(tmp, target); // remplacement atomique : jamais de fichier à moitié écrit
  };
  const p = writeQueue.then(run, run);
  writeQueue = p.catch(() => {});
  return p;
}

async function readBody(req: Request) {
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    throw new ValidationError("Content-Type: application/json attendu");
  }
  try { return await req.json(); }
  catch { throw new ValidationError("JSON invalide"); }
}

// ─── Fichiers statiques ──────────────────────────────────────────────────────
const TEXT_TYPES = /\.(html|js|css|json|svg|txt|xml|webmanifest)$/;
const gzCache = new Map<string, Uint8Array>();

async function serveStatic(req: Request, pathname: string): Promise<Response> {
  let decoded: string;
  try { decoded = decodeURIComponent(pathname); }
  catch { return new Response("Bad Request", { status: 400, headers: SEC }); }

  const rel = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const abs = resolve(BUILD_DIR, rel);

  // Anti « path traversal » et pas de fichiers cachés (.env, .git…)
  const inside = abs === BUILD_DIR || abs.startsWith(BUILD_DIR + sep);
  const hidden = rel.split("/").some((seg) => seg.startsWith("."));
  if (!inside || hidden || rel.includes("\0")) {
    return new Response("Not Found", { status: 404, headers: SEC });
  }

  let file = Bun.file(abs);
  let path = abs;
  if (!(await file.exists())) {
    // Une route React (/projets/roger) → index.html ; un fichier manquant (/x.js) → vraie 404
    if (extname(rel)) return new Response("Not Found", { status: 404, headers: SEC });
    path = join(BUILD_DIR, "index.html");
    file = Bun.file(path);
  }

  const isHashedAsset = rel.startsWith("assets/");
  const headers: Record<string, string> = {
    ...SEC,
    "Content-Type": file.type,
    "Cache-Control": isHashedAsset
      ? "public, max-age=31536000, immutable" // nom de fichier versionné par Vite
      : path.endsWith("index.html") ? "no-cache" : "public, max-age=3600",
  };

  // Compression gzip des fichiers texte (mise en cache en mémoire)
  if (TEXT_TYPES.test(path) && (req.headers.get("accept-encoding") ?? "").includes("gzip")) {
    let gz = gzCache.get(path);
    if (!gz) {
      gz = Bun.gzipSync(new Uint8Array(await file.arrayBuffer()));
      if (isHashedAsset) gzCache.set(path, gz); // index.html n'est pas mis en cache (peut changer)
    }
    return new Response(gz, { headers: { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" } });
  }
  return new Response(file, { headers });
}

// ─── Serveur ─────────────────────────────────────────────────────────────────
const server = Bun.serve({
  port: PORT,
  maxRequestBodySize: 256 * 1024, // 256 Ko max : largement assez pour un projet

  async fetch(req, srv) {
    const url = new URL(req.url);
    const { pathname } = url;
    const ip = clientIp(req, srv);
    const cors = corsHeaders(req.headers.get("origin"));

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...SEC, ...cors } });

    if (!pathname.startsWith("/api/")) {
      if (req.method !== "GET" && req.method !== "HEAD") {
        return new Response("Method Not Allowed", { status: 405, headers: { ...SEC, Allow: "GET, HEAD" } });
      }
      return serveStatic(req, pathname);
    }

    const isWrite = req.method === "POST" || req.method === "PUT" || req.method === "DELETE";
    if (!rateLimit(`${ip}:${isWrite ? "w" : "r"}`, isWrite ? 15 : 120, 60_000)) {
      log("WARN", `Rate limit — ${ip} ${req.method} ${pathname}`);
      return json({ error: "Trop de requêtes. Réessaie dans une minute." }, 429, { ...cors, "Retry-After": "60" });
    }

    try {
      // ── Lecture publique ─────────────────────────────────────
      if (req.method === "GET") {
        const m = pathname.match(/^\/api\/(projects|education|experience)$/);
        if (m) return json(await readData(DATA_FILES[m[1] as keyof typeof DATA_FILES]), 200, cors);

        if (pathname === "/api/github/contributions") {
          try {
            return json(await getContributions(), 200, cors);
          } catch (err) {
            log("WARN", `GitHub indisponible : ${String(err)}`);
            // 204 : le front garde silencieusement son instantané embarqué
            return new Response(null, { status: 204, headers: { ...SEC, ...cors, "Cache-Control": "no-store" } });
          }
        }

        const one = pathname.match(/^\/api\/projects\/([a-z0-9-]{1,60})$/);
        if (one) {
          const p = (await readData<Project[]>(DATA_FILES.projects)).find((x) => x.id === one[1]);
          return p ? json(p, 200, cors) : json({ error: "Introuvable" }, 404, cors);
        }
        return json({ error: "Route introuvable" }, 404, cors);
      }

      if (!isWrite) return json({ error: "Méthode non autorisée" }, 405, cors);

      // ── Écriture : admin uniquement ──────────────────────────
      if (!isAdmin(req, ip)) {
        log("WARN", `Accès admin refusé — IP ${ip} ${req.method} ${pathname}`);
        return json({ error: "Non autorisé" }, 401, cors);
      }

      if (pathname === "/api/projects" && req.method === "POST") {
        const entry = validateProject(await readBody(req));
        const projects = await readData<Project[]>(DATA_FILES.projects);
        if (projects.some((p) => p.id === entry.id)) return json({ error: "Cet id existe déjà" }, 409, cors);
        projects.unshift(entry);
        await writeData(DATA_FILES.projects, projects);
        log("INFO", `Projet ajouté : ${entry.id} (${ip})`);
        return json(entry, 201, cors);
      }

      const match = pathname.match(/^\/api\/projects\/([a-z0-9-]{1,60})$/);
      if (match) {
        const id = match[1];
        const projects = await readData<Project[]>(DATA_FILES.projects);
        const idx = projects.findIndex((p) => p.id === id);
        if (idx === -1) return json({ error: "Introuvable" }, 404, cors);

        if (req.method === "PUT") {
          const patch = await readBody(req);
          if (!patch || typeof patch !== "object" || Array.isArray(patch)) throw new ValidationError("Objet JSON attendu");
          // l'id ne peut pas être modifié ; le résultat complet est revalidé
          const updated = validateProject({ ...projects[idx], ...patch, id });
          projects[idx] = updated;
          await writeData(DATA_FILES.projects, projects);
          log("INFO", `Projet modifié : ${id} (${ip})`);
          return json(updated, 200, cors);
        }

        if (req.method === "DELETE") {
          projects.splice(idx, 1);
          await writeData(DATA_FILES.projects, projects);
          log("INFO", `Projet supprimé : ${id} (${ip})`);
          return json({ success: true }, 200, cors);
        }
      }

      return json({ error: "Route introuvable" }, 404, cors);
    } catch (err) {
      if (err instanceof ValidationError) return json({ error: err.message }, 400, cors);
      log("ERROR", String(err));
      return json({ error: "Erreur interne du serveur" }, 500, cors);
    }
  },

  error(err) {
    log("ERROR", String(err));
    return new Response("Erreur interne", { status: 500, headers: SEC });
  },
});

log("INFO", `Portfolio → http://localhost:${server.port}`);
log("INFO", `CORS : ${ALLOWED_ORIGINS.join(", ")} · IPs admin : ${ADMIN_IPS.join(", ")} · proxy de confiance : ${TRUST_PROXY}`);
if (!WRITE_ENABLED) log("WARN", "ADMIN_KEY absente, par défaut ou trop courte (< 32 caractères) : écriture DÉSACTIVÉE");
