import { useState, useCallback } from 'react';
import { DateMessageType, DateOption } from '../types/date';
import { FIREBASE_URLS } from '../constants/urls';
import { useUserStore } from '../store/userStore';

const DATE_SCENARIO = {
  backgrounds: {
    bar: FIREBASE_URLS.date.jane.backgrounds.bar,
    rooftop: FIREBASE_URLS.date.jane.backgrounds.rooftop
  },
  characters: {
    talking: FIREBASE_URLS.date.jane.characters.talking,
    moving: FIREBASE_URLS.date.jane.characters.moving,
    drinking: FIREBASE_URLS.date.jane.characters.drinking,
    talking2: FIREBASE_URLS.date.jane.characters.talking2,
    flirt: FIREBASE_URLS.date.jane.characters.flirt
  },
  messages: [
    { id: 1, text: "Rooftop bar with city lights in the distance, soft music playing in the background.", isCharacterDialog: false },
    { id: 2, text: "The door to the rooftop opens, and Jane steps through confidently. Her sleek, figure-hugging outfit catches the light, emphasizing her elegant presence. She spots the player and smiles warmly.", isCharacterDialog: false },
    { id: 3, text: "So, you showed up. I like that. A person who keeps their promises is rare these days.", isCharacterDialog: true },
    { id: 4, text: "This is one of my favorite spots. The view, the quiet hum of the city… it's perfect for forgetting the chaos below.", isCharacterDialog: true },
    { id: 5, text: "You're smooth. Careful, or I might start expecting compliments every time we meet.", isCharacterDialog: true },
    { id: 6, text: "Tell me something. Do you like quiet nights like this, or do you crave excitement?", isCharacterDialog: true },
    { id: 7, text: "Good answer. Maybe you're someone who knows how to keep things interesting.", isCharacterDialog: true },
    { id: 8, text: "Come on. I want to show you something.", isCharacterDialog: true },
    { id: 9, text: "She leads you to the edge of the rooftop. You see revealing the glowing city skyline. The hum of traffic below blends with the soft music in the background.", isCharacterDialog: false }
  ],
  options: [
    {
      messageId: 3,
      options: [
        { id: '3-1', text: "How could I resist, knowing you'd be here?", isPremium: true, cost: 10 },
        { id: '3-2', text: "I wouldn't miss this for anything.", isPremium: false },
        { id: '3-3', text: "You made it impossible to stay away.", isPremium: false }
      ]
    },
    {
      messageId: 4,
      options: [
        { id: '4-1', text: "This view is incredible, but it's nothing compared to sitting here with you.", isPremium: true, cost: 15 },
        { id: '4-2', text: "It's stunning, but it doesn't hold a candle to you.", isPremium: false },
        { id: '4-3', text: "You have excellent taste in spots.", isPremium: false }
      ]
    },
    {
      messageId: 6,
      options: [
        { id: '6-1', text: "Tonight, I just want to enjoy this moment with you.", isPremium: true, cost: 10 },
        { id: '6-2', text: "Quiet nights are my favorite, especially with the right company.", isPremium: false },
        { id: '6-3', text: "I think balance is key—sometimes quiet, sometimes thrilling.", isPremium: false }
      ]
    }
  ]
};

export function useDateDialog() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { stars, deductStars } = useUserStore();

  const currentMessage = DATE_SCENARIO.messages[currentMessageIndex];
  const currentOptions = DATE_SCENARIO.options.find(o => o.messageId === currentMessage?.id)?.options;

  const getBackground = useCallback(() => {
    if (currentMessageIndex >= DATE_SCENARIO.messages.length - 1) {
      return DATE_SCENARIO.backgrounds.rooftop;
    }
    return DATE_SCENARIO.backgrounds.bar;
  }, [currentMessageIndex]);

  const getCharacterImage = useCallback(() => {
    if (currentMessageIndex < 2) return null;
    if (currentMessageIndex === 2) return DATE_SCENARIO.characters.talking;
    if (currentMessageIndex === 3) return DATE_SCENARIO.characters.moving;
    if (currentMessageIndex === 4) return DATE_SCENARIO.characters.drinking;
    if (currentMessageIndex === 5) return DATE_SCENARIO.characters.talking;
    if (currentMessageIndex === 6) return DATE_SCENARIO.characters.talking2;
    if (currentMessageIndex === 7) return DATE_SCENARIO.characters.flirt;
    return null;
  }, [currentMessageIndex]);

  const handleOptionSelect = useCallback((option: DateOption) => {
    if (option.isPremium && !deductStars(option.cost)) {
      return;
    }
    setCurrentMessageIndex(prev => prev + 1);
  }, [deductStars]);

  const handleNext = useCallback(() => {
    if (currentOptions) return;
    
    if (currentMessageIndex >= DATE_SCENARIO.messages.length - 1) {
      setIsComplete(true);
      return;
    }
    
    setCurrentMessageIndex(prev => prev + 1);
  }, [currentMessageIndex, currentOptions]);

  return {
    currentMessage,
    currentOptions,
    currentBackground: getBackground(),
    characterImage: getCharacterImage(),
    isComplete,
    handleOptionSelect,
    handleNext
  };
}