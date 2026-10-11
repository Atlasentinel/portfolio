import { useEffect, useState } from "react";
import staticProjects from "../data/projects.json";
import staticEducation from "../data/education.json";
import staticExperience from "../data/experience.json";

// ── Images ──────────────────────────────────────────────────────────────────
// Toutes les images de src/assets/projects/ sont référencées automatiquement :
// il suffit de déposer un .webp et de mettre son nom dans projects.json.
const projectImages = import.meta.glob("../assets/projects/*.{webp,png,jpg,jpeg}", {
  eager: true,
  import: "default",
});

export function projectImage(name) {
  if (!name) return null;
  return projectImages[`../assets/projects/${name}`] ?? null;
}

// ── Formats ─────────────────────────────────────────────────────────────────
const LOCALES = { fr: "fr-FR", en: "en-GB" };

/** "2025-11" → "nov. 2025" / "Nov 2025" */
export function formatMonth(ym, lang) {
  if (!ym || !/^\d{4}-\d{2}$/.test(ym)) return ym ?? "";
  const [y, m] = ym.split("-").map(Number);
  const s = new Intl.DateTimeFormat(LOCALES[lang], { month: "short", year: "numeric" })
    .format(new Date(Date.UTC(y, m - 1, 1)));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const yearOf = (ym) => (ym ? ym.slice(0, 4) : "");

export function formatPeriod(start, end, lang, sinceLabel) {
  const a = formatMonth(start, lang);
  if (end === null) return `${sinceLabel} ${lang === "fr" ? a.toLowerCase() : a}`;
  if (!end || end === start) return a;
  return `${a} → ${formatMonth(end, lang)}`;
}

/** N'accepte que des liens http(s) ou des chemins locaux — bloque javascript:, data:, etc. */
export function safeUrl(url) {
  if (typeof url !== "string") return null;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}

/** Projets triés du plus récent au plus ancien. */
export function sortByDate(list) {
  return [...list].sort((a, b) => (b.date_start || "").localeCompare(a.date_start || ""));
}

// ── Données ─────────────────────────────────────────────────────────────────
// Les JSON sont embarqués dans le build (affichage instantané). Si l'API Bun
// répond, ses données (éditables sans rebuild) remplacent la version embarquée.
const cache = new Map(); // une seule requête par endpoint et par visite

function load(endpoint) {
  if (!cache.has(endpoint)) {
    cache.set(
      endpoint,
      fetch(endpoint, { headers: { Accept: "application/json" } })
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => (Array.isArray(json) ? json : null))
        .catch(() => null),
    );
  }
  return cache.get(endpoint);
}

function useLiveData(endpoint, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let alive = true;
    load(endpoint).then((json) => { if (alive && json) setData(json); });
    return () => { alive = false; };
  }, [endpoint]);
  return data;
}

export const useProjects = () => useLiveData("/api/projects", staticProjects);
export const useEducation = () => useLiveData("/api/education", staticEducation);
export const useExperience = () => useLiveData("/api/experience", staticExperience);
