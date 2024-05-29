import CalendarIcon from "../Icons/calendar";
import LeftArrowIcon from "../Icons/leftArrow";
import TagTechno from "./TagTechno";
import ScrollableDiv from "./TagTechno";



function ProjectCard({ img, title, description, date_start, date_end }) {
    return (
        <div className="flex flex-col bg-white w-1/4 h-1/4 rounded-md cursor-pointer opacity-55 hover:opacity-100">
            <div className="rounded-lg w-full ">
                <img className="rounded-tl-md rounded-tr-md w-full h-40 object-full" src={img} />
            </div>
            <div className="rounded-lg w-100">
                <div className="flex flex-col p-4 py-4 ">
                    <h1 className="text-2xl font-semibold m-2">{title}</h1>
                    <hr className="wit-full" />
                    <span className="flex text-justify text-wrap mt-4 font-semibold  ">{description}</span>
                </div>
                <div className="flex p-2 pl-4 text-[#757483]">
                    <span className="flex flex-row text-sm"><CalendarIcon size="10" stroke-width="1.5" /> &nbsp; {date_start}  &nbsp; <LeftArrowIcon size="5" stroke="1.5" /> &nbsp; {date_end}</span>
                </div>
                <TagTechno />
                <div className="flex p-2 pl-4 py-4 place-content-center text-white font-semibold text-lg">
                    <a href="" className="flex flex-row rounded-md p-2 bg-[#13151c] text-[#f9f9f9]">En savoir plus</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;