import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fr } from "../i18n/fr";
import { en } from "../i18n/en";

const translations = { fr, en };
const STORAGE_KEY = "lang";
const SUPPORTED = ["fr", "en"];

/**
 * Langue initiale, par ordre de priorité :
 *   1. ?lang=en dans l'URL (pratique pour envoyer la version anglaise à un recruteur)
 *   2. choix précédent mémorisé dans le navigateur
 *   3. langue du navigateur (fr* → fr, sinon en)
 */
function detectLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(fromUrl)) return fromUrl;
  } catch { /* ignore */ }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch { /* stockage indisponible (navigation privée…) */ }
  const nav = (navigator.language || "fr").toLowerCase();
  return nav.startsWith("fr") ? "fr" : "en";
}

const LangContext = createContext({ lang: "fr", t: fr, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }, []);

  // <html lang>, titre et description suivent la langue (accessibilité + SEO)
  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, t: translations[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** const { lang, t, setLang } = useLang(); */
export function useLang() {
  return useContext(LangContext);
}
