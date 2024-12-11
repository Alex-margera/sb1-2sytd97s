import React from 'react';
import { motion } from 'framer-motion';

interface DateEndScreenProps {
  onBackToMenu: () => void;
}

export const DateEndScreen: React.FC<DateEndScreenProps> = ({ onBackToMenu }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <p className="text-2xl font-bold text-neon-purple">To be continued...</p>
        
        <button
          onClick={onBackToMenu}
          className="px-8 py-3 rounded-full bg-neon-purple text-white hover:bg-neon-purple/90 transition-colors"
        >
          Back to Menu
        </button>
      </motion.div>
    </div>
  );
};