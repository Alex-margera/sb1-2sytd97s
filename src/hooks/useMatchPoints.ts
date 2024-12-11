import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';

export function useMatchPoints() {
  const { 
    matchPoints,
    checkAndResetDailyPoints,
    resetMatchPoints
  } = useUserStore();

  useEffect(() => {
    // Check for daily reset on mount
    checkAndResetDailyPoints();
    
    // Set up interval to check for daily reset
    const interval = setInterval(checkAndResetDailyPoints, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [checkAndResetDailyPoints]);

  return { matchPoints };
}