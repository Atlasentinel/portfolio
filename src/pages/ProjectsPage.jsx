import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { sortByDate, useProjects } from "../lib/content";
import ProjectCard from "../components/ProjectCard";
import { ArrowLeftIcon } from "../components/Icons";

export default function ProjectsPage() {
  const { t } = useLang();
  const projects = sortByDate(useProjects());

  return (
    <section className="section container page-top">
      <Link to="/" className="back-link"><ArrowLeftIcon width={16} height={16} /> {t.notFound.home}</Link>
      <div className="section-head">
        <div>
          <h1 className="page-title">{t.projects.allTitle}</h1>
          <p className="muted">{t.projects.allSubtitle}</p>
        </div>
      </div>
      <div className="card-grid">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} eager={i < 3} />)}
      </div>
    </section>
  );
}
