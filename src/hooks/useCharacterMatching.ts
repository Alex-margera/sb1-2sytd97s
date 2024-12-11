import { useMemo } from 'react';
import { Character } from '../types/character';
import { characters } from '../data/characters';

export function useCharacterMatching() {
  const getMatchedCharacters = useMemo(() => (matchedIds: string[]): Character[] => {
    return characters.filter(char => matchedIds.includes(char.id));
  }, []);

  const getUnmatchedCharacters = useMemo(() => (matchedIds: string[]): Character[] => {
    return characters.filter(char => !matchedIds.includes(char.id));
  }, []);

  return {
    getMatchedCharacters,
    getUnmatchedCharacters
  };
}