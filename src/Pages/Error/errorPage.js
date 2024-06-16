import ErrorIcon from "../../Components/Icons/error";
function Error() {
   return (
        <div className="flex flex-col  z-0">
            <div class="text-center py-10 sm:py-28 w-screen">
                <p class="text-6xl font-bold text-sky-950">
                    Page not found
                </p>
                <p class="mt-6 font-extralight text-xl text-gray-400">
                    ERROR 404
                </p>
                <div class="mt-10 flex flex-col items-center justify-center gap-x-6">
                    <a href="/" class="rounded-md flex bg-[#d35f5f] hover:bg-[#e85959dc] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                        <ErrorIcon size="20" stroke={1.5} />
                        Retourner en lieu sûr
                    </a>
                </div>
            </div>
           
        </div >
    )

}

export default Error;