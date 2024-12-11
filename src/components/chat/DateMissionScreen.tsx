import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DateMissionScreenProps {
  onClose: () => void;
}

export const DateMissionScreen: React.FC<DateMissionScreenProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-50"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Crucial mission</h2>
          <p className="text-gray-300">
            You've been given a tough task, can you accomplish it?
          </p>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Go on a Date! →
          </button>
        </div>
      </div>
    </motion.div>
  );
};