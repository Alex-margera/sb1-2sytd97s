import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  return (
    <span
      className={clsx(
        'px-3 py-1.5 rounded-full text-sm font-medium',
        {
          'bg-neon-purple text-white': variant === 'primary',
          'bg-dark-300/80 text-gray-200': variant === 'secondary',
          'bg-red-500/80 text-white': variant === 'danger'
        }
      )}
    >
      {children}
    </span>
  );
};