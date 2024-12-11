import create from 'zustand';

interface Task {
  id: string;
  icon: string;
  title: string;
  progress: number;
  total: number;
  completed: boolean;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  level: number;
}

interface AchievementsStore {
  dailyTasks: Task[];
  achievements: Achievement[];
  updateTaskProgress: (taskId: string, progress: number) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
}

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  dailyTasks: [
    {
      id: 'daily-chats',
      icon: '💭',
      title: 'Finish 6 new chats with the characters',
      progress: 0,
      total: 6,
      completed: false
    },
    {
      id: 'daily-photos',
      icon: '📸',
      title: 'Reveal 2 photos',
      progress: 0,
      total: 2,
      completed: false
    },
    {
      id: 'daily-gems',
      icon: '💎',
      title: 'Choose an answer for Gems 1 time',
      progress: 0,
      total: 1,
      completed: false
    }
  ],
  achievements: [
    {
      id: 'ready-for-action',
      icon: '💎',
      title: 'Ready for action',
      description: 'Purchase 300 Gems',
      progress: 295,
      total: 300,
      reward: 30,
      level: 2
    },
    {
      id: 'on-the-hook',
      icon: '❤️',
      title: 'On the hook',
      description: 'Go on 5 dates',
      progress: 4,
      total: 5,
      reward: 5,
      level: 1
    },
    {
      id: 'influencer',
      icon: '💘',
      title: 'Influencer',
      description: 'Choose an answer for Gems 50 times',
      progress: 0,
      total: 50,
      reward: 50,
      level: 0
    }
  ],
  updateTaskProgress: (taskId: string, progress: number) =>
    set((state) => ({
      dailyTasks: state.dailyTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress,
              completed: progress >= task.total
            }
          : task
      )
    })),
  updateAchievementProgress: (achievementId: string, progress: number) =>
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, progress }
          : achievement
      )
    }))
}));