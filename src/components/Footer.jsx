import { useLang } from "../contexts/LangContext";
import { PROFILE } from "../config";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {PROFILE.name}. {t.footer.rights}</span>
        <span className="footer-links">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </span>
      </div>
    </footer>
  );
}
