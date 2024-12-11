import { ImageLoaderConfig, ImageLoadResult } from './types';
import { DEFAULT_CONFIG, FALLBACK_IMAGE } from './config';
import { validateUrl, createImage, delay } from './utils';

export class ImageLoader {
  private static instance: ImageLoader;
  private loadedImages: Map<string, HTMLImageElement>;
  private failedImages: Set<string>;
  private config: ImageLoaderConfig;
  private loadingPromises: Map<string, Promise<ImageLoadResult>>;

  private constructor() {
    this.loadedImages = new Map();
    this.failedImages = new Set();
    this.loadingPromises = new Map();
    this.config = DEFAULT_CONFIG;
  }

  static getInstance(): ImageLoader {
    if (!ImageLoader.instance) {
      ImageLoader.instance = new ImageLoader();
    }
    return ImageLoader.instance;
  }

  private async loadSingleImage(url: string): Promise<ImageLoadResult> {
    if (!validateUrl(url)) {
      return { success: false, url, error: 'Invalid URL' };
    }

    if (this.loadedImages.has(url)) {
      return { success: true, url };
    }

    if (this.failedImages.has(url)) {
      return { success: false, url, error: 'Previously failed' };
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const loadPromise = new Promise<ImageLoadResult>(async (resolve) => {
      try {
        const img = await createImage(url, this.config.timeout);
        this.loadedImages.set(url, img);
        resolve({ success: true, url });
      } catch (error) {
        this.failedImages.add(url);
        resolve({ success: false, url, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    });

    this.loadingPromises.set(url, loadPromise);

    try {
      const result = await loadPromise;
      this.loadingPromises.delete(url);
      return result;
    } catch (error) {
      this.loadingPromises.delete(url);
      this.failedImages.add(url);
      return { success: false, url, error: 'Unexpected error' };
    }
  }

  async loadImages(urls: string[], onProgress?: (progress: number) => void): Promise<ImageLoadResult[]> {
    const validUrls = urls.filter(validateUrl);
    const results: ImageLoadResult[] = [];
    let loadedCount = 0;

    // Load images in smaller batches
    for (let i = 0; i < validUrls.length; i += this.config.batchSize) {
      const batch = validUrls.slice(i, i + this.config.batchSize);
      const batchResults = await Promise.all(
        batch.map(url => this.loadSingleImage(url))
      );
      
      results.push(...batchResults);
      loadedCount += batch.length;
      
      if (onProgress) {
        onProgress((loadedCount / validUrls.length) * 100);
      }

      if (i + this.config.batchSize < validUrls.length) {
        await delay(this.config.batchDelay);
      }
    }

    return results;
  }

  getImageUrl(url: string): string {
    return this.loadedImages.has(url) ? url : FALLBACK_IMAGE;
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.failedImages.clear();
    this.loadingPromises.clear();
  }
}