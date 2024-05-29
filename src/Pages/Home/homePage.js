import EmailIcon from "../../Components/Icons/email";
import TypingAnimation from "../../Components/Commons/TypingAnimation";
import FileIcon from "../../Components/Icons/file";
import GitHubIcon from "../../Components/Icons/github";
import ProjectCard from "../../Components/Commons/ProjectCard";
import Title from "../../Components/Icons/title";
import projectBastion from "../../img/projet-bastion.PNG";
import projectCoiffeur from "../../img/projet-coiffeur.jpeg";
import Footer from "../../Components/footer";
import ImgSkills from "../../Components/Commons/imgSkills";

function Home() {
    const texts = ["Développeur Full Stack 💻", "Alternant chez CHAUSSEA 👟", "Futur Ingénieur I.A 🤖", "En train de dormir 😴"];
    return (
        <div className="flex flex-col  z-0">
            <div class="text-center py-10 sm:py-28 w-screen">
                <p class="text-6xl font-bold text-sky-950">
                    Étudiant Développeur Full-Stack en alternance
                </p>
                <p class="mt-6 font-extralight text-xl text-gray-400">
                    Venez découvrir qui je suis à travers ce portfolio 🌱
                </p>
                <div class="mt-10 flex flex-col items-center justify-center gap-x-6">
                    <button class="rounded-md flex bg-[#675fd3] hover:bg-[#8780f180] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                        <FileIcon size="20" stroke={1.5} />
                        Retrouvez mon CV
                    </button>
                    <div className="flex flex-row mt-10 space-x-10">
                        <a href="https://github.com/Atlasentinel" target="_blank" class="rounded-full flex bg-[#5fb6d3] gap-x-2 space-x-10 hover:bg-[#2ba8d172] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
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
            <div class="text-center py-10 sm:py-12 w-screen z-5">
                <div className="flex flex-row">
                    <div className="flex  place-content-center mx-auto max-w-3xl py-10 sm:py-10 particles-line w-screen">
                        <img className="h-52 shadow-2xl shadow-black w-96 object-cover rounded-xl" src="https://media.licdn.com/dms/image/D4E03AQGy-L3F_HiZKQ/profile-displayphoto-shrink_200_200/0/1700505114370?e=2147483647&v=beta&t=TMyCpTEHIqJhr5kNSo_Sb-TmoODbI3PlmiUJc63aJEE" />
                    </div>
                    <div className="flex flex-col h-fit mr-10   rounded-lg place-content-center mx-auto max-w-3xl py-10 sm:py-10 particles-line w-screen">
                        <div className="flex mb-4">
                            <p class="w-fit h-fit rounded-md shadow-lg shadow-[#13151c] place-content-ce text-base font-extralight leading-7 bg-[#13151c] p-2 text-[#f9f9f9]  ml-2 inline-block">
                                À propos de moi !
                            </p>
                            🍃
                        </div>
                        <p class="font-bold  text-left  max-w-xl text-sky-950 ml-2">
                            Je suis: <TypingAnimation texts={texts} speed={100} pauseTime={100} />|
                        </p>
                        <p class="font-extralight  text-left  max-w-xl text-sky-950 ml-2">
                            Jeune pirate informatique de 22 ans 🏴‍☠️, je navigue sur les mers de la programmation avec envie et passion à la recherche du trésor de la connaissance.<br />
                            <i>
                                "Le fruit de nos echecs est le composte de notre réussite" - 2019
                                <br />
                                <strong>Ziadi Noé 🍂</strong>
                            </i>
                        </p>
                        <br />
                        <p class="font-semibold  text-left  max-w-xl text-[#8780f1] ml-2">
                            <a href="https://fr.linkedin.com/in/noé-ziadi-770255211/fr" target="_blank"> Retrouvez moi sur Linkedin →</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-center py-10 sm:py-12 w-screen bg-gray-100 z-5">
                <Title title="Mes projets !" />
                <div className="flex flex-row pl-28 space-x-20">
                    <ProjectCard title="Coiffeur" description="WebApp de prise de rendez-vous pour coiffeurs particulié." date_start="Mars 2024" date_end="..." img={projectCoiffeur} />
                    <ProjectCard title="Bastion" description="Projet de sécurité des accès d'un lieu physique." date_start="Octobre 2023" date_end="..." img={projectBastion} />
                    <ProjectCard title="Clapin" description="Site web de streaming de film pour studio indépendant." date_start="Février 2024" date_end="..." img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqySNtX6zQ1DXwkk7go2V2M-LgNs9O9NE1v27Sp8l9lg&s" />
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
    )

}

export default Home;