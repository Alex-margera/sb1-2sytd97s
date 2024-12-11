import React from 'react';

interface AvatarButtonProps {
  id: string;
  imageUrl: string;
  isCreateAvatar?: boolean;
  selected: boolean;
  onClick: () => void;
}

export const AvatarButton: React.FC<AvatarButtonProps> = ({
  imageUrl,
  isCreateAvatar,
  selected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square rounded-2xl overflow-hidden
        ${selected ? 'ring-4 ring-purple-600' : ''}
        ${isCreateAvatar ? 'bg-gray-800' : 'bg-purple-600'}
        transition-all duration-200
      `}
    >
      {isCreateAvatar ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-300">
          <span className="text-3xl mb-2">📸</span>
          <span className="text-sm">Create avatar</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      )}
    </button>
  );
};