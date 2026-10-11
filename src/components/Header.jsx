import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { CloseIcon, MenuIcon } from "./Icons";
import { PROFILE } from "../config";

export default function Header() {
  const { lang, t, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Ferme le menu mobile à chaque navigation
  useEffect(() => setOpen(false), [pathname, hash]);

  const links = [
    { to: "/#projets", label: t.nav.projects },
    { to: "/#experience", label: t.nav.experience },
    { to: "/#competences", label: t.nav.skills },
    { to: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">{t.nav.skip}</a>
      <div className="container header-inner">
        <Link to="/" className="brand">{PROFILE.name}</Link>

        <button
          type="button"
          className="icon-btn menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={t.nav.menu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav id="main-nav" aria-label={t.nav.main} className={`main-nav${open ? " is-open" : ""}`}>
          <ul>
            {links.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
          <div className="lang-switch" role="group" aria-label={t.nav.language}>
            {["fr", "en"].map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
