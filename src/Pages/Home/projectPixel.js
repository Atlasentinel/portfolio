import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import banner from "../../img/pixelwar-banner.PNG";
import pixelwar_screen_1 from "../../img/pixelwar-banner.PNG";
import pixelwar_screen_2 from "../../img/pixelwar-screen.PNG";
import pixelwar_screen_3 from "../../img/pixelwar.PNG";
import NavBar from "../../Components/navbar";

function projectCreche() {
  const pixelwar = ["HTML", "CSS", "JS", "NodeJS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0  w-fit">
        <div className="rounded-lg w-screen">
          <img class="w-full h-80 object-cover" src={banner} />
          <div class="flex flex-row justify-center text-wrap w-screen mt-6">
            <div class="flex flex-col justify-center align-center space-y-5">
              <h1 class="flex justify-center font-bold text-4xl">PixelWar</h1>
              <div class="flex justify-center w-64">
                <TagTechno array={pixelwar} />
              </div>
            </div>
          </div>

          <div class="flex justify-center relative w-full mt-4">
            <div class="flex flex-col justify-center rounded-lg font-semibold ">
              <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">
                [ Perso ]
              </span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>👾 : Web App</span>
              <span>
                🌐 : PixelWar{" "}
                <a
                  class="text-blue-300"
                  target="_blank"
                  href="https://pixelwar.atlasentinel.fr"
                >
                  [Disponible]
                </a>
              </span>
              <span>📅 : Mai 2025</span>
            </div>
          </div>

          <div class="flex justify-center flex-row relative w-full mt-5 p-10">
            <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
              <p class="text-justify space-y-5">
                <p class="flex justify-center font-semibold">
                  PixelWar est une web app interactive où les utilisateurs
                  placent des pixels sur une carte commune en temps réel{" "}
                </p>
                <p>
                  Le but est de collaborer ou rivaliser pour créer des dessins
                  collectifs. Le projet gère les actions des joueurs, la
                  synchronisation des pixels et la visualisation en direct sur
                  un canvas.
                </p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img
              class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
              src={pixelwar_screen_1}
            />
            <img
              class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
              src={pixelwar_screen_2}
            />
            <img
              class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
              src={pixelwar_screen_3}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectCreche;
