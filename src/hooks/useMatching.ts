import { useState, useCallback, useEffect } from 'react';
import { Character } from '../types/character';
import { getMatchingProfiles } from '../services/matchService';
import { useCharacterStore } from '../store/characterStore';
import { useProgressStore } from '../store/progressStore';

export function useMatching() {
  const [profiles, setProfiles] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { character } = useCharacterStore();
  const { matchedProfiles } = useProgressStore();

  const loadProfiles = useCallback(() => {
    try {
      const matchingProfiles = getMatchingProfiles(character, matchedProfiles);
      setProfiles(matchingProfiles);
      setCurrentIndex(0);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading profiles:', error);
      setIsLoading(false);
    }
  }, [character, matchedProfiles]);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const nextProfile = useCallback(() => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      loadProfiles();
    }
  }, [currentIndex, profiles.length, loadProfiles]);

  return {
    currentProfile: profiles[currentIndex],
    hasMoreProfiles: currentIndex < profiles.length - 1 || profiles.length === 0,
    isLoading,
    nextProfile
  };
}