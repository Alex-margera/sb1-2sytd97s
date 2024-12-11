import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyTask } from './DailyTask';
import { Achievement } from './Achievement';
import { useAchievementsStore } from '../../store/achievementsStore';

interface AchievementsScreenProps {
  onClose: () => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onClose }) => {
  const { dailyTasks, achievements } = useAchievementsStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm h-[calc(100vh-4rem)] bg-dark-200 rounded-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-dark-300">
            <h1 className="text-2xl font-bold gradient-text">Achievements</h1>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {/* Daily Tasks */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Daily tasks</h2>
              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <DailyTask
                    key={task.id}
                    icon={task.icon}
                    title={task.title}
                    progress={task.progress}
                    total={task.total}
                    completed={task.completed}
                  />
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <Achievement
                    key={achievement.id}
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.description}
                    progress={achievement.progress}
                    total={achievement.total}
                    reward={achievement.reward}
                    level={achievement.level}
                  />
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};