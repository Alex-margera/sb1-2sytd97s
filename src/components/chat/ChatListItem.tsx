import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '../Image';

interface ChatListItemProps {
  name: string;
  message: string;
  avatar: string;
  online?: boolean;
  unreadCount?: number;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  message,
  avatar,
  online = false,
  unreadCount,
  onClick
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#2b3847] transition-colors"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image 
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            showLoadingIndicator={false}
          />
        </div>
        {online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]" />
        )}
      </div>

      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">{name}</span>
          {unreadCount && unreadCount > 0 && (
            <span className="w-5 h-5 bg-neon-purple rounded-full text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
    </motion.button>
  );
};