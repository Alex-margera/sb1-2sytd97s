import create from 'zustand';
import { persist } from 'zustand/middleware';
import { DialogMessage } from '../types/dialog';

interface ChatProgress {
  messages: DialogMessage[];
  lastMessageId: string | null;
  isCompleted: boolean;
}

interface ProgressState {
  chatProgress: Record<string, ChatProgress>;
  matchedProfiles: Set<string>;
  saveMessages: (characterId: string, messages: DialogMessage[]) => void;
  markChatCompleted: (characterId: string) => void;
  addMatchedProfile: (characterId: string) => void;
  resetProgress: () => void;
  getProgress: (characterId: string) => ChatProgress | null;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      chatProgress: {},
      matchedProfiles: new Set<string>(),

      saveMessages: (characterId, messages) => set((state) => ({
        chatProgress: {
          ...state.chatProgress,
          [characterId]: {
            ...(state.chatProgress[characterId] || { isCompleted: false }),
            messages,
            lastMessageId: messages[messages.length - 1]?.id || null
          }
        }
      })),

      markChatCompleted: (characterId) => set((state) => ({
        chatProgress: {
          ...state.chatProgress,
          [characterId]: {
            ...(state.chatProgress[characterId] || { messages: [], lastMessageId: null }),
            isCompleted: true
          }
        }
      })),

      addMatchedProfile: (characterId) => set((state) => ({
        matchedProfiles: new Set([...Array.from(state.matchedProfiles), characterId])
      })),

      getProgress: (characterId) => {
        const state = get();
        return state.chatProgress[characterId] || null;
      },

      resetProgress: () => set({
        chatProgress: {},
        matchedProfiles: new Set()
      })
    }),
    {
      name: 'dating-progress',
      version: 1
    }
  )
);
