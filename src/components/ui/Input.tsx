import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
  return (
    <div>
      <input
        className={clsx(
          'w-full px-4 py-3 rounded-lg bg-dark-200 text-white',
          'border border-dark-300',
          'focus:border-neon-purple focus:ring-1 focus:ring-neon-purple',
          'placeholder-gray-500',
          'transition-all duration-200',
          'hover:bg-dark-300',
          { 'border-red-500 focus:border-red-500 focus:ring-red-500': error },
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};