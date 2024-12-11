import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  glowing?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, glowing = false, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'bg-dark-200 rounded-2xl p-6',
        'border border-dark-300',
        { 'shadow-neon': glowing },
        className
      )}
    >
      {children}
    </motion.div>
  );
};