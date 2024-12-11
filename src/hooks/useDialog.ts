import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogMessage, DialogOption } from '../types/dialog';
import { useUserStore } from '../store/userStore';
import { useRelationshipStore } from '../store/relationshipStore';

export function useDialog(initialDialog: Dialog, characterId: string) {
  const [currentSectionId, setCurrentSectionId] = useState('initial');
  const [messages, setMessages] = useState<DialogMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showBlocker, setShowBlocker] = useState(false);
  const [showDateButton, setShowDateButton] = useState(false);

  const { deductStars } = useUserStore();
  const { addPoints } = useRelationshipStore();

  const processNextMessages = useCallback(async (section: Dialog[keyof Dialog]) => {
    if (!section?.messages) return;

    setIsTyping(true);
    setShowOptions(false);
    setShowBlocker(false);
    setShowDateButton(false);

    for (const message of section.messages) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, message]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsTyping(false);

    if (section.showBlocker) {
      setShowBlocker(true);
    } else if (section.showDateButton) {
      setShowDateButton(true);
    } else if (section.options) {
      setShowOptions(true);
    }
  }, []);

  const handleOptionSelect = useCallback(async (option: DialogOption) => {
    if (option.isPremium && !deductStars(option.cost)) {
      return;
    }

    if (option.isPremium) {
      addPoints(characterId, option.relationshipPoints);
    }

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      text: option.text,
      type: 'user'
    }]);

    const currentSection = initialDialog[currentSectionId];
    if (currentSection?.nextSectionId) {
      const nextSection = initialDialog[currentSection.nextSectionId];
      setCurrentSectionId(currentSection.nextSectionId);
      await processNextMessages(nextSection);
    }
  }, [addPoints, characterId, currentSectionId, deductStars, initialDialog, processNextMessages]);

  const handleUnblock = useCallback(() => {
    if (!deductStars(30)) return;
    
    setShowBlocker(false);
    const currentSection = initialDialog[currentSectionId];
    if (currentSection?.nextSectionId) {
      const nextSection = initialDialog[currentSection.nextSectionId];
      setCurrentSectionId(currentSection.nextSectionId);
      processNextMessages(nextSection);
    }
  }, [currentSectionId, deductStars, initialDialog, processNextMessages]);

  // Start initial dialog
  useEffect(() => {
    const initialSection = initialDialog.initial;
    if (initialSection) {
      processNextMessages(initialSection);
    }
  }, [initialDialog, processNextMessages]);

  return {
    messages,
    currentSection: initialDialog[currentSectionId],
    isTyping,
    showOptions,
    showBlocker,
    showDateButton,
    handleOptionSelect,
    handleUnblock
  };
}