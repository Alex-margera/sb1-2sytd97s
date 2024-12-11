import { Character, CharacterDetails } from '../types/character';

export function calculateMatchScore(userPrefs: CharacterDetails, character: Character): number {
  let score = 0;
  
  // Gender preference match (30 points)
  if (userPrefs.preferences.romantic === character.gender || 
      userPrefs.preferences.romantic === 'both') {
    score += 30;
  }

  // Genre/personality match (40 points)
  const userGenres = userPrefs.preferences.personality.map(p => p.toLowerCase());
  const characterTags = character.tags.map(t => t.toLowerCase());
  const matchingTags = characterTags.filter(tag => userGenres.includes(tag));
  score += (matchingTags.length / Math.max(characterTags.length, 1)) * 40;

  // Zodiac match (30 points)
  if (userPrefs.preferences.interests[0]?.toLowerCase() === character.zodiacSymbol.toLowerCase()) {
    score += 30;
  }

  return Math.min(score, 100);
}