import { IMAGES } from '../constants/images';
import { avatars } from '../data/avatars';
import { characters } from '../data/characters';

class ImageLoader {
  private loadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();
  private progressCallback: ((progress: number) => void) | null = null;

  async preloadImage(url: string): Promise<HTMLImageElement> {
    // Return cached image if available
    if (this.loadedImages.has(url)) {
      return this.loadedImages.get(url)!;
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        this.loadedImages.set(url, img);
        resolve(img);
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  async preloadAllImages(onProgress: (progress: number) => void): Promise<void> {
    this.progressCallback = onProgress;

    // Collect all unique image URLs
    const imagesToLoad = new Set([
      // Character profile images
      ...Object.values(IMAGES.characters),
      // Avatar selection images
      ...avatars.map(avatar => avatar.imageUrl),
      // Character images from data
      ...characters.map(char => char.avatar),
      // Background images
      IMAGES.backgrounds.chat
    ]);

    const totalImages = imagesToLoad.size;
    let loadedCount = 0;

    try {
      await Promise.all(
        Array.from(imagesToLoad).map(async (url) => {
          try {
            await this.preloadImage(url);
            loadedCount++;
            if (this.progressCallback) {
              this.progressCallback((loadedCount / totalImages) * 100);
            }
          } catch (error) {
            console.error(`Failed to load image: ${url}`, error);
          }
        })
      );
    } catch (error) {
      console.error('Error during image preloading:', error);
      throw error;
    }
  }

  getImage(url: string): HTMLImageElement | undefined {
    return this.loadedImages.get(url);
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }
}

export const imageLoader = new ImageLoader();