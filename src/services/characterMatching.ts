import { Character, CharacterDetails } from '../types/character';
import { characters } from '../data/characters';
import { genres } from '../data/genres';
import { zodiacs } from '../data/zodiacs';

export function calculateMatchScore(userPrefs: CharacterDetails, character: Character): number {
  let score = 0;
  const maxScore = 100;

  // Match based on romantic preference
  if (userPrefs.gender === 'male' && userPrefs.preferences.romantic === 'women') {
    score += 30;
  } else if (userPrefs.gender === 'female' && userPrefs.preferences.romantic === 'men') {
    score += 30;
  } else if (userPrefs.preferences.romantic === 'both') {
    score += 20;
  }

  // Match based on personality/genres
  const matchingTags = character.tags.filter(tag => 
    userPrefs.preferences.personality.includes(tag.toLowerCase())
  );
  score += (matchingTags.length / character.tags.length) * 40;

  // Match based on zodiac compatibility
  const userZodiac = userPrefs.preferences.interests[0];
  if (getZodiacSymbol(userZodiac) === character.zodiacSymbol) {
    score += 30;
  }

  return Math.min(score, maxScore);
}

function getZodiacSymbol(zodiacId: string): string {
  const zodiac = zodiacs.find(z => z.id === zodiacId);
  return zodiac?.symbol || '';
}

export function getNextMatch(userPrefs: CharacterDetails, seenIds: string[] = []): Character | null {
  const availableCharacters = characters.filter(char => !seenIds.includes(char.id));
  
  if (availableCharacters.length === 0) {
    return null;
  }

  // Calculate scores for all available characters
  const scoredCharacters = availableCharacters.map(char => ({
    character: char,
    score: calculateMatchScore(userPrefs, char)
  }));

  // Sort by score and add some randomness for variety
  scoredCharacters.sort((a, b) => {
    const randomFactor = Math.random() * 20 - 10; // -10 to +10
    return (b.score + randomFactor) - (a.score + randomFactor);
  });

  return scoredCharacters[0].character;
}