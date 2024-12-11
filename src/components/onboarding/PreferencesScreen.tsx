import React from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { Button } from '../ui/Button';

interface PreferencesScreenProps {
  onContinue: () => void;
}

export const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ onContinue }) => {
  const { character, setPreferences } = useCharacterStore();

  const romanticOptions = [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'both', label: 'Both' },
    { id: 'none', label: 'Not interested' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Your Preferences</h1>
        <p className="text-gray-400">Tell us what you're looking for</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Romantic Interest
          </label>
          <div className="grid grid-cols-2 gap-3">
            {romanticOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setPreferences({ romantic: option.id as any })}
                className={`
                  px-4 py-3 rounded-lg capitalize
                  ${character.preferences.romantic === option.id ? 'bg-purple-600' : 'bg-gray-800'}
                  transition-colors duration-200
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        disabled={character.preferences.romantic === 'none'}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};