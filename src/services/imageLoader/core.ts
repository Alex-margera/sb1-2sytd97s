import { ImageLoaderConfig, ImageLoaderState, ImageLoadResult } from './types';
import { DEFAULT_CONFIG, FALLBACK_IMAGE } from './config';

class ImageLoader {
  private static instance: ImageLoader;
  private state: ImageLoaderState = {
    loadedImages: new Map(),
    failedImages: new Set(),
    loadingPromises: new Map()
  };
  private config: ImageLoaderConfig = DEFAULT_CONFIG;

  private constructor() {}

  static getInstance(): ImageLoader {
    if (!ImageLoader.instance) {
      ImageLoader.instance = new ImageLoader();
    }
    return ImageLoader.instance;
  }

  private async loadSingleImage(url: string): Promise<ImageLoadResult> {
    // Skip invalid URLs
    if (!url || typeof url !== 'string') {
      return { success: false, url: url || '', error: 'Invalid URL' };
    }

    if (this.state.loadedImages.has(url)) {
      return { success: true, url };
    }

    if (this.state.failedImages.has(url)) {
      return { success: false, url, error: 'Image previously failed to load' };
    }

    let attempts = 0;
    while (attempts < this.config.retryAttempts) {
      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          
          const timeoutId = setTimeout(() => {
            img.src = '';
            reject(new Error('Image load timeout'));
          }, this.config.timeout);

          img.onload = () => {
            clearTimeout(timeoutId);
            resolve(img);
          };

          img.onerror = () => {
            clearTimeout(timeoutId);
            img.src = '';
            reject(new Error('Image load failed'));
          };

          img.src = url;
        });

        this.state.loadedImages.set(url, img);
        return { success: true, url };
      } catch (error) {
        attempts++;
        if (attempts < this.config.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        }
      }
    }

    this.state.failedImages.add(url);
    return { success: false, url, error: `Failed after ${attempts} attempts` };
  }

  async preloadImages(urls: string[], onProgress?: (progress: number) => void): Promise<ImageLoadResult[]> {
    // Filter out invalid URLs
    const validUrls = urls.filter(url => url && typeof url === 'string');
    const totalImages = validUrls.length;
    
    if (totalImages === 0) {
      return [];
    }

    const results: ImageLoadResult[] = [];
    let loadedCount = 0;

    // Load images in batches of 3
    const batchSize = 3;
    for (let i = 0; i < totalImages; i += batchSize) {
      const batch = validUrls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(url => this.loadSingleImage(url))
      );
      
      results.push(...batchResults);
      loadedCount += batch.length;
      
      if (onProgress) {
        onProgress((loadedCount / totalImages) * 100);
      }

      // Small delay between batches to prevent overwhelming
      if (i + batchSize < totalImages) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  getImageUrl(url: string): string {
    return this.state.loadedImages.has(url) ? url : FALLBACK_IMAGE;
  }

  clearCache(): void {
    this.state.loadedImages.clear();
    this.state.failedImages.clear();
    this.state.loadingPromises.clear();
  }
}

export const imageLoader = ImageLoader.getInstance();