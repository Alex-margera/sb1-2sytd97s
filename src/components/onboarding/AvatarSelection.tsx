import React from 'react';
import { motion } from 'framer-motion';
import { avatars } from '../../data/avatars';
import { Button } from '../ui/Button';
import { Image } from '../Image';
import { useCharacterStore } from '../../store/characterStore';

interface AvatarSelectionProps {
  onContinue: () => void;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onContinue }) => {
  const { character, setBasicDetails } = useCharacterStore();
  const selectedAvatar = character.avatarId;

  const handleAvatarSelect = (avatarId: string) => {
    setBasicDetails({ avatarId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Pick your avatar</h1>
        <p className="text-gray-400">Choose your look or create your own</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleAvatarSelect(avatar.id)}
            className={`
              relative aspect-square rounded-2xl overflow-hidden
              ${selectedAvatar === avatar.id ? 'ring-4 ring-neon-purple' : ''}
              ${avatar.isCreateAvatar ? 'bg-dark-300' : 'bg-dark-200'}
              transition-all duration-200 hover:ring-2 hover:ring-neon-purple/50
            `}
          >
            {avatar.isCreateAvatar ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-300">
                <span className="text-3xl mb-2">📸</span>
                <span className="text-sm">Create avatar</span>
              </div>
            ) : (
              <div className="w-full h-full">
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  showLoadingIndicator={true}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedAvatar}
        className="w-full"
        glowing
      >
        Continue
      </Button>
    </motion.div>
  );
};