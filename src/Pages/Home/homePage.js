import EmailIcon from "../../Components/Icons/email";
import TypingAnimation from "../../Components/Commons/TypingAnimation";
import FileIcon from "../../Components/Icons/file";
import GitHubIcon from "../../Components/Icons/github";
import ProjectCard from "../../Components/Commons/ProjectCard";
import projectBastion from "../../img/projet-bastion.PNG";
import projectCoiffeur from "../../img/projet-coiffeur.jpeg";

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
                        <button class="rounded-full flex bg-[#5fb6d3]  gap-x-2 space-x-10 hover:bg-[#2ba8d172] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                            <GitHubIcon size="20" stroke={1.5} />
                            GitHub
                        </button>
                        <button class=" flex rounded-full bg-[#d3825f]  gap-x-2 hover:bg-[#d25e2c7d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                            <EmailIcon size="20" stroke={1.5} />
                            Me contacter
                        </button>
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
                            <p class="w-fit h-fit rounded-md shadow-lg shadow-[#bdc8ff] place-content-ce text-base font-extralight leading-7 bg-[#687ef0] p-2 text-white  ml-2 inline-block">
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
                <p class="flex items-start w-fit h-fit ml-10 mb-10 rounded-md shadow-lg shadow-[#bdc8ff] text-base font-extralight leading-7 bg-[#687ef0] p-2 text-white">
                    Mes projets ! 
                </p>
                <div className="flex flex-row pl-44 space-x-20">
                    <ProjectCard title="Coiffeur" description="WebApp de prise de rendez-vous pour coiffeurs particulié." date_start="Mars 2024" date_end="..." img={projectCoiffeur} />
                    <ProjectCard title="Bastion" description="Projet de sécurité des accès d'un lieu physique." date_start="Octobre 2023" date_end="Septembre 2024" img={projectBastion} />
                    <ProjectCard title="Clapin" description="Site web de streaming de film pour studio indépendant." date_start="Février 2024" date_end="..." img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqySNtX6zQ1DXwkk7go2V2M-LgNs9O9NE1v27Sp8l9lg&s" />
                </div>
            </div>
        </div >
    )

}

export default Home;