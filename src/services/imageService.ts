import { IMAGES } from '../constants/images';
import { avatars } from '../data/avatars';
import { characters } from '../data/characters';

const FALLBACK_IMAGE = '/assets/images/placeholder/placeholder.jpg';

class ImageService {
  private static instance: ImageService;
  private loadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();
  private erroredImages: Set<string> = new Set();

  private constructor() {}

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  private async loadImage(url: string): Promise<HTMLImageElement> {
    if (this.erroredImages.has(url)) {
      return this.loadedImages.get(FALLBACK_IMAGE)!;
    }

    if (this.loadedImages.has(url)) {
      return this.loadedImages.get(url)!;
    }

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
        this.erroredImages.add(url);
        // Load fallback image instead
        this.loadImage(FALLBACK_IMAGE).then(resolve).catch(reject);
      };

      // Add cache-busting parameter
      const cacheBuster = `?t=${Date.now()}`;
      img.src = url.includes('?') ? `${url}&cb=${cacheBuster}` : `${url}${cacheBuster}`;
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  async preloadAllImages(onProgress: (progress: number) => void): Promise<void> {
    const imagesToLoad = new Set([
      ...Object.values(IMAGES.characters),
      ...avatars.map(avatar => avatar.imageUrl),
      ...characters.map(char => char.avatar),
      IMAGES.backgrounds.chat,
      FALLBACK_IMAGE
    ]);

    const totalImages = imagesToLoad.size;
    let loadedCount = 0;

    try {
      await Promise.all(
        Array.from(imagesToLoad).map(async (url) => {
          try {
            await this.loadImage(url);
          } catch (error) {
            console.error(`Failed to load image: ${url}`, error);
          } finally {
            loadedCount++;
            onProgress((loadedCount / totalImages) * 100);
          }
        })
      );
    } catch (error) {
      console.error('Error during image preloading:', error);
      throw error;
    }
  }

  getLoadedImage(url: string): string {
    if (this.erroredImages.has(url)) {
      return FALLBACK_IMAGE;
    }
    const img = this.loadedImages.get(url);
    return img ? url : FALLBACK_IMAGE;
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
    this.erroredImages.clear();
  }

  hasError(url: string): boolean {
    return this.erroredImages.has(url);
  }
}

export const imageService = ImageService.getInstance();