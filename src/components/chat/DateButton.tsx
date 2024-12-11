import React from 'react';
import { motion } from 'framer-motion';

interface DateButtonProps {
  onClick: () => void;
}

export const DateButton: React.FC<DateButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto py-4 rounded-xl bg-neon-purple hover:bg-neon-purple/90 transition-colors duration-300 text-lg font-semibold"
    >
      GO ON A DATE →
    </motion.button>
  );
};