import { Character, CharacterDetails } from '../types/character';
import { characters } from '../data/characters';

export function getMatchingProfiles(userPreferences: CharacterDetails, matchedIds: Set<string>): Character[] {
  // Filter out already matched profiles
  const availableCharacters = characters.filter(char => !matchedIds.has(char.id));

  // Filter by gender preference
  const eligibleProfiles = availableCharacters.filter(character => {
    switch (userPreferences.preferences.romantic) {
      case 'women':
        return character.gender === 'female';
      case 'men':
        return character.gender === 'male';
      case 'both':
        return true;
      default:
        return false;
    }
  });

  // Add some randomization for variety while maintaining a minimum number of profiles
  const shuffledProfiles = eligibleProfiles.sort(() => Math.random() - 0.5);
  
  // Ensure we have at least 5 profiles by duplicating if necessary
  const result: Character[] = [];
  while (result.length < 5 && shuffledProfiles.length > 0) {
    result.push(...shuffledProfiles);
  }

  return result.slice(0, 10); // Return max 10 profiles
}