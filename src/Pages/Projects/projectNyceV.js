import NavBar       from "../../Components/navbar";
import TagTechno    from "../../Components/Commons/TagTechno";
import Footer       from "../../Components/footer";
import banner       from "../../img/nycev-screen-1.PNG";
import nycev_screen_2 from "../../img/nycev-screen-2.PNG";
import nycev_screen_3 from "../../img/nycev-screen-3.PNG";
import nycev_screen_4 from "../../img/nycev-screen-4.PNG";

function projectNyceV() {
  const nycevTags = ["HTML", "CSS", "JS", "JQuery", "PHP", "SQL", "RASPBERRY", "CPLUS", "ARDUINO", "PYTHON"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0 w-fit">
        <div className="rounded-lg w-screen">
          <img className="w-full h-80 object-cover" src={banner} alt="NYCEV banner" />
          <div className="flex flex-row justify-center text-wrap w-screen mt-6">
            <div className="flex flex-col justify-center align-center space-y-5">
              <h1 className="flex justify-center font-bold text-4xl">NYCEV</h1>
              <div className="flex justify-center w-64">
                <TagTechno array={nycevTags} />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative w-full mt-4">
            <div className="flex flex-col justify-center rounded-lg font-semibold">
              <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Projet Bac STI2D option S.I.N ]</span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>🤖 : Site Web de Robot Agriculteur</span>
              <span>🌐 : NYCEV <span className="text-blue-300">(plus dispo)</span></span>
              <span>📅 : Janvier 2019 - Mars 2020</span>
            </div>
          </div>

          <div className="flex justify-center flex-row relative w-full mt-5 p-10">
            <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg">
              <p className="text-justify space-y-5">
                <p className="flex justify-center font-semibold">NyceV est un site vitrine de présentation de notre projet de BAC STI2D (S.I.N).</p>
                <p>Il avait pour but de présenter notre projet de Robot Agriculteur autonome, développé pour le BAC 2020. Il devait aussi accueillir un BACK OFFICE pour gérer les routines du Robot.</p>
                <p><b><i>NYCEV : Noé Yohan Cyprien Enzo et Varen</i></b>, les concepteurs du projet chargés de construire le prototype du robot, l'application mobile et le site internet.</p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={nycev_screen_4} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={nycev_screen_2} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={nycev_screen_3} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectNyceV;
