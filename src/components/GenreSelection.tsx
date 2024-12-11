import { motion } from 'framer-motion';
import { genres } from '../data/genres';
import { Button } from './ui/Button';
import { useCharacterStore } from '../store/characterStore';
import { GenreSelectionProps } from '../types/genre';

export const GenreSelection: React.FC<GenreSelectionProps> = ({ onContinue }) => {
  const { character, setPreferences } = useCharacterStore();
  const selectedGenres = character.preferences.personality || [];
  const maxSelections = 3;

  const handleGenreSelect = (genreId: string) => {
    const currentGenres = selectedGenres;
    let newGenres: string[];

    if (currentGenres.includes(genreId)) {
      newGenres = currentGenres.filter(id => id !== genreId);
    } else if (currentGenres.length < maxSelections) {
      newGenres = [...currentGenres, genreId];
    } else {
      return;
    }

    setPreferences({ personality: newGenres });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Pick your favorite story genres</h1>
        <p className="text-gray-400">Choose up to {maxSelections} genres</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)}
            disabled={!selectedGenres.includes(genre.id) && selectedGenres.length >= maxSelections}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-lg
              ${selectedGenres.includes(genre.id) ? 'bg-purple-600' : 'bg-gray-800'}
              ${!selectedGenres.includes(genre.id) && selectedGenres.length >= maxSelections
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-700'}
              transition-colors duration-200
            `}
          >
            <span className="text-xl">{genre.icon}</span>
            <span className="text-gray-200">{genre.name}</span>
          </button>
        ))}
      </div>

      <Button
        onClick={onContinue}
        disabled={selectedGenres.length === 0}
        className="w-full"
      >
        Continue {selectedGenres.length}/{maxSelections}
      </Button>
    </motion.div>
  );
};