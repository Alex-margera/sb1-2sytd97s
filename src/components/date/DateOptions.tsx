import React from 'react';
import { motion } from 'framer-motion';
import { DateOption } from '../../types/date';

interface DateOptionsProps {
  options: DateOption[];
  onSelect: (option: DateOption) => void;
}

export const DateOptions: React.FC<DateOptionsProps> = ({ options, onSelect }) => {
  // Sort options to show premium first
  const sortedOptions = [...options].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });

  return (
    <div className="p-4 space-y-2 bg-gradient-to-t from-black via-black/95 to-transparent">
      {sortedOptions.map((option) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
          className={`
            w-full p-4 rounded-xl text-left relative
            ${option.isPremium 
              ? 'bg-neon-purple/20 border-2 border-neon-purple' 
              : 'bg-dark-300'
            }
          `}
        >
          <p className="pr-12">{option.text}</p>
          
          {option.isPremium && (
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-dark-200/80 backdrop-blur-sm">
                <span>⭐</span>
                <span>{option.cost}</span>
              </div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
};