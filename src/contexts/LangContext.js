import React, { createContext, useContext, useState } from "react";
import { fr } from "../i18n/fr";
import { en } from "../i18n/en";

const translations = { fr, en };

const LangContext = createContext({
  lang:   "fr",
  t:      fr,
  toggle: () => {},
});

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const toggle = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

/** Hook pratique : const { lang, t, toggle } = useLang(); */
export function useLang() {
  return useContext(LangContext);
}
