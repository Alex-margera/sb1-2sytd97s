import React from 'react';

interface GenreButtonProps {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export const GenreButton: React.FC<GenreButtonProps> = ({
  name,
  icon,
  selected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        ${selected ? 'bg-purple-600' : 'bg-gray-800'}
        transition-colors duration-200 hover:bg-gray-700
      `}
    >
      <span>{icon}</span>
      <span className="text-gray-200">{name}</span>
    </button>
  );
};