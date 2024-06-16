import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import banner from "../../img/projet-bastion.PNG";
import bastion_screen_2 from "../../img/bastion-screen-2.PNG";
import bastion_screen_1 from "../../img/bastion-screen-1.PNG";
import NavBar from "../../Components/navbar";


function projectBastion() {
    const bastionTags = ['HTML', 'CSS', 'JS', 'Python', 'ReactJS', 'NodeJS', 'RASPBERRY'];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={banner} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">Bastion</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={bastionTags} />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center relative w-full mt-4">
                        <div class="flex flex-col justify-center rounded-lg font-semibold ">
                            <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Projet Bac+3 D.F.S ]</span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Web App</span>
                            <span>🌐 : Bastion <span class="text-yellow-300">(pas encore dispo)</span></span>
                            <span>📅 : Septembre 2023 - Septembre 2024</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">Bastion est une Web App de gestion des accès à une infrastructure. </p>
                                <p> Dans le cadre du Bachelor BAC+3, nous devons développer un projet contenant une API, une Application mobile et un site Internet. </p>
                                <p> Bastion permet aux entreprises de gerer les accès à leur infrastructure en enregistrant des groupes, des droits et des utilisateurs et en attribuants des droits à des points d'accès, facilitant le travail de pointage des entreprises et des gestions du temps de travail pour les Ressources Humaines.</p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={bastion_screen_1} />
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={bastion_screen_2} />
                    </div>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default projectBastion;