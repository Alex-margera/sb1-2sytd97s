import { Character } from '../types/character';
import { FIREBASE_URLS } from '../constants/urls';

export const characters: Character[] = [
  {
    id: 'jane',
    name: 'Jane',
    gender: 'female',
    avatar: FIREBASE_URLS.characters.jane,
    zodiacSymbol: '♊',
    tags: ['Spicy', 'One-night', '18+'],
    bio: 'Wanna play with me?'
  },
  {
    id: 'ruby',
    name: 'Ruby',
    gender: 'female',
    avatar: FIREBASE_URLS.characters.ruby,
    zodiacSymbol: '♈',
    tags: ['Action', 'Romance', 'Fantasy'],
    bio: "Let's write our own fairy tale"
  }
];