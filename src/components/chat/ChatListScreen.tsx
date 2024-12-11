import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/character';
import { ChatScreen } from './ChatScreen';
import { ChatListHeader } from './ChatListHeader';
import { ChatListItem } from './ChatListItem';
import { useMatchStore } from '../../store/matchStore';
import { useCharacterMatching } from '../../hooks/useCharacterMatching';

interface ChatListScreenProps {
  onClose: () => void;
  character?: Character;
  onBackToDating: () => void;
}

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ 
  onClose, 
  character: initialCharacter,
  onBackToDating 
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(initialCharacter || null);
  const { matchedProfiles } = useMatchStore();
  const { getMatchedCharacters } = useCharacterMatching();
  
  const matchedCharacters = React.useMemo(() => 
    getMatchedCharacters(Array.from(matchedProfiles)),
    [matchedProfiles, getMatchedCharacters]
  );

  if (selectedCharacter) {
    return (
      <ChatScreen 
        character={selectedCharacter} 
        onClose={onClose}
        onBackToList={() => setSelectedCharacter(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm h-[calc(100vh-4rem)] flex flex-col bg-[#17212b] rounded-3xl overflow-hidden"
      >
        <ChatListHeader onClose={onBackToDating} />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {matchedCharacters.length > 0 ? (
            matchedCharacters.map(character => (
              <ChatListItem
                key={character.id}
                name={character.name}
                avatar={character.avatar}
                message={character.bio}
                online={true}
                onClick={() => setSelectedCharacter(character)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-6xl mb-4">💭</span>
              <p className="text-center">No matches yet.</p>
              <p className="text-center text-sm">Start swiping to find your match!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};