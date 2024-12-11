import { useState, useCallback, useEffect, useRef } from 'react';
import { Dialog, DialogMessage, DialogOption } from '../../types/dialog';
import { useUserStore } from '../../store/userStore';
import { useRelationshipStore } from '../../store/relationshipStore';
import { MessageProcessor } from './messageProcessor';

export function useDialog(dialog: Dialog, characterId: string) {
  const [currentSectionId, setCurrentSectionId] = useState('initial');
  const [messages, setMessages] = useState<DialogMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showBlocker, setShowBlocker] = useState(false);
  const [showDateButton, setShowDateButton] = useState(false);

  const { deductStars } = useUserStore();
  const { addPoints } = useRelationshipStore();
  const processorRef = useRef<MessageProcessor>();

  useEffect(() => {
    processorRef.current = new MessageProcessor(
      (message) => setMessages(prev => [...prev, message]),
      setIsTyping,
      setShowOptions,
      setShowBlocker,
      setShowDateButton
    );

    const initialSection = dialog.initial;
    if (initialSection && processorRef.current) {
      processorRef.current.processSection(initialSection);
    }
  }, [dialog]);

  const handleOptionSelect = useCallback(async (option: DialogOption) => {
    if (option.isPremium && !deductStars(option.cost)) return;

    if (option.isPremium) {
      addPoints(characterId, option.relationshipPoints);
    }

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      text: option.text,
      type: 'user'
    }]);

    const currentSection = dialog[currentSectionId];
    if (currentSection?.nextSectionId) {
      const nextSection = dialog[currentSection.nextSectionId];
      if (nextSection && processorRef.current) {
        setCurrentSectionId(currentSection.nextSectionId);
        await processorRef.current.processSection(nextSection);
      }
    }
  }, [addPoints, characterId, currentSectionId, deductStars, dialog]);

  const handleUnblock = useCallback(() => {
    if (!deductStars(30)) return;
    
    setShowBlocker(false);
    const currentSection = dialog[currentSectionId];
    if (currentSection?.nextSectionId && processorRef.current) {
      const nextSection = dialog[currentSection.nextSectionId];
      if (nextSection) {
        setCurrentSectionId(currentSection.nextSectionId);
        processorRef.current.processSection(nextSection);
      }
    }
  }, [currentSectionId, deductStars, dialog]);

  return {
    messages,
    currentSection: dialog[currentSectionId],
    isTyping,
    showOptions,
    showBlocker,
    showDateButton,
    handleOptionSelect,
    handleUnblock
  };
}