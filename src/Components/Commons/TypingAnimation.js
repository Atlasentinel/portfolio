import React, { useState, useEffect } from 'react';

function TypingAnimation({ texts, speed, pauseTime }) {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typePhrase = async () => {
      for (let i = 0; i <= texts[currentIndex].length; i++) {
        setCurrentPhrase(texts[currentIndex].substring(0, i));
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      await new Promise(resolve => setTimeout(resolve, pauseTime));
      for (let i = texts[currentIndex].length; i >= 0; i--) {
        setCurrentPhrase(texts[currentIndex].substring(0, i));
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    };

    const interval = setInterval(typePhrase, pauseTime + (2 * speed * texts[currentIndex].length));
    return () => clearInterval(interval);
  }, [texts, currentIndex, speed, pauseTime]);

  return <span>{currentPhrase}</span>

};

export default TypingAnimation;
