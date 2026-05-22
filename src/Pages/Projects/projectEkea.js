import TagTechno    from "../../Components/Commons/TagTechno";
import Footer       from "../../Components/footer";
import ekea_banner  from "../../img/ekea_banner.jpg";
import ekea_banner1 from "../../img/ekea_banner1.jpg";
import ekea_banner2 from "../../img/ekea_banner2.jpg";
import ekea_banner3 from "../../img/ekea_banner3.jpg";
import NavBar       from "../../Components/navbar";

function projectEkea() {
  const ekea = ["HTML", "CSS", "JS"];
  return (
    <div>
      <NavBar />
      <div className="flex flex-col z-0 w-fit">
        <div className="rounded-lg w-screen">
          <img className="w-full h-80 object-cover" src={ekea_banner3} alt="Ekea banner" />
          <div className="flex flex-row justify-center text-wrap w-screen mt-6">
            <div className="flex flex-col justify-center align-center space-y-5">
              <h1 className="flex justify-center font-bold text-4xl">Ekea</h1>
              <div className="flex justify-center w-64">
                <TagTechno array={ekea} />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative w-full mt-4">
            <div className="flex flex-col justify-center rounded-lg font-semibold">
              <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Perso ]</span>
              <span>📍 &nbsp;&nbsp;: Metz</span>
              <span>👾 : Site Web</span>
              <span>
                🌐 : Ekea{" "}
                <a className="text-blue-300" target="_blank" href="https://ekea.fun" rel="noreferrer">[Disponible]</a>
              </span>
              <span>📅 : Février 2025</span>
            </div>
          </div>

          <div className="flex justify-center flex-row relative w-full mt-5 p-10">
            <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg">
              <p className="text-justify space-y-5">
                <p className="flex justify-center font-semibold">Ekea</p>
                <p>Ekea est un site de mini-jeux en ligne, multijoueur et gratuit. Il propose une variété de mini-jeux amusants et compétitifs auxquels les utilisateurs peuvent jouer en temps réel avec leurs amis ou d'autres joueurs du monde entier.</p>
                <p>Il propose une variété de mini-jeux autour des produits de la marque Ikea. Il a été fait en respectant les règles de la Clean Architecture ainsi que des websockets.</p>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={ekea_banner} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={ekea_banner2} alt="" />
            <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={ekea_banner1} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default projectEkea;
