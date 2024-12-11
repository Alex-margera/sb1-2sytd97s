import { useState, useEffect } from 'react';
import { storage } from '../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export function useFirebaseConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Use a small test file for connection check
        const testRef = ref(storage, 'test/connection.txt');
        await getDownloadURL(testRef);
        setIsConnected(true);
        setError(null);
      } catch (err: any) {
        console.error('Firebase connection error:', err);
        
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, RETRY_DELAY);
        } else {
          setIsConnected(false);
          setError('Unable to connect to storage. Please check your connection and refresh.');
        }
      }
    };

    checkConnection();
  }, [retryCount]);

  return { isConnected, error };
}