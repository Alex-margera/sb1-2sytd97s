import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '../Image';

interface DateCharacterProps {
  imageUrl: string | null;
  characterName: string;
  show: boolean;
}

export const DateCharacter: React.FC<DateCharacterProps> = ({ 
  imageUrl, 
  characterName,
  show 
}) => {
  return (
    <AnimatePresence mode="wait">
      {show && imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex items-end justify-center"
        >
          <Image 
            src={imageUrl}
            alt={characterName}
            className="max-h-[80vh] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};