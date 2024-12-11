import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { DialogMessage } from '../../types/dialog';
import { BlurredImage } from './BlurredImage';
import { AudioMessage } from './AudioMessage';

interface ChatMessageProps {
  message: DialogMessage;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({ message }, ref) => {
  const isCharacter = message.type === 'character';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isCharacter ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[80%] space-y-2 ${isCharacter ? 'items-start' : 'items-end'}`}>
        {message.image && (
          <BlurredImage
            src={message.image}
            alt="Character"
            cost={30}
          />
        )}
        <div className={`rounded-2xl ${
          isCharacter ? 'bg-dark-300' : 'bg-neon-purple'
        }`}>
          {message.isAudio ? (
            <AudioMessage text={message.text} cost={30} />
          ) : (
            <div className="px-4 py-2">
              <p className="whitespace-pre-line">{message.text}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';