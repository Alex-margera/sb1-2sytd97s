import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DialogMessage } from '../../types/dialog';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { DateButton } from './DateButton';

interface ChatMessagesProps {
  messages: DialogMessage[];
  isTyping: boolean;
  showDateButton: boolean;
  onGoOnDate: () => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  showDateButton,
  onGoOnDate
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior,
        block: 'end'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pt-20 pb-32">
      <div className="px-4 space-y-4 max-w-sm mx-auto">
        <AnimatePresence mode="popLayout" initial={false}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {showDateButton && !isTyping && (
        <DateButton onClick={onGoOnDate} />
      )}
    </div>
  );
};