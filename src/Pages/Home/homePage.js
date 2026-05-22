import { useRef }     from "react";
import React, { useState } from "react";
import Modal             from "react-modal";

import NavBar            from "../../Components/navbar";
import Footer            from "../../Components/footer";
import EmailIcon         from "../../Components/Icons/email";
import TypingAnimation   from "../../Components/Commons/TypingAnimation";
import FileIcon          from "../../Components/Icons/file";
import GitHubIcon        from "../../Components/Icons/github";
import ProjectCard       from "../../Components/Commons/ProjectCard";
import StudyCard         from "../../Components/Commons/StudyCard";
import ImgSkills         from "../../Components/Commons/imgSkills";
import Title             from "../../Components/Icons/title";
import Cross             from "../../Components/Icons/cross";

import { useLang }           from "../../contexts/LangContext";
import { useProjects }       from "../../hooks/usePortfolioData";
import { useEducation }      from "../../hooks/usePortfolioData";
import { imageMap }          from "../../utils/imageMap";

import pp    from "../../img/pp.jpg";
import cv    from "../../img/cv.PNG";
import cvPDF from "../../files/cv.pdf";

Modal.setAppElement("#root");

function Home() {
  const { lang, t }    = useLang();
  const { data: projects }  = useProjects();
  const { data: education } = useEducation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // ── Drag-scroll pour la barre de compétences ──────────────────────
  const scrollContainer = useRef(null);
  let isDown = false;
  let startX, scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollContainer.current.classList.add("active");
    startX     = e.pageX - scrollContainer.current.offsetLeft;
    scrollLeft = scrollContainer.current.scrollLeft;
  };
  const handleMouseLeave = () => {
    isDown = false;
    scrollContainer.current.classList.remove("active");
  };
  const handleMouseUp = () => {
    isDown = false;
    scrollContainer.current.classList.remove("active");
  };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x  = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div id="contact" className="text-center py-10 sm:py-28 w-screen">
          <h1 className="text-6xl font-bold text-sky-950 px-4">
            {t.hero.title}
          </h1>
          <h2 className="mt-6 font-extralight text-xl text-gray-400">
            {t.hero.subtitle}
          </h2>

          <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
            {/* Bouton CV */}
            <button
              onClick={() => setModalIsOpen(true)}
              className="rounded-md cursor-pointer flex gap-2 bg-[#675fd3] hover:bg-[#8780f180] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200"
            >
              <FileIcon size="20" stroke={1.5} />
              {t.hero.cv}
            </button>

            {/* Modal CV */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="PDF Modal"
              style={{
                overlay: { backgroundColor: "rgba(0,0,0,0.8)" },
                content: {
                  top: "55%", left: "50%", right: "auto", bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%,-50%)",
                  width: "35%", height: "80%",
                },
              }}
            >
              <div className="flex flex-row justify-between mb-2">
                <h1 className="text-2xl font-bold">{t.hero.cvViewer}</h1>
                <a
                  href={cvPDF}
                  download
                  className="rounded-md h-fit flex gap-1 bg-[#675fd3] hover:bg-[#8780f180] px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
                >
                  <FileIcon size="20" stroke={1.5} />
                  {t.hero.cvDownload}
                </a>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="rounded-md flex bg-[#675fd3] h-fit hover:bg-[#8780f180] px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors"
                >
                  <Cross size="20" stroke={1.5} />
                </button>
              </div>
              <iframe src={cv} width="100%" height="90%" title="PDF Viewer" />
            </Modal>

            {/* Liens sociaux */}
            <div className="flex flex-row mt-10 space-x-10">
              <a
                href="https://github.com/Atlasentinel"
                target="_blank"
                rel="noreferrer"
                className="rounded-full flex gap-2 bg-[#5fb6d3] hover:bg-[#2ba8d172] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200"
              >
                <GitHubIcon size="20" stroke={1.5} />
                {t.hero.github}
              </a>
              <a
                href="mailto:noeziadi@outlook.com"
                className="flex rounded-full gap-2 bg-[#d3825f] hover:bg-[#d25e2c7d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200"
              >
                <EmailIcon size="20" stroke={1.5} />
                {t.hero.contact}
              </a>
            </div>
          </div>
        </div>

        {/* ── À PROPOS ─────────────────────────────────────────────── */}
        <div id="a-propos-de-moi" className="text-center py-10 sm:py-12 w-screen">
          <div className="flex flex-col md:flex-row">
            {/* Photo */}
            <div className="flex place-content-center mx-auto max-w-3xl py-10 particles-line w-screen">
              <img
                className="h-52 shadow-2xl shadow-black w-96 object-cover rounded-xl"
                alt="Noé Ziadi"
                src={pp}
              />
            </div>

            {/* Texte */}
            <div className="flex flex-col h-fit rounded-lg place-content-center mx-auto max-w-3xl py-10 particles-line w-screen">
              <div className="flex mb-4">
                <Title title={t.about.title} />
                🍃
              </div>
              <p className="font-bold text-left max-w-xl text-sky-950 ml-2">
                {t.about.iam}{" "}
                <TypingAnimation texts={t.about.texts} speed={100} pauseTime={100} />
                |
              </p>
              <p className="font-extralight text-left max-w-xl text-sky-950 ml-2">
                {t.about.bio}
                <br />
                <i>
                  {t.about.quote}
                  <br />
                  <strong>{t.about.author}</strong>
                </i>
              </p>
              <br />
              <p className="font-semibold text-left max-w-xl text-[#8780f1] ml-2">
                <a
                  href="https://fr.linkedin.com/in/noé-ziadi-770255211/fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.about.linkedin}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ── PROJETS ──────────────────────────────────────────────── */}
        <div id="mes-projets" className="text-center py-10 sm:py-12 w-screen bg-gray-100">
          <Title title={t.projects.title} />
          <div className="flex flex-row items-center">
            <div className="flex flex-wrap justify-center">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  link={project.slug || undefined}
                  array={project.tags}
                  title={project.title}
                  description={project.description[lang]}
                  date_start={project.date_start[lang]}
                  date_end={project.date_end ? project.date_end[lang] : null}
                  img={imageMap[project.image]}
                  available={project.available}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── FORMATIONS ───────────────────────────────────────────── */}
        <div id="formations" className="text-center py-10 sm:py-12 w-screen bg-white">
          <Title title={t.education.title} />
          <div className="flex flex-row items-center">
            <div className="flex flex-wrap justify-center">
              {education.map((edu) => (
                <StudyCard
                  key={edu.id}
                  title={edu.title}
                  description={edu.description[lang]}
                  option={edu.option[lang]}
                  city={edu.city}
                  date_start={edu.period}
                  school={edu.school}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── COMPÉTENCES ──────────────────────────────────────────── */}
        <div className="text-center py-10 sm:py-12 w-screen bg-white">
          <Title title={t.skills.title} />
          <div className="w-screen">
            <div
              ref={scrollContainer}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex justify-center p-4 pl-6 select-none space-x-4 overflow-x-auto overflow-y-hidden w-full h-40 cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            >
              {/* Frontend */}
              <ImgSkills link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7zQzheKgsaUJVceUY7qh1BQ8ALn-LwHM9_91-Mbvsg&s" />
              <ImgSkills link="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" />
              <ImgSkills link="https://seeklogo.com/images/J/javascript-logo-E967E87D74-seeklogo.com.png" />
              <ImgSkills link="https://3.imimg.com/data3/TK/CW/MY-6654490/jquery-250x250.jpg" />
              <ImgSkills link="https://cdn-icons-png.flaticon.com/512/1183/1183621.png" />
              {/* Web dynamique */}
              <ImgSkills link="https://pngimg.com/d/php_PNG45.png" />
              <ImgSkills link="https://cdn.icon-icons.com/icons2/2389/PNG/512/symfony_logo_icon_144821.png" />
              <ImgSkills link="https://cdn-icons-png.flaticon.com/512/3161/3161133.png" />
              {/* Langages */}
              <ImgSkills link="https://cdn.icon-icons.com/icons2/2415/PNG/512/csharp_plain_logo_icon_146577.png" />
              <ImgSkills link="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1024px-Python.svg.png" />
              <ImgSkills link="https://cdn-icons-png.flaticon.com/512/1183/1183618.png" />
              {/* Outils */}
              <ImgSkills link="https://seeklogo.com/images/U/unity-logo-988A22E703-seeklogo.com.png" />
              <ImgSkills link="https://www.docker.com/wp-content/uploads/2023/05/symbol_blue-docker-logo.png" />
              <ImgSkills link="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2048px-Git_icon.svg.png" />
              <ImgSkills link="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
              <ImgSkills link="https://cdn.icon-icons.com/icons2/2699/PNG/512/gitkraken_logo_icon_169111.png" />
              <ImgSkills link="https://logowik.com/content/uploads/images/gitlab8368.jpg" />
              <ImgSkills link="https://cdn.worldvectorlogo.com/logos/postman.svg" />
              <ImgSkills link="https://cdn.worldvectorlogo.com/logos/prestashop.svg" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
