import { motion } from 'framer-motion';
import { zodiacs } from '../data/zodiacs';
import { Button } from './ui/Button';
import { useCharacterStore } from '../store/characterStore';
import { ZodiacSelectionProps } from '../types/zodiac';

export const ZodiacSelection: React.FC<ZodiacSelectionProps> = ({ onContinue }) => {
  const { character, setPreferences } = useCharacterStore();
  const selectedZodiac = character.preferences.interests[0] || null;

  const handleZodiacSelect = (zodiacId: string) => {
    setPreferences({ interests: [zodiacId] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Pick your zodiac</h1>
        <p className="text-gray-400">What's your star sign?</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {zodiacs.map((zodiac) => (
          <button
            key={zodiac.id}
            onClick={() => handleZodiacSelect(zodiac.id)}
            className={`
              flex flex-col items-center justify-center
              aspect-square rounded-full
              ${selectedZodiac === zodiac.id ? 'bg-purple-600' : 'bg-gray-800'}
              transition-colors duration-200 hover:bg-gray-700
            `}
          >
            <span className="text-2xl mb-1">{zodiac.symbol}</span>
            <span className="text-sm text-gray-200">{zodiac.name}</span>
          </button>
        ))}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedZodiac}
        className="w-full"
      >
        Continue
      </Button>
    </motion.div>
  );
};