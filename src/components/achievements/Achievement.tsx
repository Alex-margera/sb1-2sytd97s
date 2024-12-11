import React from 'react';
import { motion } from 'framer-motion';

interface AchievementProps {
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  level: number;
}

export const Achievement: React.FC<AchievementProps> = ({
  icon,
  title,
  description,
  progress,
  total,
  reward,
  level
}) => {
  const completed = progress >= total;

  return (
    <div className="bg-dark-300 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-dark-200 flex items-center justify-center text-2xl">
            {icon}
          </div>
          {level > 0 && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center text-xs font-bold">
              {level}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          
          <div className="mt-2">
            <div className="relative h-2 bg-dark-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(progress / total) * 100}%` }}
                className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink"
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-400">
                {progress}/{total}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-cyan-400">💎</span>
                <span>{reward}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};