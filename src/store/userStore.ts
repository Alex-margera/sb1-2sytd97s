import create from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, UserActions } from '../types/user';

const DAILY_POINTS = 10;
const MS_PER_DAY = 86400000;

const initialState: UserState = {
  matchPoints: DAILY_POINTS,
  stars: 500, // Starting with 500 stars
  lastMatchPointsReset: Date.now(),
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setMatchPoints: (points) => set({ matchPoints: points }),
      setStars: (stars) => set({ stars }),
      
      deductStars: (amount) => {
        const { stars } = get();
        if (stars >= amount) {
          set({ stars: stars - amount });
          return true;
        }
        return false;
      },
      
      addMatchPoints: (points) => {
        set((state) => ({ matchPoints: state.matchPoints + points }));
      },

      addStars: (amount) => {
        set((state) => ({ 
          stars: state.stars + amount 
        }));
      },

      resetMatchPoints: () => {
        set({ 
          matchPoints: DAILY_POINTS,
          lastMatchPointsReset: Date.now()
        });
      },

      checkAndResetDailyPoints: () => {
        const { lastMatchPointsReset } = get();
        const now = Date.now();
        
        if ((now - lastMatchPointsReset) >= MS_PER_DAY) {
          set({
            matchPoints: DAILY_POINTS,
            lastMatchPointsReset: now
          });
        }
      }
    }),
    {
      name: 'user-storage',
      version: 2
    }
  )
);