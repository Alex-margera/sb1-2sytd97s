import { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { characters } from '../data/characters';

export function useCharacterImages() {
  const [loadedCharacters, setLoadedCharacters] = useState(characters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedCharacters = await Promise.all(
          characters.map(async (character) => {
            try {
              const imageUrl = await StorageService.getImageUrl(character.avatar);
              return { ...character, avatar: imageUrl };
            } catch (error) {
              console.error(`Failed to load image for ${character.name}:`, error);
              return character;
            }
          })
        );

        setLoadedCharacters(updatedCharacters);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load character images');
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return { characters: loadedCharacters, isLoading, error };
}