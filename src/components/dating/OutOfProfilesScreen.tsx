import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OutOfProfilesScreenProps {
  onWatchAd: () => void;
  onPurchaseProfiles: () => void;
  gems: number;
}

export const OutOfProfilesScreen: React.FC<OutOfProfilesScreenProps> = ({
  onWatchAd,
  onPurchaseProfiles,
  gems
}) => {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-dark-200 rounded-2xl p-8 text-center">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold mb-4 gradient-text"
        >
          OUT OF PROFILES
        </motion.h1>

        <p className="text-xl mb-8">
          Meet new matches in:
          <br />
          <span className="font-mono text-2xl text-neon-purple">{formatTime(timeLeft)}</span>
        </p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">OR GET FAST ACCESS</h2>
          
          <button
            onClick={onWatchAd}
            className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors"
          >
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2">
                <span>▶️</span>
                <span>1 Profile</span>
              </span>
              <span className="text-sm">WATCH AD</span>
            </div>
          </button>

          <button
            onClick={onPurchaseProfiles}
            disabled={gems < 15}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink disabled:opacity-50"
          >
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2">
                <span>💎</span>
                <span>10 PROFILES</span>
              </span>
              <span className="text-sm">15 GEMS</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};