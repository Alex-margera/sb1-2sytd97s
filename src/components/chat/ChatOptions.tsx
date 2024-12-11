import React from 'react';
import { DialogOption } from '../../types/dialog';
import { ChatOption } from './ChatOption';

interface ChatOptionsProps {
  options: DialogOption[];
  onSelect: (option: DialogOption) => void;
}

export const ChatOptions: React.FC<ChatOptionsProps> = ({ options, onSelect }) => {
  // Sort options to show premium first, then free options
  const sortedOptions = [...options].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent">
      <div className="max-w-sm mx-auto space-y-2">
        {sortedOptions.map((option) => (
          <ChatOption
            key={option.id}
            option={option}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};