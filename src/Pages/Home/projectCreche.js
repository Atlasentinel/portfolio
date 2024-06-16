import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import banner from "../../img/projet-creche.jpg";
import creche_screen_2 from "../../img/creche-screen-2.PNG";
import creche_screen_1 from "../../img/creche-screen-1.PNG";
import creche_screen_3 from "../../img/creche-screen-3.PNG";
import NavBar from "../../Components/navbar";


function projectCreche() {
    const cabaneTags = ['HTML', 'CSS', 'JS', 'JQuery', 'PHP', 'SQL'];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={banner} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">La Cabane des lutins</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={cabaneTags} />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center relative w-full mt-4">
                        <div class="flex flex-col justify-center rounded-lg font-semibold ">
                            <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Stage ]</span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Web App</span>
                            <span>🌐 : La Cabane des lutins <span class="text-red-300">(privée)</span></span>
                            <span>📅 : Mai 2022 - Juin 2022</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">La Cabane des lutins est une application web de gestion des crèches du groupe "La cabane et le clos des petits lutins". </p>
                                <p> La directrice des crèches a demandé une web application qui lui permettait de pouvoir mieux gérer et organiser ses crèches. </p>
                                <p> L'application intègre une messagerie, une gallerie photo et une gestion des droits employés et aussi présente la crèche en détails et permet de contacter la directrice pour y inscrire son enfant. Le site reste privée pour les utilisateurs.</p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={creche_screen_1} />
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={creche_screen_2} />
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={creche_screen_3} />
                    </div>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default projectCreche;