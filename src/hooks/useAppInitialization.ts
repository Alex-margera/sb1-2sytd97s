import { useState, useEffect } from 'react';

export function useAppInitialization() {
  const [state, setState] = useState({
    isAppReady: false,
    progress: 0,
    error: null as string | null
  });

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Quick initialization for better UX
        for (let i = 0; i <= 100; i += 20) {
          if (!mounted) return;
          setState(prev => ({
            ...prev,
            progress: i
          }));
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        setState({
          isAppReady: true,
          progress: 100,
          error: null
        });
      } catch (err) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to initialize. Please refresh the page.',
            isAppReady: false
          }));
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}