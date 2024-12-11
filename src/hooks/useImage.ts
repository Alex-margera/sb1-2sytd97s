import { useState, useEffect } from 'react';
import { FALLBACK_IMAGE } from '../constants/images';

export function useImage(url: string | undefined) {
  const [imageUrl, setImageUrl] = useState(url || FALLBACK_IMAGE);

  useEffect(() => {
    if (!url) {
      setImageUrl(FALLBACK_IMAGE);
      return;
    }

    setImageUrl(url);
  }, [url]);

  return { imageUrl };
}