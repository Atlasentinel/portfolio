function StudyCard({ title, description, option, city, date_start, school }) {
    return (
        <div className="flex flex-col m-5 border hover:scale-110 cursor-pointer transition-all delay-150 bg-zinc-950 text-white w-80 h-100 rounded-md mb-10">
            <div className="rounded-lg w-100">
                <div className="flex flex-col p-4 py-4 ">
                    <h1 className="text-2xl font-semibold m-2">{title}</h1>
                    <hr className="wit-full" />
                    <div className="h-[4rem]">
                        <span className="flex text-wrap mt-4 font-semibold">{description}</span>
                    </div>
                </div>
                <div className="flex flex-col p-2 mb-2 pl-4 gap-2">
                    <span className="flex flex-row text-sm text-gray-400 font-bold">⚙&nbsp; {option}</span>
                    <span className="flex flex-row text-sm text-blue-400 font-medium">📍 &nbsp; {city}</span>
                    <span className="flex flex-row text-sm text-pink-400 font-bold">👨‍🎓&nbsp; {date_start}</span>
                    <span className="flex flex-row text-sm text-purple-600 font-semibold">🏫 {school}</span>
                </div>
            </div>
        </div>
    );
}

export default StudyCard;