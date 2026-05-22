import { useState, useEffect } from "react";
import staticProjects  from "../data/projects.json";
import staticEducation from "../data/education.json";

/**
 * Récupère les projets depuis l'API Bun.
 * Fallback instantané sur les JSON statiques si l'API est indisponible.
 */
export function useProjects() {
  const [data, setData]       = useState(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setData)
      .catch(() => { /* garde le fallback statique */ })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

/**
 * Récupère les formations depuis l'API Bun.
 * Fallback instantané sur les JSON statiques si l'API est indisponible.
 */
export function useEducation() {
  const [data, setData]       = useState(staticEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/education")
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setData)
      .catch(() => { /* garde le fallback statique */ })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
