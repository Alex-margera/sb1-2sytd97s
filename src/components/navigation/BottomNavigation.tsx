import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMatchStore } from '../../store/matchStore';
import { ChatListScreen } from '../chat/ChatListScreen';
import { ShopScreen } from '../shop/ShopScreen';
import { AchievementsScreen } from '../achievements/AchievementsScreen';

interface BottomNavigationProps {
  currentScreen?: 'dating' | 'chat';
  showChat?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen = 'dating',
  showChat = true
}) => {
  const { matchedProfiles, hasStartedChatting } = useMatchStore();
  const [showChatList, setShowChatList] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const matchCount = matchedProfiles.size;

  const navItems = [
    { 
      id: 'shop', 
      icon: '⭐', 
      onClick: () => setShowShop(true)
    },
    { 
      id: 'achievements', 
      icon: '🏆', 
      onClick: () => setShowAchievements(true)
    },
    { 
      id: 'cards', 
      icon: '🎴'
    },
    { 
      id: 'locked', 
      icon: '🔒', 
      locked: !hasStartedChatting 
    },
    { 
      id: 'chat', 
      icon: '💬', 
      locked: !hasStartedChatting && currentScreen === 'dating',
      hidden: !showChat,
      onClick: () => setShowChatList(true),
      badge: matchCount 
    }
  ].filter(item => !item.hidden);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 glass-bg p-4 z-10">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center relative
                ${item.locked ? 'bg-dark-300 opacity-50' : 'bg-dark-200 hover:bg-dark-300'}
                transition-colors
              `}
              disabled={item.locked}
              onClick={item.onClick}
            >
              <span className="text-xl">{item.icon}</span>
              {!item.locked && item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-purple rounded-full text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {showChatList && (
        <ChatListScreen 
          onClose={() => setShowChatList(false)}
          onBackToDating={() => setShowChatList(false)}
        />
      )}
      {showShop && (
        <ShopScreen
          onClose={() => setShowShop(false)}
        />
      )}
      {showAchievements && (
        <AchievementsScreen
          onClose={() => setShowAchievements(false)}
        />
      )}
    </>
  );
};