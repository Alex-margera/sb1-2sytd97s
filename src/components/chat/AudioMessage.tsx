import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';

interface AudioMessageProps {
  text: string;
  cost: number;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ text, cost }) => {
  const [isLocked, setIsLocked] = useState(true);
  const { stars, deductStars } = useUserStore();

  const handleUnlock = () => {
    if (stars >= cost && isLocked) {
      if (deductStars(cost)) {
        setIsLocked(false);
      }
    }
  };

  return (
    <div className="relative">
      <motion.div
        className={`flex items-center gap-2 px-4 py-3 rounded-2xl ${
          isLocked ? 'bg-dark-300/50' : 'bg-dark-300'
        }`}
      >
        <span>🎤</span>
        {isLocked ? (
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleUnlock}
          >
            <div className="flex-1 h-8 bg-dark-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-dark-300 to-dark-200 animate-pulse" />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-neon-purple/80 backdrop-blur-sm">
              <span>⭐</span>
              <span className="font-bold">{cost}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <div className="relative w-full h-8 bg-dark-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-32 h-full bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};