import React from 'react';
import { motion } from 'framer-motion';
import { DialogOption } from '../../types/dialog';
import { useUserStore } from '../../store/userStore';

interface ChatOptionProps {
  option: DialogOption;
  onSelect: (option: DialogOption) => void;
}

export const ChatOption: React.FC<ChatOptionProps> = ({ option, onSelect }) => {
  const { stars } = useUserStore();
  const canAfford = !option.isPremium || stars >= option.cost;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => canAfford && onSelect(option)}
      disabled={!canAfford}
      className={`
        w-full p-4 rounded-2xl text-left relative
        ${option.isPremium ? 'bg-neon-purple/20 border-2 border-neon-purple' : 'bg-dark-300'}
        ${!canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-200'}
        transition-colors
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
  );
};