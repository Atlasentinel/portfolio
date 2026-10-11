import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { projectImage, yearOf } from "../lib/content";
import { LockIcon } from "./Icons";

/** Carte projet. Sans slug → carte non cliquable (pas de fiche détaillée). */
export default function ProjectCard({ project, eager = false }) {
  const { lang, t } = useLang();
  const img = projectImage(project.cover);
  const hasPage = Boolean(project.slug);
  // Indication quand on ne peut pas consulter le projet : pas de fiche, ou site pas en ligne
  const badge = !hasPage
    ? t.projects.unavailable
    : project.status && project.status !== "live" ? t.projects.statuses[project.status] : null;

  const inner = (
    <>
      <div className={`card-media${project.cover_fit === "contain" ? " is-contain" : ""}`}>
        {badge && <span className="card-badge"><LockIcon /> {badge}</span>}
        {img && (
          <img
            src={img}
            alt={`${t.projects.previewOf} ${project.title}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width="640"
            height="400"
          />
        )}
      </div>
      <div className="card-body">
        <div className="card-head">
          <h3 className="card-title">{project.title}</h3>
          <span className="mono muted">{yearOf(project.date_start)}</span>
        </div>
        <p className="card-text">{project.summary?.[lang]}</p>
        <ul className="tags" aria-label={t.projects.stack}>
          {project.tags?.map((tag) => <li key={tag} className="tag">{tag}</li>)}
        </ul>
      </div>
    </>
  );

  return hasPage ? (
    <Link to={`/projets/${project.slug}`} className="card card-link">{inner}</Link>
  ) : (
    <article className="card is-disabled" aria-disabled="true">{inner}</article>
  );
}
