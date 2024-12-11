import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../../types/character';
import { Button } from '../ui/Button';
import { FloatingHearts } from './FloatingHearts';
import { ChatListScreen } from '../chat/ChatListScreen';
import { useMatchStore } from '../../store/matchStore';

interface MatchScreenProps {
  character: Character;
  onClose: () => void;
}

export const MatchScreen: React.FC<MatchScreenProps> = ({ character, onClose }) => {
  const [showChatList, setShowChatList] = useState(false);
  const { markAsMatched, setHasStartedChatting } = useMatchStore();

  useEffect(() => {
    markAsMatched(character.id);
  }, [character.id, markAsMatched]);

  const handleChatNowClick = () => {
    setHasStartedChatting(true);
    setShowChatList(true);
  };

  if (showChatList) {
    return (
      <ChatListScreen 
        character={character} 
        onClose={() => {
          setShowChatList(false);
          onClose();
        }}
        onBackToDating={onClose}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative w-full max-w-sm aspect-[1/2] mx-4"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-6"
            >
              <h2 className="text-6xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                MATCH!
              </h2>
              
              <p className="text-lg text-gray-200">
                Your crush is waiting for your message
              </p>

              <Button
                onClick={handleChatNowClick}
                className="w-full"
                size="lg"
                glowing
              >
                CHAT NOW
              </Button>
            </motion.div>
          </div>

          <FloatingHearts />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};