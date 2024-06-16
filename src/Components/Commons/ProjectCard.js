import CalendarIcon from "../Icons/calendar";
import LeftArrowIcon from "../Icons/leftArrow";
import TagTechno from "./TagTechno";



function ProjectCard({ img, title, description, date_start, date_end, array, link, available }) {
    return (
        <div className="flex flex-col m-5 bg-white w-80 h-100 rounded-md mb-10 cursor-pointer">
            <div className="rounded-lg w-full">
                <img className="rounded-tl-md rounded-tr-md w-full h-40 object-fit" alt="Photo du projet" src={img} />
            </div>
            <div className="rounded-lg w-100">
                <div className="flex flex-col p-4 py-4 ">
                    <h1 className="text-2xl font-semibold m-2">{title}</h1>
                    <hr className="wit-full" />
                    <div className="h-[4rem]">
                        <span className="flex text-wrap mt-4 font-semibold">{description}</span>
                    </div>
                </div>
                <div className="flex p-2 pl-4 text-[#757483]">
                    <span className="flex flex-row text-sm"><CalendarIcon size="10" stroke-width="1.5" /> &nbsp; {date_start}  &nbsp; <LeftArrowIcon size="5" stroke="1.5" /> &nbsp; {date_end}</span>
                </div>
                <TagTechno array={array} />
                <div className="h-20 flex p-2 pl-4 py-4 place-content-center text-white font-semibold text-lg">
                    <a href={link} className={`flex flex-row rounded-md p-2 ${available ? "bg-red-700 text-white cursor-not-allowed" : "bg-[#13151c] text-[#f9f9f9]"} `}> En savoir plus</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;