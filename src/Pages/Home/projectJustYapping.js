import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import justyapping_banner from "../../img/justyapping_banner.jpg";
import NavBar from "../../Components/navbar";

function projectJustYapping() {
    const justyapping = ["HTML", "CSS", "JS"];
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={justyapping_banner} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">JustYapping</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={justyapping} />
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
                                🌐 : JustYapping{" "}
                                <a
                                    class="text-blue-300"
                                    target="_blank"
                                    href="https://justyapping.online"
                                >
                                    [Disponible]
                                </a>
                            </span>
                            <span>📅 : Janvier 2025</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">
                                    JustYapping
                                </p>
                                <p>
                                    JustYapping est un générateur de tchat pour les streamers Twitch et Kick. Il permet de créer des images pour simuler des messages de tchat sur twitch et sur kick.
                                </p>
                                <p>
                                    Cela a été fait pour faciliter les monteurs vidéos dans la création de leurs vidéos, en leur permettant de générer des tchats réalistes sans avoir à enregistrer de vrais tchats.
                                </p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img
                            class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
                            src={justyapping_banner}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default projectJustYapping;
