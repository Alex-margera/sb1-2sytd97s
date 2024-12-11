import create from 'zustand';
import { persist } from 'zustand/middleware';

interface RelationshipState {
  relationships: Record<string, {
    level: number;
    points: number;
  }>;
  resetRelationship: (characterId: string) => void;
  addPoints: (characterId: string, points: number) => void;
  getRelationship: (characterId: string) => { level: number; points: number };
}

export const useRelationshipStore = create<RelationshipState>()(
  persist(
    (set, get) => ({
      relationships: {},

      resetRelationship: (characterId: string) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [characterId]: {
              level: 0,
              points: 0
            }
          }
        })),

      addPoints: (characterId: string, points: number) => {
        set((state) => {
          const current = state.relationships[characterId] || { level: 0, points: 0 };
          let newPoints = current.points + points;
          let newLevel = current.level;

          // Level up when reaching 60 points
          if (newPoints >= 60) {
            newLevel++;
            newPoints = newPoints - 60;
          }

          return {
            relationships: {
              ...state.relationships,
              [characterId]: {
                level: newLevel,
                points: newPoints
              }
            }
          };
        });
      },

      getRelationship: (characterId: string) => {
        const state = get();
        return state.relationships[characterId] || { level: 0, points: 0 };
      }
    }),
    {
      name: 'relationship-storage',
      version: 1
    }
  )
);