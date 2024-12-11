export type Gender = 'male' | 'female' | 'nonbinary' | null;

export interface CharacterPreferences {
  romantic: 'men' | 'women' | 'both' | 'none';
  personality: string[];
  interests: string[];
}

export interface CharacterDetails {
  name: string;
  gender: Gender;
  age: number | null;
  avatarId?: string;
  preferences: CharacterPreferences;
}

export interface Character {
  id: string;
  name: string;
  gender: string;
  avatar: string;
  zodiacSymbol: string;
  tags: string[];
  bio: string;
  relationshipLevel: number;
  relationshipPoints: number;
}

export interface ChatResponse {
  id: string;
  text: string;
  isPremium: boolean;
  relationshipPoints?: number;
}