/**
 * Carte formation modernisée.
 * Garde la D.A existante (couleurs emoji, fond blanc, bordure noire).
 * Améliorations : accent gradient, lift au survol, meilleur espacement.
 */
function StudyCard({ title, description, option, city, date_start, school }) {
  return (
    <div className="group flex flex-col m-4 bg-white w-80 rounded-2xl border-2 border-black hover:border-[#675fd3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">

      {/* Ligne accent gradient */}
      <div className="h-1 bg-gradient-to-r from-[#675fd3] to-[#5fb6d3] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      <div className="p-5 flex flex-col gap-3">
        {/* Titre */}
        <h2 className="text-2xl font-semibold text-sky-950">{title}</h2>
        <hr className="border-gray-200" />

        {/* Description */}
        <p className="text-sm font-semibold text-gray-700 min-h-[2.5rem]">{description}</p>

        {/* Métadonnées */}
        <div className="flex flex-col gap-1.5 mt-1">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            ⚙️ <span className="font-medium text-gray-700">{option}</span>
          </span>
          <span className="flex items-center gap-2 text-sm text-blue-400 font-medium">
            📍 {city}
          </span>
          <span className="flex items-center gap-2 text-sm text-pink-400 font-bold">
            👨‍🎓 {date_start}
          </span>
          <span className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
            🏫 {school}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
