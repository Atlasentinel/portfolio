import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import NavBar from "../../Components/navbar";
import banner_coiffeur from "../../img/projet-coiffeur.jpeg";
import coiffeur_screen_1 from "../../img/coiffeur-screen-1.PNG";
import coiffeur_screen_2 from "../../img/coiffeur-screen-2.PNG";

function projectCoiffeur() {
    const coiffeurTags = ['HTML', 'CSS', 'JS', 'ReactJS', 'NodeJS'];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={banner_coiffeur} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">Coiffeur</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={coiffeurTags} />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center relative w-full mt-4">
                        <div class="flex flex-col justify-center rounded-lg font-semibold ">
                            <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Projet Personnel ]</span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Site Web de prise de RDV coiffeur</span>
                            <span>🌐 : Coiffeur <span class="text-blue-300">(plus dispo)</span></span>
                            <span>📅 : Mars 2024</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">Coiffeur est un site de prise de rdv. </p>
                                <p> Il a été développé dans le cadre d'un projet personnel, afin d'apprendre à développer une API REST et un site en ReactJS.</p>
                                <p> Ce site m'a permis de tester mes compétences dans la stack Javascript et à montrer mes compétences aux différents coiffeurs qui pourraient être intéréssé par le projet. Afin de leur vendre le site personnalisable selon leur enseigne. </p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={coiffeur_screen_1} />
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={coiffeur_screen_2} />
                    </div>
                </div>
                <Footer />
            </div >
        </div>
    )
}

export default projectCoiffeur;