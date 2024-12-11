import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    if (showConfirm) {
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000); // Reset after 3 seconds
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        fixed bottom-24 right-4 px-4 py-2 rounded-lg
        ${showConfirm ? 'bg-red-500' : 'bg-dark-300'}
        transition-colors duration-300
      `}
      onClick={handleReset}
    >
      {showConfirm ? 'Confirm Reset' : 'Reset Progress'}
    </motion.button>
  );
};