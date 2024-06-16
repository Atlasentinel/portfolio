import NavBar from '../../Components/navbar';
import EmailIcon from "../../Components/Icons/email";
import TypingAnimation from "../../Components/Commons/TypingAnimation";
import FileIcon from "../../Components/Icons/file";
import GitHubIcon from "../../Components/Icons/github";
import ProjectCard from "../../Components/Commons/ProjectCard";
import Title from "../../Components/Icons/title";
import projectBastion from "../../img/projet-bastion.PNG";
import projectCoiffeur from "../../img/projet-coiffeur.jpeg";
import projectCreche from "../../img/projet-creche.jpg";
import projectNycev from "../../img/projet-nycev.PNG";
import projectRach from "../../img/projet-rach.jfif";
import projetClapin from "../../img/projet-clapin.PNG"
import projectStreamBattle from "../../img/projet-streamBattle.png";
import Footer from "../../Components/footer";
import Cross from '../../Components/Icons/cross';
import ImgSkills from "../../Components/Commons/imgSkills";
import React, { useState } from 'react';
import Modal from 'react-modal';
import cv from '../../img/cv.PNG';
import cvPDF from '../../files/cv.pdf'
import StudyCard from '../../Components/Commons/StudyCard';

Modal.setAppElement('#root');

function Home() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const texts = ["Développeur Full Stack 💻", "Alternant chez CHAUSSEA 👟", "Futur Ingénieur I.A 🤖", "En train de dormir 😴", "Error 404 [Human not found]"];
    const bastionTags = ['HTML', 'CSS', 'JS', 'Python', 'ReactJS', 'NodeJS', 'RASPBERRY'];
    const coiffeurTags = ['HTML', 'CSS', 'JS', 'ReactJS', 'NodeJS'];
    const clapinTags = ['HTML', 'CSS', 'JS', 'ReactJS', 'NodeJS'];
    const rachTags = ['HTML', 'CSS', 'JS', 'JQuery', 'PHP', 'SQL'];
    const cabaneTags = ['HTML', 'CSS', 'JS', 'JQuery', 'PHP', 'SQL'];
    const nycevTags = ['HTML', 'CSS', 'JS', 'JQuery', 'PHP', 'SQL', 'RASPBERRY', 'CPLUS', 'ARDUINO', 'PYTHON'];
    const streamBattle = ['CSHARP']

    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0">
                <div id="contact" class="text-center py-10 sm:py-28 w-screen">
                    <p class="text-6xl font-bold text-sky-950">
                        Étudiant Développeur Full-Stack en alternance
                    </p>
                    <p class="mt-6 font-extralight text-xl text-gray-400">
                        Venez découvrir qui je suis à travers ce portfolio 🌱
                    </p>
                    <div class="mt-10 flex flex-col items-center justify-center gap-x-6">
                        <a onClick={openModal} class="rounded-md cursor-pointer flex bg-[#675fd3] hover:bg-[#8780f180] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                            <FileIcon size="20" stroke={1.5} />
                            Retrouver mon CV
                        </a>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="PDF Modal"
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)'  // Fond noir avec opacité de 0.8
                                },
                                content: {
                                    top: '55%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '50%',
                                    height: '80%',
                                },
                            }}
                        >
                            <div class="flex flex-row justify-between">
                                <h1 class="text-2xl font-bold">PDF CV Viewer</h1>
                                <a href={cvPDF} download class="rounded-md h-fit flex bg-[#675fd3] hover:bg-[#8780f180] mb-5 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                                    <FileIcon size="20" stroke={1.5} />
                                    Telecharger mon CV
                                </a>
                                <button class="rounded-md flex bg-[#675fd3] h-fit hover:bg-[#8780f180] mb-5 px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                    onClick={closeModal}><Cross size="20" stroke={1.5} /></button>
                            </div>
                            <iframe
                                src={cv}
                                width="100%"
                                height="90%"
                                title="PDF Viewer"
                            />
                        </Modal>
                        <div className="flex flex-row mt-10 space-x-10">
                            <a href="https://github.com/Atlasentinel" target="_blank" rel="noreferrer" class="rounded-full flex bg-[#5fb6d3] gap-x-2 space-x-10 hover:bg-[#2ba8d172] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                                <GitHubIcon size="20" stroke={1.5} />
                                GitHub
                            </a>
                            <a href="mailto:noeziadi@outlook.com" class="flex rounded-full bg-[#d3825f] gap-x-2 hover:bg-[#d25e2c7d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                                <EmailIcon size="20" stroke={1.5} />
                                Me contacter
                            </a>
                        </div>
                    </div>
                </div>
                <div id="a-propos-de-moi" class="text-center py-10 sm:py-12 w-screen z-5">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex place-content-center mx-auto max-w-3xl py-10 sm:py-10 particles-line w-screen">
                            <img className="h-52 shadow-2xl shadow-black w-96 object-cover rounded-xl" alt="Image de Noé Ziadi" src="https://media.licdn.com/dms/image/D4E03AQGy-L3F_HiZKQ/profile-displayphoto-shrink_200_200/0/1700505114370?e=2147483647&v=beta&t=TMyCpTEHIqJhr5kNSo_Sb-TmoODbI3PlmiUJc63aJEE" />
                        </div>
                        <div className="flex flex-col h-fit rounded-lg place-content-center mx-auto max-w-3xl py-10 sm:py-10 particles-line w-screen">
                            <div className="flex mb-4">
                                <Title title=" À propos de moi !" />
                                🍃
                            </div>
                            <p class="font-bold text-left  max-w-xl text-sky-950 ml-2">
                                Je suis: <TypingAnimation texts={texts} speed={100} pauseTime={100} />|
                            </p>
                            <p class="font-extralight  text-left  max-w-xl text-sky-950 ml-2">
                                Jeune pirate informatique de 22 ans 🏴‍☠️, je navigue sur les mers de la programmation avec envie et passion à la recherche du trésor de la connaissance ⛵.<br />
                                <i>
                                    "Le fruit de nos echecs est le composte de notre réussite" - 2019
                                    <br />
                                    <strong>Ziadi Noé 🍂</strong>
                                </i>
                            </p>
                            <br />
                            <p class="font-semibold  text-left  max-w-xl text-[#8780f1] ml-2">
                                <a href="https://fr.linkedin.com/in/noé-ziadi-770255211/fr" target="_blank" rel="noreferrer"> Retrouvez moi sur Linkedin →</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div id="mes-projets" className="text-center py-10 sm:py-12 w-screen bg-gray-100 z-5">
                    <Title title="Mes projets !" />
                    <div className="flex flex-row items-center">
                        <div className="flex flex-wrap justify-center">
                            <ProjectCard link="creche" array={cabaneTags} title="La Cabane des lutins" description="WebApp de gestion de micro-crèches" date_start="Mai 2022" date_end="Juin 2022" img={projectCreche} />
                            <ProjectCard link="rach" array={rachTags} title="RACH" description="Catalogue de paires de chaussures" date_start="Janvier 2023" date_end="Février 2023" img={projectRach} />
                            <ProjectCard link="bastion" array={bastionTags} title="Bastion" description="Projet de sécurité des accès d'un lieu physique." date_start="Octobre 2023" date_end="Octobre 2O24" img={projectBastion} />
                            <ProjectCard available="false" array={clapinTags} title="Clapin" description="Site web de streaming de film pour studio indépendant." date_start="Février 2024" date_end="..." img={projetClapin} />
                            <ProjectCard link="coiffeur" array={coiffeurTags} title="Coiffeur" description="WebApp de prise de rendez-vous pour coiffeurs particuliers." date_start="Mars 2024" date_end="..." img={projectCoiffeur} />
                            <ProjectCard link="nycev" array={nycevTags} title="NYCEV" description="Robot Agriculteur autonome" date_start="Mars 2020" date_end="..." img={projectNycev} />
                            <ProjectCard link="stream-battle" array={streamBattle} title="StreamBattle" description="Jeu intéractive connecté à l'API Twitch pour jouer avec le chat" date_start="Janvier 2021" date_end="Janvier 2021" img={projectStreamBattle} />
                        </div>
                    </div>
                </div>

                <div id="formations" className="text-center py-10 sm:py-12 w-screen bg-white z-5">
                    <Title title="Formations !" />
                    <div className="flex flex-row items-center">
                        <div className="flex flex-wrap justify-center">
                            <StudyCard title="Bac STI2D" description="Sciences et Technologies de l'Industrie et du Développement Durable" option="Systèmes d'Informations et Numérique" city="Metz" date_start="2018 -> 2020" school="Lycée de la Communication"  />
                            <StudyCard title="DUT Informatique" description="Diplôme Universitaire d'Informatique de Lorraine" option="Informatique" city="Metz" date_start="2021[❌]" school="Université de Lorraine" />
                            <StudyCard title="BTS SIO" description="Services Informatiques aux Organisations"  option="Solutions Logiciels et Application Metier" city="Metz" date_start="2021 -> 2023" school="Lycée Technologique Robert Schuman" />
                            <StudyCard title="Bachelor DFS" description="Centre de formation en Alternance" option="Développeur Full Stack" city="Metz" date_start="2023 -> 2024" school="Metz Numeric School" />
                         </div>
                    </div>
                </div>

                <div class="text-center py-10 sm:py-12 w-screen bg-white z-5">
                    <Title title="Mes compétences techniques !" />
                    <marquee scrollamount="4">
                        <div className="flex flex-row space-x-10 pl-10 ">
                            {/* Le front */}
                            <ImgSkills link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7zQzheKgsaUJVceUY7qh1BQ8ALn-LwHM9_91-Mbvsg&s" />
                            <ImgSkills link="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" />
                            <ImgSkills link="https://seeklogo.com/images/J/javascript-logo-E967E87D74-seeklogo.com.png" />
                            <ImgSkills link="https://3.imimg.com/data3/TK/CW/MY-6654490/jquery-250x250.jpg" />
                            <ImgSkills link="https://cdn-icons-png.flaticon.com/512/1183/1183621.png" />

                            {/* Le web dynamique */}
                            <ImgSkills link="https://pngimg.com/d/php_PNG45.png" />
                            <ImgSkills link="https://cdn.icon-icons.com/icons2/2389/PNG/512/symfony_logo_icon_144821.png" />
                            <ImgSkills link="https://cdn-icons-png.flaticon.com/512/3161/3161133.png" />

                            {/* Les langages haut niveau */}
                            <ImgSkills link="https://cdn.icon-icons.com/icons2/2415/PNG/512/csharp_plain_logo_icon_146577.png" />
                            <ImgSkills link="https://qwestore.com/png_images_min/10/The-Python-Logo-PNG-Projects-and-companies-that-7316.png" />
                            <ImgSkills link="https://cdn-icons-png.flaticon.com/512/1183/1183618.png" />

                            {/* Les logiciels */}
                            <ImgSkills link="https://seeklogo.com/images/U/unity-logo-988A22E703-seeklogo.com.png" />
                            <ImgSkills link="https://www.docker.com/wp-content/uploads/2023/05/symbol_blue-docker-logo.png" />
                            <ImgSkills link="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2048px-Git_icon.svg.png" />
                            <ImgSkills link="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
                            <ImgSkills link="https://cdn.icon-icons.com/icons2/2699/PNG/512/gitkraken_logo_icon_169111.png" />
                            <ImgSkills link="https://logowik.com/content/uploads/images/gitlab8368.jpg" />
                            <ImgSkills link="https://cdn.worldvectorlogo.com/logos/postman.svg" />
                            <ImgSkills link="https://cdn.worldvectorlogo.com/logos/prestashop.svg" />

                        </div>
                    </marquee>
                </div>
                <Footer />
            </div >
        </div>
    )

}

export default Home;