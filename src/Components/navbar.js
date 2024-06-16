import React, { useState, useEffect } from 'react';

function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`bg-white border-gray-200 sm:p-2 fixed w-screen ${scrolled ? 'shadow-lg' : ''} z-10`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse text-2xl">
                    Noé Ziadi
                </a>
                <div className="w-full md:block md:w-auto"  id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li><a href="/#a-propos-de-moi" className="block py-2 px-3 ext-sky-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FACD3] md:p-0" aria-current="page">À propos de moi</a></li>
                        <li><a href="/#mes-projets" className="block py-2 px-3 ext-sky-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FACD3] md:p-0">Mes projets</a></li>
                        <li><a href="/#formations" className="block py-2 px-3 ext-sky-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FACD3] md:p-0">Formations</a></li>
                        <li><a href="/#contact" className="block py-2 px-3 ext-sky-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FACD3] md:p-0">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
