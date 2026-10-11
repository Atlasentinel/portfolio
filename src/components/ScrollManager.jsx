import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Remonte en haut à chaque changement de page, ou défile jusqu'à l'ancre (#projets…). */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // attendre le rendu de la page cible
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
