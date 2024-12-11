import React from 'react';
import { Character } from '../../types/character';
import { useUserStore } from '../../store/userStore';
import { useRelationshipStore } from '../../store/relationshipStore';

interface ChatHeaderProps {
  character: Character;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ character, onBack }) => {
  const { stars } = useUserStore();
  const { getRelationship } = useRelationshipStore();
  const { level, points } = getRelationship(character.id);

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50">
      <div className="max-w-sm mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center text-xl"
            >
              ←
            </button>
            <div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={character.avatar} 
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center text-xs font-bold border-2 border-black">
                    {level}
                  </div>
                </div>
                <div>
                  <h2 className="font-medium">{character.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center px-3 py-1 rounded-full bg-dark-300">
            <span className="text-xl mr-1">⭐</span>
            <span className="font-medium">{stars}</span>
          </div>
        </div>

        <div className="mt-2 px-11">
          <div className="h-1 bg-dark-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neon-purple transition-all duration-300"
              style={{ width: `${(points / 60) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};