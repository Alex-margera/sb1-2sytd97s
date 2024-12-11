export const DEFAULT_CONFIG = {
  timeout: 2000, // Reduced timeout since we're using local images
  retryAttempts: 1, // Single attempt for local files
  retryDelay: 100,
  batchSize: 4,
  batchDelay: 50
};

export const CRITICAL_TIMEOUT = 1000;
export const FALLBACK_IMAGE = '/assets/images/placeholder/placeholder.jpg';