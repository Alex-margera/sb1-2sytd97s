import React from 'react';

interface ChatListHeaderProps {
  onClose: () => void;
}

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({ onClose }) => {
  return (
    <div className="p-4 flex items-center justify-between border-b border-[#2b3847]">
      <button 
        onClick={onClose}
        className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center"
      >
        ←
      </button>
      <h1 className="text-xl font-semibold">Messages</h1>
      <div className="w-10" />
    </div>
  );
};