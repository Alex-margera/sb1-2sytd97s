import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';

interface TimerBlockerProps {
  onUnblock: () => void;
}

export const TimerBlocker: React.FC<TimerBlockerProps> = ({ onUnblock }) => {
  const { stars } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-t from-black via-black/95 to-transparent pb-4 pt-8"
    >
      <div className="max-w-sm mx-auto space-y-4 px-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🔒</span>
            <span className="text-lg">Continue chatting with Jane</span>
          </div>
        </div>

        <button
          onClick={onUnblock}
          disabled={stars < 30}
          className="w-full py-4 rounded-xl bg-neon-purple hover:bg-neon-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Unlock</span>
          <span>⭐</span>
          <span>30</span>
        </button>

        {stars < 30 && (
          <p className="text-center text-sm text-gray-400">
            Not enough stars to continue
          </p>
        )}
      </div>
    </motion.div>
  );
};