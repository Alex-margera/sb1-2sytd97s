import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';

interface PartBlockerProps {
  partNumber: number;
  cost: number;
  onUnlock: () => void;
}

export const PartBlocker: React.FC<PartBlockerProps> = ({ partNumber, cost, onUnlock }) => {
  const { stars, deductStars } = useUserStore();
  const isGolden = partNumber === 2;

  const handleUnlock = () => {
    if (stars >= cost && deductStars(cost)) {
      onUnlock();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 rounded-2xl bg-dark-300/80 backdrop-blur-sm"
    >
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold">
          End of Part {partNumber}
        </h3>

        <button
          onClick={handleUnlock}
          disabled={stars < cost}
          className={`
            w-full py-3 px-6 rounded-full font-medium
            ${isGolden 
              ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black animate-pulse'
              : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <span>⭐</span>
            <span>{cost}</span>
          </div>
        </button>

        {stars < cost && (
          <p className="text-sm text-gray-400">
            Not enough stars to continue
          </p>
        )}
      </div>
    </motion.div>
  );
};