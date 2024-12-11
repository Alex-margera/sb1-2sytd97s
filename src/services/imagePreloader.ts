import { IMAGES } from '../constants/images';

class ImagePreloader {
  private static instance: ImagePreloader;
  private loadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  private constructor() {}

  static getInstance(): ImagePreloader {
    if (!ImagePreloader.instance) {
      ImagePreloader.instance = new ImagePreloader();
    }
    return ImagePreloader.instance;
  }

  private async preloadImage(url: string): Promise<HTMLImageElement> {
    if (this.loadedImages.has(url)) {
      return this.loadedImages.get(url)!;
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      const timeoutId = setTimeout(() => {
        reject(new Error(`Image load timeout: ${url}`));
      }, 15000);

      img.onload = () => {
        clearTimeout(timeoutId);
        this.loadedImages.set(url, img);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  async preloadAllImages(onProgress: (progress: number) => void): Promise<void> {
    const imagesToLoad = [
      // Character images
      ...Object.values(IMAGES.characters),
      // Avatar images
      ...IMAGES.avatars,
      // Chat images
      ...Object.values(IMAGES.chat.jane.photos),
      // Audio thumbnails (if any)
      ...Object.values(IMAGES.chat.jane.audio)
    ].filter(Boolean); // Remove any undefined/null values

    const totalImages = imagesToLoad.length;
    let loadedCount = 0;

    try {
      await Promise.all(
        imagesToLoad.map(async (url) => {
          try {
            await this.preloadImage(url);
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
    return this.loadedImages.has(url) ? url : '';
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }
}

export const imagePreloader = ImagePreloader.getInstance();