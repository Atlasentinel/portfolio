import TagTechno       from "../../Components/Commons/TagTechno";
import Footer          from "../../Components/footer";
import banner          from "../../img/pixelwar-banner.PNG";
import pixelwar_screen_1 from "../../img/pixelwar-banner.PNG";
import pixelwar_screen_2 from "../../img/pixelwar-screen.PNG";
import pixelwar_screen_3 from "../../img/pixelwar.PNG";
import NavBar          from "../../Components/navbar";

function projectPixel() {
  const pixelwar = ["HTML", "CSS", "JS", "NodeJS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0 w-fit">
        <div className="rounded-lg w-screen">
          <img className="w-full h-80 object-cover" src={banner} alt="PixelWar banner" />
          <div className="flex flex-row justify-center text-wrap w-screen mt-6">
            <div className="flex flex-col justify-center align-center space-y-5">
              <h1 className="flex justify-center font-bold text-4xl">PixelWar</h1>
              <div className="flex justify-center w-64">
                <TagTechno array={pixelwar} />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative w-full mt-4">
            <div className="flex flex-col justify-center rounded-lg font-semibold">
              <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Perso ]</span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>👾 : Web App</span>
              <span>
                🌐 : PixelWar{" "}
                <a className="text-blue-300" target="_blank" href="https://pixelwar.atlasentinel.fr" rel="noreferrer">[Disponible]</a>
              </span>
              <span>📅 : Mai 2025</span>
            </div>
          </div>

          <div className="flex justify-center flex-row relative w-full mt-5 p-10">
            <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg">
              <p className="text-justify space-y-5">
                <p className="flex justify-center font-semibold">PixelWar est une web app interactive où les utilisateurs placent des pixels sur une carte commune en temps réel.</p>
                <p>Le but est de collaborer ou rivaliser pour créer des dessins collectifs. Le projet gère les actions des joueurs, la synchronisation des pixels et la visualisation en direct sur un canvas.</p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={pixelwar_screen_1} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={pixelwar_screen_2} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={pixelwar_screen_3} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectPixel;
