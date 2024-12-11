import create from 'zustand';
import { persist } from 'zustand/middleware';

interface MatchStore {
  matchedProfiles: Set<string>;
  hasStartedChatting: boolean;
  markAsMatched: (characterId: string) => void;
  isMatched: (characterId: string) => boolean;
  setHasStartedChatting: (value: boolean) => void;
  resetMatches: () => void;
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matchedProfiles: new Set<string>(),
      hasStartedChatting: false,
      
      markAsMatched: (characterId: string) => {
        set(state => ({
          matchedProfiles: new Set([...Array.from(state.matchedProfiles), characterId])
        }));
      },

      isMatched: (characterId: string) => {
        return get().matchedProfiles.has(characterId);
      },

      setHasStartedChatting: (value: boolean) => {
        set({ hasStartedChatting: value });
      },

      resetMatches: () => {
        set({
          matchedProfiles: new Set(),
          hasStartedChatting: false
        });
      }
    }),
    {
      name: 'match-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Convert array to Set if needed
          const matchedProfiles = new Set(persistedState.matchedProfiles || []);
          return {
            ...persistedState,
            matchedProfiles
          };
        }
        return persistedState;
      }
    }
  )
);