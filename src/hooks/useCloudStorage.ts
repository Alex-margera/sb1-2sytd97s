import { useState } from 'react';
import { StorageService } from '../services/storageService';

interface UseCloudStorageReturn {
  uploadImage: (file: File, folder: string) => Promise<string>;
  deleteImage: (imageUrl: string) => Promise<void>;
  isUploading: boolean;
  progress: number;
  error: Error | null;
}

export function useCloudStorage(): UseCloudStorageReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    try {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      const url = await StorageService.uploadImage(file, folder, (progress) => {
        setProgress(progress);
      });
      
      setProgress(100);
      return url;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (imageUrl: string): Promise<void> => {
    try {
      setError(null);
      await StorageService.deleteImage(imageUrl);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    progress,
    error
  };
}