import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import stattrak_banner from "../../img/stattrak-banner.jpg";
import stattrak_banner1 from "../../img/strattrak-banner1.jpg"
import NavBar from "../../Components/navbar";

function projectStattrak() {
  const stattrak = ["HTML", "CSS", "JS", "NodeJS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0  w-fit">
        <div className="rounded-lg w-screen">
          <img class="w-full h-80 object-cover" src={stattrak_banner} />
          <div class="flex flex-row justify-center text-wrap w-screen mt-6">
            <div class="flex flex-col justify-center align-center space-y-5">
              <h1 class="flex justify-center font-bold text-4xl">Stattrak</h1>
              <div class="flex justify-center w-64">
                <TagTechno array={stattrak} />
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
                🌐 : Stattrak{" "}
                <a
                  class="text-blue-300"
                  target="_blank"
                  href="https://stattrak.fr"
                >
                  [Disponible]
                </a>
              </span>
              <span>📅 : Décembre 2025</span>
            </div>
          </div>

          <div class="flex justify-center flex-row relative w-full mt-5 p-10">
            <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
              <p class="text-justify space-y-5">
                <p class="flex justify-center font-semibold">
                  Stattrak est une WebApp d'analyse de CV par I.A 🧠
                </p>
                <p>
                  Cette analyse s'appuie sur les éléments de votre CV pour vous proposer des axes d'amélioration ainsi qu'une note d'efficacité globale sur 100.
                </p>
                <p>
                  Ce projet est réalisé à des fins de formation sur les modèles d'IA et leur entraînement par renforcement.
                </p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img
              class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
              src={stattrak_banner}
            />
            <img
              class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150"
              src={stattrak_banner1}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectStattrak;
