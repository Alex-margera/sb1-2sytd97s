import React from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BasicInfoScreenProps {
  onContinue: () => void;
}

export const BasicInfoScreen: React.FC<BasicInfoScreenProps> = ({ onContinue }) => {
  const { character, setBasicDetails } = useCharacterStore();
  const isValid = character.name && character.gender && character.age;

  const genderOptions = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'nonbinary', label: 'Non-binary' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Create Your Character</h1>
        <p className="text-gray-400">Let's start with the basics</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What's your name?
          </label>
          <Input
            type="text"
            value={character.name}
            onChange={(e) => setBasicDetails({ name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How old are you?
          </label>
          <Input
            type="number"
            value={character.age || ''}
            onChange={(e) => setBasicDetails({ age: parseInt(e.target.value) || null })}
            placeholder="Enter your age"
            min="18"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setBasicDetails({ gender: option.id as any })}
                className={`
                  px-4 py-3 rounded-lg capitalize
                  ${character.gender === option.id ? 'bg-purple-600' : 'bg-gray-800'}
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
        disabled={!isValid}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};