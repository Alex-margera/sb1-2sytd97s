import React from 'react';

interface ZodiacButtonProps {
  id: string;
  name: string;
  symbol: string;
  selected: boolean;
  onClick: () => void;
}

export const ZodiacButton: React.FC<ZodiacButtonProps> = ({
  name,
  symbol,
  selected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        w-24 h-24 rounded-full
        ${selected ? 'bg-purple-600' : 'bg-gray-800'}
        transition-colors duration-200 hover:bg-gray-700
      `}
    >
      <span className="text-2xl mb-1">{symbol}</span>
      <span className="text-sm text-gray-200">{name}</span>
    </button>
  );
};