import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileCard } from './ProfileCard';
import { BottomNavigation } from '../navigation/BottomNavigation';
import { OutOfMatchesScreen } from './OutOfMatchesScreen';
import { MatchScreen } from './MatchScreen';
import { ChatListScreen } from '../chat/ChatListScreen';
import { ResetButton } from '../ui/ResetButton';
import { useCharacterStore } from '../../store/characterStore';
import { useUserStore } from '../../store/userStore';
import { useProgressStore } from '../../store/progressStore';
import { useMatching } from '../../hooks/useMatching';
import { PointsDisplay } from './PointsDisplay';

export const DatingScreen: React.FC = () => {
  const { character } = useCharacterStore();
  const { matchPoints, stars } = useUserStore();
  const { resetProgress } = useProgressStore();
  const { currentProfile, hasMoreProfiles, nextProfile, isLoading } = useMatching();
  const [showMatch, setShowMatch] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [matchedCharacter, setMatchedCharacter] = useState(null);

  const handleLike = () => {
    if (matchPoints > 0 && currentProfile) {
      setMatchedCharacter(currentProfile);
      setShowMatch(true);
    }
  };

  const handleDislike = () => {
    if (matchPoints > 0) {
      nextProfile();
    }
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    nextProfile();
  };

  const handleReset = () => {
    resetProgress();
    window.location.reload();
  };

  if (matchPoints === 0) {
    return <OutOfMatchesScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 glass-bg p-4 z-10">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <div className="w-20" /> {/* Spacer */}
          <h1 className="text-2xl font-bold gradient-text">Desire Diaries</h1>
          <PointsDisplay matchPoints={matchPoints} stars={stars} />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24"> {/* Reduced top padding */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[calc(100vh-12rem)]"
            >
              <p className="text-gray-400">Loading profiles...</p>
            </motion.div>
          ) : currentProfile ? (
            <motion.div
              key={currentProfile.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[calc(100vh-12rem)]"
            >
              <ProfileCard
                character={currentProfile}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
              <p className="text-gray-400">No more profiles available</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      <BottomNavigation />
      <ResetButton onReset={handleReset} />

      <AnimatePresence>
        {showMatch && matchedCharacter && (
          <MatchScreen 
            character={matchedCharacter}
            onClose={handleMatchClose}
          />
        )}
        {showChatList && (
          <ChatListScreen 
            onClose={() => setShowChatList(false)}
            onBackToDating={() => setShowChatList(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};