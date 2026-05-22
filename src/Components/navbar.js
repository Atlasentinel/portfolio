import React, { useState, useEffect } from "react";
import MenuBar   from "./Icons/menuBar";
import MenuCross from "./Icons/menuCross";
import { useLang } from "../contexts/LangContext";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle }     = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "block py-2 px-3 text-sky-950 rounded transition-colors duration-200 " +
    "hover:bg-[#b1abff] md:hover:bg-transparent md:border-0 md:hover:text-[#675fd3] md:p-0";

  return (
    <nav
      className={`fixed w-screen z-10 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-sky-950 hover:text-[#675fd3] transition-colors duration-200"
        >
          Noé Ziadi
        </a>

        {/* Right side: lang toggle + hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Bouton FR / EN */}
          <button
            onClick={toggle}
            className="text-xs font-bold px-3 py-1.5 rounded-full border-2 border-[#675fd3] text-[#675fd3] hover:bg-[#675fd3] hover:text-white transition-all duration-200"
            aria-label="Changer la langue"
          >
            {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
          </button>

          {/* Hamburger (mobile) */}
          <span
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer hover:animate-spin transition-transform"
          >
            {menuOpen ? <MenuCross /> : <MenuBar />}
          </span>
        </div>

        {/* Nav links */}
        <div
          className={`${menuOpen ? "block" : "hidden"} md:block w-full md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li><a href="/#a-propos-de-moi" className={linkClass}>{t.nav.about}</a></li>
            <li><a href="/#mes-projets"      className={linkClass}>{t.nav.projects}</a></li>
            <li><a href="/#formations"       className={linkClass}>{t.nav.education}</a></li>
            <li><a href="/#contact"          className={linkClass}>{t.nav.contact}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
