import Footer from "../../Components/footer";
import banner from "../../img/r0ger_banner1.jpg";
import bastion_screen_2 from "../../img/r0ger_banner2.jpg";
import bastion_screen_1 from "../../img/r0ger_banner.jpg";
import NavBar from "../../Components/navbar";


function projectRoger() {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col z-0  w-fit">
                <div className="rounded-lg w-screen">
                    <img className="w-full h-80 object-cover" src={banner} />
                    <div className="flex flex-row justify-center text-wrap w-screen mt-6">
                        <div className="flex flex-col justify-center align-center space-y-5">
                            <h1 className="flex justify-center font-bold text-4xl">R0ger</h1>
                            <div className="flex justify-center w-64">
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center relative w-full mt-4">
                        <div className="flex flex-col justify-center rounded-lg font-semibold ">
                            <span className="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Projet personel ]</span>
                            <span>📍 &nbsp;&nbsp;: Metz</span>
                            <span>👾 : Web App</span>
                            <span>🌐 : R0ger <span className="text-yellow-300">(pas encore dispo)</span></span>
                            <span>📅 : Novembre 2026</span>
                        </div>
                    </div>

                    <div className="flex justify-center flex-row relative w-full mt-5 p-10">
                        <div className="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                            <p className="text-justify space-y-5">
                                <p className="flex justify-center font-semibold">Service de partage de fichiers 100% sécurisé. </p>
                                <p> Cette application intègre un système de chiffrement AES-256-GCM et un chiffrement par véctorisation et découpement par chunk </p>
                                <p> Il contribue à partager des fichiers et ou dossier dans des rooms temporaires et sécurisé, aucune rétention de données, tout est chiffré et le chiffrement est irréversible.</p>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                        <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={bastion_screen_1} />
                        <img className="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={bastion_screen_2} />
                    </div>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default projectRoger;