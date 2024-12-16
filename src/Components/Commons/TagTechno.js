import React, { useRef } from 'react';

const tagStyles = {
  PHP: 'w-fit h-fit bg-purple-400 text-purple-600 bg-opacity-20 text-sm rounded-md p-1',
  SQL: 'w-fit h-fit bg-pink-400 text-pink-600 bg-opacity-20 text-sm rounded-md p-1',
  HTML: 'w-fit h-fit bg-orange-400 text-orange-600 bg-opacity-20 text-sm rounded-md p-1',
  JS: 'w-fit h-fit bg-yellow-400 text-yellow-600 bg-opacity-20 text-sm rounded-md p-1',
  JQuery: 'w-fit h-fit bg-red-400 text-red-600 bg-opacity-20 text-sm rounded-md p-1',
  CSS: 'w-fit h-fit bg-blue-400 text-blue-600 bg-opacity-20 text-sm rounded-md p-1',
  NodeJS: 'w-fit h-fit bg-green-600 text-green-800 bg-opacity-20 text-sm rounded-md p-1',
  BunJS: 'w-fit h-fit bg-yellow-300 text-pink-600 bg-opacity-20 text-sm rounded-md p-1',
  ReactJS: 'w-fit h-fit bg-green-400 text-green-600 bg-opacity-20 text-sm rounded-md p-1',
  PYTHON: 'w-fit h-fit bg-yellow-600 text-yellow-800 bg-opacity-20 text-sm rounded-md p-1',
  CPLUS: 'w-fit h-fit bg-orange-600 text-orange-800 bg-opacity-20 text-sm rounded-md p-1',
  ARDUINO: 'w-fit h-fit bg-blue-600 text-blue-800 bg-opacity-20 text-sm rounded-md p-1',
  RASPBERRY: 'w-fit h-fit bg-pink-600 text-pink-800 bg-opacity-20 text-sm rounded-md p-1',
  CSHARP: 'w-fit h-fit bg-blue-200 text-blue-600 bg-opacity-20 text-sm rounded-md p-1',
};

function TagTechno({ array }) {
  const scrollContainer = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollContainer.current.classList.add('active');
    startX = e.pageX - scrollContainer.current.offsetLeft;
    scrollLeft = scrollContainer.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollContainer.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollContainer.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="flex p-2 pl-4 select-none space-x-2 overflow-x-auto w-100 cursor-grab active:cursor-grabbing"
      ref={scrollContainer}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {array.map(tag => (
        <div key={tag} className={tagStyles[tag]}>
          #{tag}
        </div>
      ))}
    </div>
  );
}

export default TagTechno;
