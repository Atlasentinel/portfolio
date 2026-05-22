import CalendarIcon  from "../Icons/calendar";
import LeftArrowIcon from "../Icons/leftArrow";
import TagTechno     from "./TagTechno";
import { Link }      from "react-router-dom";
import { useLang }   from "../../contexts/LangContext";

/**
 * Carte projet modernisée.
 * - available === false  → bouton "Indisponible" rouge
 * - sinon               → bouton "En savoir plus" sombre avec Link
 */
function ProjectCard({
  img,
  title,
  description,
  date_start,
  date_end = null,
  array,
  link,
  available,
}) {
  const { t }       = useLang();
  const isAvailable = available !== false && available !== "false";

  return (
    <div className="group flex flex-col m-4 bg-white w-80 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">

      {/* Image avec zoom doux au survol */}
      <div className="overflow-hidden h-44">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={title}
          src={img}
        />
      </div>

      {/* Séparateur dégradé couleur DA */}
      <div className="h-0.5 bg-gradient-to-r from-[#675fd3] via-[#5fb6d3] to-transparent" />

      {/* Corps */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h2 className="text-xl font-bold text-sky-950">{title}</h2>
        <p className="text-sm text-gray-600 font-medium leading-relaxed min-h-[3rem]">
          {description}
        </p>
      </div>

      {/* Pied de carte */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <CalendarIcon size="14" strokeWidth="1.5" />
          <span>{date_start}</span>
          {date_end && (
            <>
              &nbsp;
              <LeftArrowIcon size="14" strokeWidth="1.5" />
              &nbsp;
              <span>{date_end}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <TagTechno array={array} />

        {/* Bouton */}
        {isAvailable ? (
          <Link
            to={link}
            className="flex justify-center items-center rounded-lg py-2 text-sm font-semibold bg-[#13151c] hover:bg-[#2a2d3e] text-white transition-all duration-200"
          >
            {t.projects.learnMore}
          </Link>
        ) : (
          <span className="flex justify-center items-center rounded-lg py-2 text-sm font-semibold bg-red-50 text-red-500 border border-red-200 cursor-not-allowed">
            {t.projects.unavailable}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
