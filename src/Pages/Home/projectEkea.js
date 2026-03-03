import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import ekea_banner from "../../img/ekea_banner.jpg";
import ekea_banner1 from "../../img/ekea_banner1.jpg";
import ekea_banner2 from "../../img/ekea_banner2.jpg";
import ekea_banner3 from "../../img/ekea_banner3.jpg";
import NavBar from "../../Components/navbar";

function projectEkea() {
    const ekea = ["HTML", "CSS", "JS"];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={ekea_banner3} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">Ekea</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={ekea} />
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
                                🌐 : Ekea{" "}
                                <a
                                    class="text-blue-300"
                                    target="_blank"
                                    href="https://ekea.fun"
                                >
                                    [Disponible]
                                </a>
                            </span>
                            <span>📅 : Février 2025</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">
                                    Ekea
                                </p>
                                <p>
                                   Ekea est un site de mini-jeux en ligne, multijoueur et gratuit. Il propose une variété de mini-jeux amusants et compétitifs auxquels les utilisateurs peuvent jouer en temps réel avec leurs amis ou d'autres joueurs du monde entier.
                                </p>
                                <p>
                                    Il propose une variété de mini-jeux autour des produits de la marque Ikea. Il a été fait en respectant les règles de la Clean Architecture ainsi que des websockets.
                                </p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={ekea_banner}
                        />
                           <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={ekea_banner2}
                        />
                               <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={ekea_banner1}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default projectEkea;
