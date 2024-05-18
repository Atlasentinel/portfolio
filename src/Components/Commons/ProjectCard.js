import CalendarIcon from "../Icons/calendar";
import LeftArrowIcon from "../Icons/leftArrow";

function ProjectCard({img, title, description, date_start, date_end}){
    return(
        <div className="flex flex-col bg-white w-80 h-full rounded-md shadow-lg shadow-[#242424]">
            <div className="rounded-lg w-full ">
                <img className="rounded-tl-md rounded-tr-md w-full h-40 object-cover" src={img} />
            </div>
            <div className="rounded-lg w-fit">
                <div className="flex flex-col p-4 py-4 ">
                    <h1 className="text-2xl font-semibold m-2">{title}</h1>
                    <hr className="wit-full"/>
                    <span className="flex text-justify text-wrap mt-4 font-semibold  ">{description}</span>
                </div>
                <div className="flex p-2 pl-4 text-[#8780f1]">
                  <span className="flex flex-row font-mono text-sm"><CalendarIcon size="10" stroke-width="1.5" /> &nbsp; {date_start}  &nbsp; <LeftArrowIcon size="5" stroke="1.5" /> &nbsp; {date_end}</span>
                </div>
                <div className="flex p-2 pl-4 py-4 place-content-center text-white font-semibold text-lg">
                 <a href="" className="flex flex-row rounded-md p-2 bg-[#13151c] text-[#f9f9f9]">En savoir plus</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;