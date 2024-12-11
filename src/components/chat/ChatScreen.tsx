import React, { useState } from 'react';
import { Character } from '../../types/character';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatOptions } from './ChatOptions';
import { TimerBlocker } from './TimerBlocker';
import { DateScreen } from '../date/DateScreen';
import { useDialog } from '../../hooks/useDialog';
import { janeDialog } from '../../data/dialogs/jane';

interface ChatScreenProps {
  character: Character;
  onClose: () => void;
  onBackToList?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ 
  character, 
  onClose,
  onBackToList 
}) => {
  const [showDateScreen, setShowDateScreen] = useState(false);
  const { 
    messages, 
    currentSection,
    isTyping,
    showOptions,
    showBlocker,
    showDateButton,
    handleOptionSelect,
    handleUnblock
  } = useDialog(janeDialog, character.id);

  if (showDateScreen) {
    return (
      <DateScreen 
        character={character}
        onBackToMenu={onBackToList || onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="h-full max-w-sm mx-auto flex flex-col">
        <ChatHeader character={character} onBack={onClose} />
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <ChatMessages 
            messages={messages} 
            isTyping={isTyping}
            showDateButton={showDateButton}
            onGoOnDate={() => setShowDateScreen(true)}
          />

          {showBlocker && (
            <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto">
              <TimerBlocker onUnblock={handleUnblock} />
            </div>
          )}

          {currentSection?.options && showOptions && !isTyping && !showBlocker && (
            <ChatOptions 
              options={currentSection.options}
              onSelect={handleOptionSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};