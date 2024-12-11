import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  glowing = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'rounded-full font-medium transition-all duration-200',
        {
          'bg-gradient-to-r from-neon-purple to-neon-pink text-white': variant === 'primary',
          'bg-dark-300 text-white hover:bg-dark-200': variant === 'secondary',
          'border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white':
            variant === 'outline',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled,
          'shadow-neon hover:shadow-neon-hover': glowing && !disabled
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};