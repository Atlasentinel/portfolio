import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import banner from "../../img/bannerStreamBattle.PNG";
import sb_screen_2 from "../../img/projet-streamBattle.png";
import sb_screen_1 from "../../img/sb-screen-1.PNG";
import NavBar from "../../Components/navbar";

function projectPageStreamBattle() {
    const streamBattle = ['CSHARP']
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img class="w-full h-80 object-cover" src={banner} />
                    <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div class="flex flex-col justify-center align-center space-y-5">
                            <h1 class="flex justify-center font-bold text-4xl">StreamBattle</h1>
                            <div class="flex justify-center w-64">
                                <TagTechno array={streamBattle} />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center relative w-full mt-4">
                        <div class="flex flex-col justify-center rounded-lg font-semibold ">
                            <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Projet personnel ]</span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Jeu Vidéo</span>
                            <span>🌐 : StreamBattle <a class="text-blue-300" target="_blank" href="https://gamejolt.com/games/StreamBattle/611873">[Available on GameJolt]</a></span>
                            <span>📅 : Janvier 2021</span>
                        </div>
                    </div>

                    <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p class="text-justify space-y-5">
                                <p class="flex justify-center font-semibold">StreamBattle est un jeu vidéo de versus. </p>
                                <p> Il a été développé avec le logiciel Unity3D et est connecté à l'API de Twitch. Ce jeu est un projet d'entrainement pour comprendre comment intéragir avec une API externe</p>
                                <p> Ce jeu permets aux gens parlant dans le tchat de Twitch d'intéragir avec le jeu en écrivant des commandes pour faire fonctionner le jeu à distance. Il permet un versus entre le tchat et le streammeur. Il y a plusieurs niveau comme le terrain de golf, le patchinko et le satellite. </p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={sb_screen_1} />
                        <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={sb_screen_2} />
                    </div>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default projectPageStreamBattle;