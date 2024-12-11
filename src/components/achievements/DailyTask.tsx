import React from 'react';
import { motion } from 'framer-motion';

interface DailyTaskProps {
  icon: string;
  title: string;
  progress: number;
  total: number;
  completed: boolean;
}

export const DailyTask: React.FC<DailyTaskProps> = ({
  icon,
  title,
  progress,
  total,
  completed
}) => {
  return (
    <div className="bg-dark-300 rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-dark-200 flex items-center justify-center text-2xl">
        {icon}
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="relative h-2 bg-dark-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(progress / total) * 100}%` }}
            className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink"
          />
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {progress}/{total}
        </div>
      </div>

      {completed && (
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
          ✓
        </div>
      )}
    </div>
  );
};