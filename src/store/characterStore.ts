import create from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterDetails, CharacterPreferences, Gender } from '../types/character';

interface CharacterStore {
  character: CharacterDetails;
  setBasicDetails: (details: Partial<Pick<CharacterDetails, 'name' | 'gender' | 'age' | 'avatarId'>>) => void;
  setPreferences: (preferences: Partial<CharacterPreferences>) => void;
  resetCharacter: () => void;
}

const initialPreferences: CharacterPreferences = {
  romantic: 'none',
  personality: [],
  interests: []
};

const initialCharacter: CharacterDetails = {
  name: '',
  gender: null,
  age: null,
  avatarId: null,
  preferences: initialPreferences
};

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      character: initialCharacter,
      
      setBasicDetails: (details) =>
        set((state) => ({
          character: { ...state.character, ...details }
        })),
        
      setPreferences: (preferences) =>
        set((state) => ({
          character: {
            ...state.character,
            preferences: { ...state.character.preferences, ...preferences }
          }
        })),
        
      resetCharacter: () => 
        set({ character: initialCharacter })
    }),
    {
      name: 'character-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            character: initialCharacter,
            ...persistedState
          };
        }
        return persistedState;
      }
    }
  )
);