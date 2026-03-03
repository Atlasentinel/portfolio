import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import anansi_banner from "../../img/anansi_banner.jpg";
import anansi_banner1 from "../../img/anansi_banner1.jpg";
import anansi_banner2 from "../../img/anansi_banner2.jpg";
import NavBar from "../../Components/navbar";

function projectAnansi() {
    const anansi = ["GoLang"];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={anansi_banner} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">Anansi🕸️</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={anansi} />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center relative w-full mt-4">
                        <div class="flex flex-col justify-center rounded-lg font-semibold ">
                            <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">
                                [ Perso ]
                            </span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Site Web</span>
                            <span>
                                🌐 : anansi{" "}
                                    [Pas encore disponible]
                            </span>
                            <span>📅 : Février 2025</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">
                                    Anansi🕸️
                                </p>
                                <p>
                                   Anansi est un projet de partage d'informations pour les journalistes d'investigation et de guerre. Le projet à pour but de luter contre la censure et la répression de certains régimes politiques.
                                </p>
                                <p>
                                    Il se base sur la communication en pair à pair et le chiffrement de bout en bout pour permettre aux journalistes de partager des informations sensibles en toute sécurité. Il a été développé en GoLang pour sa performance et sa simplicité, ainsi que pour sa capacité à gérer les connexions réseau de manière efficace.
                                </p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={anansi_banner}
                        />
                           <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={anansi_banner2}
                        />
                               <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={anansi_banner1}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default projectAnansi;
