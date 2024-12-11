import { useState, useCallback } from 'react';
import { DialogMessage } from '../../types/dialog';
import { DialogState } from './types';
import { useProgressStore } from '../../store/progressStore';

export function useDialogState(characterId: string): DialogState & {
  addMessage: (message: DialogMessage) => void;
  setTyping: (typing: boolean) => void;
  setShowOptions: (show: boolean) => void;
  setShowBlocker: (show: boolean) => void;
} {
  const [state, setState] = useState<DialogState>({
    messages: [],
    isTyping: false,
    showOptions: false,
    showBlocker: false,
    showDateButton: false
  });

  const { saveMessages } = useProgressStore();

  const addMessage = useCallback((message: DialogMessage) => {
    setState(prev => {
      const newMessages = [...prev.messages, { ...message, id: message.id + '-' + Date.now() }];
      saveMessages(characterId, newMessages);
      return { ...prev, messages: newMessages };
    });
  }, [characterId, saveMessages]);

  const setTyping = useCallback((typing: boolean) => {
    setState(prev => ({ ...prev, isTyping: typing }));
  }, []);

  const setShowOptions = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showOptions: show }));
  }, []);

  const setShowBlocker = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showBlocker: show }));
  }, []);

  return {
    ...state,
    addMessage,
    setTyping,
    setShowOptions,
    setShowBlocker
  };
}