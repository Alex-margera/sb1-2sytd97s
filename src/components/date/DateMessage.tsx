import React from 'react';
import { motion } from 'framer-motion';
import { DateMessageType } from '../../types/date';

interface DateMessageProps {
  message: DateMessageType;
}

export const DateMessage: React.FC<DateMessageProps> = ({ message }) => {
  const isNarration = !message.isCharacterDialog;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 py-2"
    >
      <div 
        className={`
          max-w-sm mx-auto p-4 rounded-xl
          ${isNarration 
            ? 'bg-gray-800/80 text-gray-200' 
            : 'bg-blue-500/80 text-white'
          }
        `}
      >
        <p className="text-lg">{message.text}</p>
      </div>
    </motion.div>
  );
};