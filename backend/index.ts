import { join } from "path";

// ─── Env ──────────────────────────────────────────────────────────────────────
const DATA_DIR    = join(import.meta.dir, "../src/data");
const BUILD_DIR   = join(import.meta.dir, "../build");
const PORT        = Number(process.env.PORT ?? 3001);
const ADMIN_KEY   = process.env.ADMIN_KEY ?? "";

// Origines CORS autorisées (virgule-séparées)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000")
  .split(",").map(s => s.trim()).filter(Boolean);

// IPs autorisées pour les routes admin (vide = localhost uniquement)
const ADMIN_IPS = (process.env.ADMIN_IPS ?? "127.0.0.1,::1")
  .split(",").map(s => s.trim()).filter(Boolean);

// ─── Sécurité : headers systématiques ────────────────────────────────────────
const SEC = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options":        "DENY",
  "X-XSS-Protection":       "1; mode=block",
  "Referrer-Policy":        "strict-origin-when-cross-origin",
};

// ─── CORS dynamique (pas de wildcard *) ──────────────────────────────────────
function buildCors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0] ?? "null";
  return {
    "Access-Control-Allow-Origin":  allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age":       "86400",
    "Vary":                         "Origin",
  };
}

// ─── Rate limiting (in-memory, par IP) ───────────────────────────────────────
const rl = new Map<string, { n: number; reset: number }>();

// Nettoyage périodique pour éviter les fuites mémoire
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rl) if (now > v.reset) rl.delete(k);
}, 60_000);

function rateLimit(ip: string, maxReq: number, windowMs: number): boolean {
  const now   = Date.now();
  const entry = rl.get(ip);
  if (!entry || now > entry.reset) { rl.set(ip, { n: 1, reset: now + windowMs }); return true; }
  if (entry.n >= maxReq) return false;
  entry.n++;
  return true;
}

// ─── Logging ─────────────────────────────────────────────────────────────────
function log(lvl: "INFO" | "WARN" | "ERROR", msg: string) {
  console.log(`[${new Date().toISOString()}] [${lvl}] ${msg}`);
}

// ─── Auth admin (clé Bearer + IP) ────────────────────────────────────────────
function isAdmin(req: Request, ip: string): boolean {
  if (!ADMIN_KEY) return false;                                       // clé non définie → refus total
  if (req.headers.get("Authorization") !== `Bearer ${ADMIN_KEY}`) return false;
  if (ADMIN_IPS.length === 0) return true;                           // liste vide = pas de restriction IP
  return ADMIN_IPS.some(allowed => ip === allowed || ip.endsWith(allowed));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function json(data: unknown, status = 200, cors: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...SEC, ...cors, "Content-Type": "application/json" },
  });
}

async function readJSON<T>(name: string): Promise<T> {
  return JSON.parse(await Bun.file(join(DATA_DIR, name)).text());
}

async function writeJSON(name: string, data: unknown) {
  await Bun.write(join(DATA_DIR, name), JSON.stringify(data, null, 2));
}

async function serveStatic(pathname: string): Promise<Response> {
  const rel  = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const file = Bun.file(join(BUILD_DIR, rel));
  if (await file.exists()) return new Response(file, { headers: SEC });
  return new Response(Bun.file(join(BUILD_DIR, "index.html")), { headers: SEC });
}

// ─── Serveur ──────────────────────────────────────────────────────────────────
Bun.serve({
  port: PORT,

  async fetch(req, server) {
    const url    = new URL(req.url);
    const { pathname } = url;
    const origin = req.headers.get("origin");
    const cors   = buildCors(origin);

    // IP réelle (derrière proxy ou directe)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
            ?? server.requestIP(req)?.address
            ?? "unknown";

    // ── CORS preflight ──────────────────────────────────────────────
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { ...SEC, ...cors } });
    }

    // ── Fichiers statiques (build React) ───────────────────────────
    if (!pathname.startsWith("/api")) {
      return serveStatic(pathname);
    }

    // ── Rate limiting ───────────────────────────────────────────────
    const isWrite = ["POST", "PUT", "DELETE"].includes(req.method);

    // Lecture : 120 req/min | Écriture : 15 req/min
    if (!rateLimit(`${ip}:${isWrite ? "w" : "r"}`, isWrite ? 15 : 120, 60_000)) {
      log("WARN", `Rate limit dépassé — ${ip} ${req.method} ${pathname}`);
      return json({ error: "Trop de requêtes. Réessaie dans 1 minute." }, 429, cors);
    }

    try {
      // ── GET /api/projects ───────────────────────────────────────
      if (pathname === "/api/projects" && req.method === "GET") {
        return json(await readJSON("projects.json"), 200, cors);
      }

      // ── GET /api/education ──────────────────────────────────────
      if (pathname === "/api/education" && req.method === "GET") {
        return json(await readJSON("education.json"), 200, cors);
      }

      // ── Routes admin (écriture) ─────────────────────────────────
      if (isWrite || pathname.match(/^\/api\/projects\/[^/]+$/)) {
        if (!isAdmin(req, ip)) {
          log("WARN", `Accès admin refusé — IP: ${ip}  route: ${req.method} ${pathname}`);
          return json({ error: "Non autorisé" }, 401, cors);
        }
      }

      // ── POST /api/projects ──────────────────────────────────────
      if (pathname === "/api/projects" && req.method === "POST") {
        const body = (await req.json()) as Record<string, unknown>;
        if (!body.id || !body.title) {
          return json({ error: "Champs requis : id, title" }, 400, cors);
        }
        const list  = await readJSON<unknown[]>("projects.json");
        const entry = { ...body };
        list.unshift(entry);
        await writeJSON("projects.json", list);
        log("INFO", `Projet ajouté : ${body.id}  par ${ip}`);
        return json(entry, 201, cors);
      }

      // ── PUT / DELETE /api/projects/:id ──────────────────────────
      const match = pathname.match(/^\/api\/projects\/([^/]+)$/);
      if (match) {
        const id   = match[1];
        const list = await readJSON<Array<Record<string, unknown>>>("projects.json");

        if (req.method === "PUT") {
          const idx = list.findIndex(p => p.id === id);
          if (idx === -1) return json({ error: "Introuvable" }, 404, cors);
          list[idx] = { ...list[idx], ...(await req.json()) };
          await writeJSON("projects.json", list);
          log("INFO", `Projet modifié : ${id}  par ${ip}`);
          return json(list[idx], 200, cors);
        }

        if (req.method === "DELETE") {
          const next = list.filter(p => p.id !== id);
          if (next.length === list.length) return json({ error: "Introuvable" }, 404, cors);
          await writeJSON("projects.json", next);
          log("INFO", `Projet supprimé : ${id}  par ${ip}`);
          return json({ success: true }, 200, cors);
        }
      }

      return json({ error: "Route introuvable" }, 404, cors);

    } catch (err) {
      log("ERROR", String(err));
      return json({ error: "Erreur interne du serveur" }, 500, cors);
    }
  },
});

// ─── Démarrage ────────────────────────────────────────────────────────────────
log("INFO", `🚀 Portfolio API  →  http://localhost:${PORT}`);
log("INFO", `🌐 Origines CORS  →  ${ALLOWED_ORIGINS.join(", ")}`);
log("INFO", `🔒 IPs admin      →  ${ADMIN_IPS.join(", ") || "aucune restriction"}`);
if (!ADMIN_KEY) log("WARN", "⚠️  ADMIN_KEY non définie — routes d'écriture DÉSACTIVÉES");
