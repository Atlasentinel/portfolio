import { useEffect, useMemo, useState } from "react";
import { useLang } from "../contexts/LangContext";
import { PROFILE } from "../config";
import snapshot from "../data/github-snapshot.json";
import { GitHubIcon } from "./Icons";

const WEEKS = 26; // ~6 mois : tient sous la photo
const LOCALES = { fr: "fr-FR", en: "en-GB" };

// Données en direct via l'API Bun (mise en cache côté serveur),
// avec repli sur l'instantané embarqué si l'API ne répond pas.
function useContributions() {
  const [data, setData] = useState(snapshot);
  useEffect(() => {
    let alive = true;
    fetch("/api/github/contributions", { headers: { Accept: "application/json" } })
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((json) => { if (alive && json?.days && json?.to) setData(json); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return data;
}

const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

export default function GitHubActivity() {
  const { lang, t } = useLang();
  const data = useContributions();

  const weeks = useMemo(() => {
    const end = new Date(`${data.to}T00:00:00Z`);
    // première colonne = le dimanche d'il y a WEEKS-1 semaines (comme sur GitHub)
    const start = addDays(end, -(WEEKS - 1) * 7 - end.getUTCDay());
    const cols = [];
    for (let w = 0; w < WEEKS; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const day = addDays(start, w * 7 + d);
        if (day > end) { col.push(null); continue; }
        const key = iso(day);
        const [level, count] = data.days[key] || [0, 0];
        col.push({ key, level, count, day });
      }
      cols.push(col);
    }
    return cols;
  }, [data]);

  const fmt = new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <figure className="gh-card">
      <figcaption className="gh-head">
        <span className="gh-title"><GitHubIcon width={16} height={16} /> {t.github.title}</span>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="gh-link">@{data.user}</a>
      </figcaption>

      <div className="gh-grid" role="img" aria-label={t.github.total(data.total)}>
        {weeks.map((col, i) => (
          <div className="gh-col" key={i}>
            {col.map((c, j) =>
              c ? (
                <span key={c.key} className={`gh-cell l${c.level}`} title={t.github.day(c.count, fmt.format(c.day))} />
              ) : (
                <span key={j} className="gh-cell is-empty" />
              ),
            )}
          </div>
        ))}
      </div>

      <div className="gh-foot">
        <span>{t.github.total(data.total)}</span>
        <span className="gh-legend" aria-hidden="true">
          {t.github.less}
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`gh-cell l${l}`} />)}
          {t.github.more}
        </span>
      </div>
    </figure>
  );
}
