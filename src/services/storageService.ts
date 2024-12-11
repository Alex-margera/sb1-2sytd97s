import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export class StorageService {
  private static imageCache = new Map<string, string>();

  static async getImageUrl(path: string): Promise<string> {
    // Return cached URL if available
    if (this.imageCache.has(path)) {
      return this.imageCache.get(path)!;
    }

    try {
      // For URLs that are already complete (like Firebase Storage URLs)
      if (path.startsWith('http')) {
        this.imageCache.set(path, path);
        return path;
      }

      // For paths that need to be resolved from Firebase Storage
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      this.imageCache.set(path, url);
      return url;
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw error;
    }
  }

  static clearCache(): void {
    this.imageCache.clear();
  }

  static preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }
}