import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../store/userStore';
import { Image } from '../Image';

interface BlurredImageProps {
  src: string;
  alt?: string;
  cost: number;
}

export const BlurredImage: React.FC<BlurredImageProps> = ({ src, alt = '', cost }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const { stars, deductStars } = useUserStore();

  const handleUnblur = () => {
    if (stars >= cost && isBlurred) {
      if (deductStars(cost)) {
        setIsBlurred(false);
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className={`transition-all duration-300 ${isBlurred ? 'blur-xl' : ''}`}>
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          showLoadingIndicator={!isBlurred}
        />
      </div>
      
      {isBlurred && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={handleUnblur}
        >
          <p className="text-white text-lg mb-4">Tap to unblur</p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/80 backdrop-blur-sm">
            <span className="text-xl">⭐</span>
            <span className="font-bold">{cost}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};