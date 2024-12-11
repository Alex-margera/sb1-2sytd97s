import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 bg-[#1f2936] border-t border-[#2b3847]"
    >
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 bg-[#2b3847] text-white rounded-full px-6 py-3 outline-none"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-12 h-12 rounded-full bg-[#2b5278] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
};