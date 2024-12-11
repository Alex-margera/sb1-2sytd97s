import React from 'react';
import { motion } from 'framer-motion';

export const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 24 + 12,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
    x: Math.random() * 100 - 50,
    rotation: Math.random() * 360
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            scale: 0,
            x: heart.x,
            y: window.innerHeight,
            rotate: heart.rotation
          }}
          animate={{
            scale: [0, 1, 1, 0],
            y: -100,
            x: heart.x + (Math.random() * 200 - 100),
            rotate: heart.rotation + 360
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-pink-500 filter drop-shadow-lg"
          style={{
            fontSize: `${heart.size}px`,
            left: '50%',
            marginLeft: `-${heart.size / 2}px`
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};