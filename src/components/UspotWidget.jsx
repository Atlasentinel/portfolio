import { useEffect, useRef } from "react";

/**
 * Widget officiel Uspot (avis de recherche), repliable.
 * Le script est chargé uniquement quand le composant est affiché.
 * Il crée son propre Shadow DOM : son style n'interfère pas avec le site.
 * N'oubliez pas : uspot.fr est autorisé dans la CSP du serveur (backend/index.ts).
 */
export default function UspotWidget({ limit = 8 }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const script = document.createElement("script");
    script.src = "https://uspot.fr/widget.js";
    script.async = true;
    script.dataset.limit = String(limit);
    script.dataset.collapsible = "true";
    container.appendChild(script);
    return () => { container.replaceChildren(); };
  }, [limit]);

  return <div ref={ref} className="uspot-widget" />;
}
