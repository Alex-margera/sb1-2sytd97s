import { useState, useEffect } from 'react';
import { ImageLoader } from '../services/imageLoader/ImageLoader';
import { ImageLoadResult } from '../services/imageLoader/types';

export function useImageLoading(urls: string[], shouldLoad: boolean = true) {
  const [state, setState] = useState({
    progress: 0,
    isLoading: true,
    results: [] as ImageLoadResult[],
    error: null as string | null
  });

  useEffect(() => {
    if (!shouldLoad) return;

    const imageLoader = ImageLoader.getInstance();
    let mounted = true;

    const loadImages = async () => {
      try {
        const results = await imageLoader.loadImages(urls, (progress) => {
          if (mounted) {
            setState(prev => ({ ...prev, progress }));
          }
        });

        if (mounted) {
          const failedImages = results.filter(r => !r.success);
          setState(prev => ({
            ...prev,
            results,
            isLoading: false,
            error: failedImages.length === urls.length 
              ? 'Failed to load images' 
              : null
          }));
        }
      } catch (err) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to load images'
          }));
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, [urls, shouldLoad]);

  return state;
}