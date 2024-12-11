import React from 'react';
import { Character } from '../../types/character';
import { DateBackground } from './DateBackground';
import { DateCharacter } from './DateCharacter';
import { DateMessage } from './DateMessage';
import { DateOptions } from './DateOptions';
import { DateEndScreen } from './DateEndScreen';
import { useDateDialog } from '../../hooks/useDateDialog';

interface DateScreenProps {
  character: Character;
  onBackToMenu: () => void;
}

export const DateScreen: React.FC<DateScreenProps> = ({ character, onBackToMenu }) => {
  const {
    currentMessage,
    currentOptions,
    currentBackground,
    characterImage,
    isComplete,
    handleOptionSelect,
    handleNext
  } = useDateDialog();

  if (isComplete) {
    return <DateEndScreen onBackToMenu={onBackToMenu} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="h-full max-w-sm mx-auto flex flex-col relative">
        <DateBackground url={currentBackground} />

        <div className="absolute inset-0 flex flex-col" onClick={handleNext}>
          <DateCharacter 
            imageUrl={characterImage}
            characterName={character.name}
            show={!!characterImage}
          />

          <div className="mt-auto">
            {currentMessage && (
              <DateMessage message={currentMessage} />
            )}

            {currentOptions && (
              <DateOptions 
                options={currentOptions}
                onSelect={handleOptionSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};