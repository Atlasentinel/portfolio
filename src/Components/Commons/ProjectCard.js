import CalendarIcon from "../Icons/calendar";
import LeftArrowIcon from "../Icons/leftArrow";

function ProjectCard({img, title, description, date_start, date_end}){
    return(
        <div className="flex flex-col bg-white w-60 h-fit rounded-2xl shadow-lg shadow-[#bdc8ff]">
            <div className="rounded-lg w-full ">
                <img className="rounded-tl-2xl rounded-tr-2xl  w-full h-54" src={img} />
            </div>
            <div className="rounded-lg w-fit">
                <div className="flex flex-col p-4 py-4 ">
                    <h1 className="text-2xl font-semibold m-2">{title}</h1>
                    <hr className="wit-full"/>
                    <span className="flex text-justify text-wrap mt-4 font-semibold  ">{description}</span>
                </div>
                <div className="flex p-2 pl-4 text-[#8f8f8f]">
                  <span className="flex flex-row font-mono text-sm"><CalendarIcon size="10" stroke-width="1.5" /> &nbsp; {date_start}  &nbsp; <LeftArrowIcon size="5" stroke="1.5" /> &nbsp; {date_end}</span>
                </div>
                <div className="flex p-2 pl-4 py-4 place-content-center text-white font-semibold text-xl">
                 <a href="" className="flex flex-row rounded-xl p-2 bg-[#4e4e4e] hover:bg-[#2c2c2c]">En savoir plus</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;