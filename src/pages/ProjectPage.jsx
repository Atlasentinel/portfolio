import { Link, useParams } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { formatPeriod, projectImage, safeUrl, sortByDate, useProjects } from "../lib/content";
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, ExternalIcon, LockIcon } from "../components/Icons";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const all = sortByDate(useProjects()).filter((p) => p.slug);
  const index = all.findIndex((p) => p.slug === slug);
  const project = all[index];

  if (!project) return <NotFound />;

  const next = all[(index + 1) % all.length];
  const cover = projectImage(project.cover);
  const gallery = (project.gallery || []).filter((g) => g !== project.cover).map(projectImage).filter(Boolean);
  const demo = safeUrl(project.links?.demo);
  const source = safeUrl(project.links?.source);
  const doc = safeUrl(project.links?.doc);
  const body = project.body?.[lang] || [project.summary?.[lang]];
  const highlights = project.highlights?.[lang];
  const statusNote = { offline: t.projects.offlineNote, private: t.projects.privateNote, wip: t.projects.wipNote }[project.status];

  return (
    <article className="container page-top project">
      <Link to="/projets" className="back-link"><ArrowLeftIcon width={16} height={16} /> {t.projects.back}</Link>

      <header className="project-head">
        <div>
          <p className="mono muted">{t.projects.kinds[project.kind]} · {project.date_start?.slice(0, 4)}</p>
          <h1 className="page-title">{project.title}</h1>
          <p className="lead">{project.summary?.[lang]}</p>
        </div>
        {(demo || source || doc) && (
          <div className="actions">
            {demo && (
              <a className="btn btn-primary" href={demo} target="_blank" rel="noopener noreferrer">
                {t.projects.visit} <ExternalIcon />
              </a>
            )}
            {source && (
              <a className="btn" href={source} target="_blank" rel="noopener noreferrer">
                {t.projects.source} <ExternalIcon />
              </a>
            )}
            {doc && (
              <a className="btn" href={doc} download>
                <DownloadIcon /> {t.projects.doc}
              </a>
            )}
          </div>
        )}
      </header>

      {statusNote && (
        <p className="status-note"><LockIcon /> {statusNote}</p>
      )}

      {cover && (
        <img
          className="project-cover"
          src={cover}
          alt={`${t.projects.screenshotOf} ${project.title}`}
          width="1280"
          height="720"
          fetchPriority="high"
        />
      )}

      <div className="project-layout">
        <div className="project-main">
          <section>
            <h2>{t.projects.aboutTitle}</h2>
            {body.map((para, i) => <p key={i}>{para}</p>)}
          </section>

          {highlights?.length > 0 && (
            <section>
              <h2>{t.projects.highlightsTitle}</h2>
              <ul className="bullets">
                {highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          )}

          {gallery.length > 0 && (
            <section>
              <h2>{t.projects.galleryTitle}</h2>
              <div className="gallery">
                {gallery.map((src, i) => (
                  <a key={src} href={src} target="_blank" rel="noopener">
                    <img src={src} alt={`${t.projects.screenshotOf} ${project.title} (${i + 2})`} loading="lazy" decoding="async" width="640" height="480" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="project-aside">
          <h2 className="visually-hidden">{t.projects.details}</h2>
          <dl className="spec">
            <div><dt>{t.projects.role}</dt><dd>{t.projects.roleValue}</dd></div>
            <div><dt>{t.projects.period}</dt><dd>{formatPeriod(project.date_start, project.date_end, lang, t.projects.since)}</dd></div>
            <div><dt>{t.projects.type}</dt><dd>{t.projects.kinds[project.kind]}</dd></div>
            {project.status && <div><dt>{t.projects.status}</dt><dd>{t.projects.statuses[project.status]}</dd></div>}
            <div>
              <dt>{t.projects.stack}</dt>
              <dd><ul className="tags">{project.tags?.map((tag) => <li key={tag} className="tag">{tag}</li>)}</ul></dd>
            </div>
          </dl>
        </aside>
      </div>

      {next && next.slug !== project.slug && (
        <Link to={`/projets/${next.slug}`} className="next-project">
          <span>
            <span className="muted small">{t.projects.next}</span>
            <span className="next-title">{next.title}</span>
            <span className="muted">{next.summary?.[lang]}</span>
          </span>
          <ArrowRightIcon width={22} height={22} />
        </Link>
      )}
    </article>
  );
}
