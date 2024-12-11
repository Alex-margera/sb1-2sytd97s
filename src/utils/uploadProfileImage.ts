import { StorageService } from '../services/storageService';

export async function uploadProfileImage(
  imageUrl: string,
  characterId: string
): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Convert blob to File object
    const file = new File([blob], `${characterId}.png`, { type: 'image/png' });
    
    // Upload to Firebase Storage
    const downloadUrl = await StorageService.uploadImage(
      file,
      `characters/profile`,
      undefined
    );
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}