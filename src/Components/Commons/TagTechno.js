import React, { useRef } from 'react';

function TagTechno() {
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
    const walk = (x - startX) * 3; // The multiplier can be adjusted
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="flex p-2 pl-4 space-x-2 overflow-x-auto w-100 cursor-grab active:cursor-grabbing"
      ref={scrollContainer}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-green-400 text-green-600 bg-opacity-20 text-sm rounded-md p-1">#ReactJS</div>
      <div className="bg-purple-400 text-purple-600 bg-opacity-20 text-sm rounded-md p-1">#PHP</div>
      <div className="bg-orange-400 text-orange-600 bg-opacity-20 text-sm rounded-md p-1">#HTML</div>
      <div className="bg-yellow-400 text-yellow-600 bg-opacity-20 text-sm rounded-md p-1">#JS</div>
      <div className="bg-red-400 text-red-600 bg-opacity-20 text-sm rounded-md p-1">#JQuery</div>
      <div className="bg-blue-400 text-blue-600 bg-opacity-20 text-sm rounded-md p-1">#CSS</div>
      <div className="bg-green-600 text-green-800 bg-opacity-20 text-sm rounded-md p-1">#NodeJS</div>
    </div>
  );
}

export default TagTechno;
