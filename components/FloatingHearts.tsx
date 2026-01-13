
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: `${Math.random() * 100}vw`,
        size: `${Math.random() * (30 - 10) + 10}px`,
        delay: `${Math.random() * 5}s`
      };
      setHearts(prev => [...prev.slice(-15), newHeart]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="heart-particle absolute bottom-0 text-red-400 opacity-0"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
