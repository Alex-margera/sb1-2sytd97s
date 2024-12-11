import { useState, useEffect } from 'react';
import { imagePreloader } from '../services/imagePreloader';

export function useImagePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await imagePreloader.preloadAllImages((progress) => {
          setProgress(progress);
        });
        setIsLoading(false);
      } catch (err) {
        console.error('Error during image preloading:', err);
        setError('Failed to load images. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return { progress, isLoading, error };
}