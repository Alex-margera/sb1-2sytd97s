import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';

export const OutOfMatchesScreen: React.FC = () => {
  const { addMatchPoints, gems, setGems } = useUserStore();

  const handleWatchAd = () => {
    addMatchPoints(1);
  };

  const handlePurchaseMatches = () => {
    if (gems >= 15) {
      setGems(gems - 15);
      addMatchPoints(10);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-xs mx-auto px-4"
    >
      <div className="bg-dark-200 rounded-3xl p-6 text-center">
        <h2 className="text-[2rem] font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
          Out of Hearts
        </h2>
        
        <p className="text-gray-400 mb-8">
          You've used all your hearts for now.
          <br />
          Get more to continue matching!
        </p>

        <div className="space-y-4">
          <button
            onClick={handleWatchAd}
            className="w-full py-4 bg-dark-300 rounded-xl hover:bg-dark-200 transition-colors"
          >
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2 text-lg">
                <span className="text-blue-400">▶️</span>
                <span>Watch Ad</span>
              </span>
              <span className="text-sm text-gray-400">Get 1 Heart</span>
            </div>
          </button>

          <button
            onClick={handlePurchaseMatches}
            disabled={gems < 15}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink disabled:opacity-50 transition-all"
          >
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2 text-lg">
                <span>💎</span>
                <span>Premium Hearts</span>
              </span>
              <span className="text-sm">15 Gems for 10 Hearts</span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-gray-400 flex items-center justify-center gap-2">
          <span>Your Gems: {gems}</span>
          <span className="text-cyan-400">💎</span>
        </div>
      </div>
    </motion.div>
  );
};