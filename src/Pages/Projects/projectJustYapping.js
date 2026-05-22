import TagTechno          from "../../Components/Commons/TagTechno";
import Footer             from "../../Components/footer";
import justyapping_banner from "../../img/justyapping_banner.jpg";
import NavBar             from "../../Components/navbar";

function projectJustYapping() {
  const justyapping = ["HTML", "CSS", "JS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0 w-fit">
        <div className="rounded-lg w-screen">
          <img className="w-full h-80 object-cover" src={justyapping_banner} alt="JustYapping banner" />
          <div className="flex flex-row justify-center text-wrap w-screen mt-6">
            <div className="flex flex-col justify-center align-center space-y-5">
              <h1 className="flex justify-center font-bold text-4xl">JustYapping</h1>
              <div className="flex justify-center w-64">
                <TagTechno array={justyapping} />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative w-full mt-4">
            <div className="flex flex-col justify-center rounded-lg font-semibold">
              <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Perso ]</span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>👾 : Site Web</span>
              <span>
                🌐 : JustYapping{" "}
                <a className="text-blue-300" target="_blank" href="https://justyapping.online" rel="noreferrer">[Disponible]</a>
              </span>
              <span>📅 : Janvier 2025</span>
            </div>
          </div>

          <div className="flex justify-center flex-row relative w-full mt-5 p-10">
            <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg">
              <p className="text-justify space-y-5">
                <p className="flex justify-center font-semibold">JustYapping</p>
                <p>JustYapping est un générateur de tchat pour les streamers Twitch et Kick. Il permet de créer des images pour simuler des messages de tchat sur Twitch et sur Kick.</p>
                <p>Cela a été fait pour faciliter les monteurs vidéos dans la création de leurs vidéos, en leur permettant de générer des tchats réalistes sans avoir à enregistrer de vrais tchats.</p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={justyapping_banner} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectJustYapping;
