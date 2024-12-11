import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
  error?: string | null;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, error }) => {
  const roundedProgress = Math.min(100, Math.round(progress));
  const loadingText = roundedProgress < 100 ? 'Loading critical assets' : 'Starting app';

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-dark-200 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-300/50 to-dark-300/20">
            <div className="h-full flex flex-col items-center justify-center gap-8">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 0, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink opacity-20 blur-xl" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  ❤️
                </div>
              </motion.div>

              <div className="space-y-4 w-full px-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{loadingText}</span>
                  <span className="text-neon-purple">{roundedProgress}%</span>
                </div>
                <div className="h-1 rounded-full bg-dark-300 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-purple to-neon-pink"
                    initial={{ width: 0 }}
                    animate={{ width: `${roundedProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {error && (
                <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-500/80 text-white px-4 py-2 rounded-lg text-sm max-w-[80%] text-center"
                  >
                    {error}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};