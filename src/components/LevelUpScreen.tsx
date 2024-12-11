import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { FloatingHearts } from './FloatingHearts';

interface LevelUpScreenProps {
  characterId: string;
  characterImage: string;
  newLevel: number;
  onClose: () => void;
}

export const LevelUpScreen: React.FC<LevelUpScreenProps> = ({
  characterImage,
  newLevel,
  onClose
}) => {
  const { addStars } = useUserStore();

  const handleCollectReward = () => {
    addStars(10);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm aspect-[9/16] relative overflow-hidden rounded-3xl"
        >
          <img
            src={characterImage}
            alt="Character"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90">
            <FloatingHearts />
            
            <div className="h-full flex flex-col justify-end p-8 text-center">
              <div className="space-y-4">
                <div className="text-6xl font-bold text-neon-purple">#COOL</div>
                <div className="text-6xl font-bold text-neon-purple">#COOL</div>
                <div className="text-6xl font-bold text-white">#COOL</div>
                
                <p className="text-xl text-white">
                  Your romance bond reached the new level!
                </p>

                <button
                  onClick={handleCollectReward}
                  className="w-full py-4 rounded-xl bg-neon-purple hover:bg-neon-purple/90 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Collect</span>
                    <span>⭐</span>
                    <span>10</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};