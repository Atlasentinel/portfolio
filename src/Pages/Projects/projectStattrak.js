import TagTechno      from "../../Components/Commons/TagTechno";
import Footer         from "../../Components/footer";
import stattrak_banner  from "../../img/stattrak-banner.jpg";
import stattrak_banner1 from "../../img/strattrak-banner1.jpg";
import NavBar         from "../../Components/navbar";

function projectStattrak() {
  const stattrak = ["HTML", "CSS", "JS", "NodeJS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0 w-fit">
        <div className="rounded-lg w-screen">
          <img className="w-full h-80 object-cover" src={stattrak_banner} alt="Stattrak banner" />
          <div className="flex flex-row justify-center text-wrap w-screen mt-6">
            <div className="flex flex-col justify-center align-center space-y-5">
              <h1 className="flex justify-center font-bold text-4xl">Stattrak</h1>
              <div className="flex justify-center w-64">
                <TagTechno array={stattrak} />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative w-full mt-4">
            <div className="flex flex-col justify-center rounded-lg font-semibold">
              <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Perso ]</span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>👾 : Web App</span>
              <span>
                🌐 : Stattrak{" "}
                <a className="text-blue-300" target="_blank" href="https://stattrak.fr" rel="noreferrer">[Disponible]</a>
              </span>
              <span>📅 : Décembre 2025</span>
            </div>
          </div>

          <div className="flex justify-center flex-row relative w-full mt-5 p-10">
            <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg">
              <p className="text-justify space-y-5">
                <p className="flex justify-center font-semibold">Stattrak est une WebApp d'analyse de CV par I.A 🧠</p>
                <p>Cette analyse s'appuie sur les éléments de votre CV pour vous proposer des axes d'amélioration ainsi qu'une note d'efficacité globale sur 100.</p>
                <p>Ce projet est réalisé à des fins de formation sur les modèles d'IA et leur entraînement par renforcement.</p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={stattrak_banner} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={stattrak_banner1} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectStattrak;
