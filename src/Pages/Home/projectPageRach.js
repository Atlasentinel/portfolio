import NavBar from "../../Components/navbar";
import TagTechno from "../../Components/Commons/TagTechno";
import Footer from "../../Components/footer";
import rach_screen_1 from "../../img/rach-screen-1.PNG";

function projectPageRach() {
    const rachTags = ['HTML', 'CSS', 'JS', 'JQuery', 'PHP', 'SQL'];
    return (
        <div>
            <NavBar />
        <div className="flex flex-col z-0  w-fit">
            <div className="rounded-lg w-screen">
                <img class="w-full h-80 object-cover" src="https://media.licdn.com/dms/image/D4E22AQFyNrMAVp8Uig/feedshare-shrink_800/0/1696854123891?e=2147483647&v=beta&t=aHY7Is7HBLt9Ve7wEqxCxAijht65PmAHVvoKjdBlDnM" />
                <div class="flex flex-row justify-center text-wrap w-screen mt-6">
                    <div class="flex flex-col justify-center align-center space-y-5">
                        <h1 class="flex justify-center font-bold text-4xl">RACH</h1>
                        <div class="flex justify-center w-64">
                            <TagTechno array={rachTags} />
                        </div>
                    </div>
                </div>

                <div class="flex justify-center relative w-full mt-4">
                    <div class="flex flex-col justify-center rounded-lg font-semibold ">
                        <span class="flex justify-center rounded-md p-1 font-thin bg-blue-300 text-white mb-4">[ Stage ]</span>
                        <span>📍 &nbsp;&nbsp;: Metz</span>
                        <span>🏬 : Boutique de sneakers</span>
                        <span>🌐 : RACH.fr <span class="text-blue-300">(plus dispo)</span></span>
                        <span>📅 : Janvier 2023 - Février 2023</span>
                    </div>
                </div>

                <div class="flex justify-center flex-row relative w-full mt-5 p-10">
                    <div class="flex justify-between w-[50rem] bg-gray-100 p-4 rounded-lg ">
                        <p class="text-justify space-y-5">
                            <p class="flex justify-center font-semibold">RACH est une boutique de sneakers à Metz. </p>
                            <p> Dans le cadre d'un stage en entreprise, j'ai eu l'opportunité de créer leur site web,
                                afin de leur apporter plus de visibilité et une e-identité, afin de pouvoir développer leur marketing.</p>
                            <p> C'est un catalogue de chaussure qui permettait de visualiser les sneakers, les prix et de pouvoir réserver
                                une sneakers pour l'acheter plus tard en magasin. On pouvait également proposer de vendre à la boutique,
                                des chaussures</p>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-around gap-5 mt-6 p-4">
                    <img class="rounded-lg border w-[20rem] h-[12rem] object-cover hover:scale-125 cursor-pointer transition-all delay-150" src={rach_screen_1} />
                </div>


            </div>
            <Footer />
        </div >
        </div>
    )
}

export default projectPageRach;