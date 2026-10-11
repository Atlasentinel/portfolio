import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useEducation, useExperience, useProjects } from "../lib/content";
import ProjectCard from "../components/ProjectCard";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../components/Icons";
import { PROFILE } from "../config";
import portrait from "../assets/pp.webp";
import GitHubActivity from "../components/GitHubActivity";
import UspotWidget from "../components/UspotWidget";

export default function Home() {
  const { lang, t } = useLang();
  const projects = useProjects();
  const education = useEducation();
  const experience = useExperience();
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero container">
        <div className="hero-text">
          <span className="status-pill"><span className="dot" aria-hidden="true" />{t.hero.status}</span>
          <h1>
            {t.hero.titleLine1}<br />
            <span className="muted-strong">{t.hero.titleLine2}</span>
          </h1>
          <figure className="hero-quote">
            <blockquote>{t.hero.quote}</blockquote>
            <figcaption>{t.hero.quoteAuthor}</figcaption>
          </figure>
          <div className="actions">
            <a className="btn btn-primary" href={PROFILE.cv} download>
              <DownloadIcon /> {t.hero.cv}
            </a>
            <a className="btn" href="#contact">{t.hero.contact}</a>
            <a className="btn btn-icon" href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a className="btn btn-icon" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <aside className="hero-aside">
          <img className="portrait" src={portrait} alt={t.hero.photoAlt} width="200" height="200" fetchPriority="high" />
          <GitHubActivity />
          <UspotWidget />
        </aside>
      </section>

      {/* ── En bref ──────────────────────────────────────────── */}
      <section className="container" aria-label={t.facts.label}>
        <dl className="facts">
          <div><dt>{t.facts.degree}</dt><dd>{t.facts.degreeValue}</dd></div>
          <div><dt>{t.facts.experience}</dt><dd>{t.facts.experienceValue}</dd></div>
          <div><dt>{t.facts.location}</dt><dd>{t.facts.locationValue}</dd></div>
          <div><dt>{t.facts.languages}</dt><dd>{t.facts.languagesValue}</dd></div>
        </dl>
      </section>

      {/* ── Projets ──────────────────────────────────────────── */}
      <section id="projets" className="section container" aria-labelledby="projets-title">
        <div className="section-head">
          <div>
            <h2 id="projets-title">{t.projects.title}</h2>
            <p className="muted">{t.projects.subtitle}</p>
          </div>
          <Link className="link-arrow" to="/projets">
            {t.projects.all} ({projects.length}) <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
        <div className="card-grid">
          {featured.map((p, i) => <ProjectCard key={p.id} project={p} eager={i < 2} />)}
        </div>
      </section>

      {/* ── Expérience & formation ───────────────────────────── */}
      <section id="experience" className="section container two-cols">
        <div>
          <h2>{t.experience.title}</h2>
          <ol className="timeline">
            {experience.map((x) => (
              <li key={x.id}>
                <span className="mono muted">{x.period}</span>
                <div>
                  <p className="tl-title">{x.company} <span className="muted">· {x.place}</span></p>
                  <p className="tl-sub">{x.role?.[lang]}</p>
                  <p className="tl-desc">{x.desc?.[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>{t.education.title}</h2>
          <ol className="timeline">
            {education.map((e) => (
              <li key={e.id}>
                <span className="mono muted">{e.period}</span>
                <div>
                  <p className="tl-title">{e.title?.[lang]}</p>
                  <p className="tl-sub">{e.school}</p>
                  <p className="tl-desc">{e.detail?.[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Compétences ──────────────────────────────────────── */}
      <section id="competences" className="section container">
        <h2>{t.skills.title}</h2>
        <div className="skill-grid">
          {t.skills.groups.map((g) => (
            <div key={g.name} className="skill-box">
              <p className="skill-name">{g.name}</p>
              <p>{g.items}</p>
            </div>
          ))}
        </div>
        <p className="muted skills-also"><strong>{t.skills.alsoLabel}</strong> {t.skills.also}</p>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" className="section container">
        <div className="contact-box">
          <div>
            <h2>{t.contact.title}</h2>
            <p className="muted">{t.contact.text}</p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
              <MailIcon /> {PROFILE.email}
            </a>
            <a className="btn btn-light" href={PROFILE.cv} download>{t.contact.cv}</a>
          </div>
        </div>
      </section>
    </>
  );
}
