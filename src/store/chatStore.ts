import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ChatOption } from '../types/chat';

interface ChatState {
  messages: Record<string, ChatMessage[]>;
  resetChat: (characterId: string) => void;
  addMessage: (characterId: string, message: ChatMessage) => void;
  getMessages: (characterId: string) => ChatMessage[];
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: {},

      resetChat: (characterId: string) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [characterId]: []
          }
        })),

      addMessage: (characterId: string, message: ChatMessage) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [characterId]: [...(state.messages[characterId] || []), message]
          }
        })),

      getMessages: (characterId: string) => {
        const state = get();
        return state.messages[characterId] || [];
      }
    }),
    {
      name: 'chat-storage',
      version: 1
    }
  )
);