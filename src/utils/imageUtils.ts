import { IMAGE_PATHS } from '../constants/imagePaths';

export function getCharacterImagePath(characterId: string, type: 'profile' | 'events' | 'emotions' | 'outfits'): string {
  return `/assets/images/characters/${type}/${characterId}.png`;
}

export function getLocationImagePath(locationType: string, locationId: string): string {
  return `/assets/images/locations/${locationType}/${locationId}.png`;
}

export function getEventImagePath(eventType: string, eventId: string): string {
  return `/assets/images/events/${eventType}/${eventId}.png`;
}

export function getItemImagePath(itemType: string, itemId: string): string {
  return `/assets/images/items/${itemType}/${itemId}.png`;
}

export function getUIImagePath(uiType: string, elementId: string): string {
  return `/assets/images/ui/${uiType}/${elementId}.png`;
}