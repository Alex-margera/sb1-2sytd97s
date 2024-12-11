export interface ImageLoaderConfig {
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface ImageLoadResult {
  success: boolean;
  url: string;
  error?: string;
}

export interface ImageLoaderState {
  loadedImages: Map<string, HTMLImageElement>;
  failedImages: Set<string>;
  loadingPromises: Map<string, Promise<HTMLImageElement>>;
}