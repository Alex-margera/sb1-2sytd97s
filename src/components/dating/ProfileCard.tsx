import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Character } from '../../types/character';
import { Badge } from '../ui/Badge';
import { Image } from '../Image';

interface ProfileCardProps {
  character: Character;
  onLike: () => void;
  onDislike: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  character,
  onLike,
  onDislike
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        onLike();
      } else {
        onDislike();
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="relative bg-black rounded-3xl overflow-hidden h-[calc(100vh-12rem)]"
      >
        {/* Profile Image */}
        <div className="absolute inset-0">
          <Image
            src={character.avatar}
            alt={character.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>

        {/* Like/Dislike Indicators */}
        <motion.div
          style={{ opacity: dislikeOpacity }}
          className="absolute top-8 left-8 bg-red-500/80 text-white px-6 py-2 rounded-lg transform -rotate-12 text-xl font-bold"
        >
          NOPE
        </motion.div>

        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 right-8 bg-green-500/80 text-white px-6 py-2 rounded-lg transform rotate-12 text-xl font-bold"
        >
          LIKE
        </motion.div>

        {/* Profile Content */}
        <div className="absolute bottom-16 left-0 right-0 p-6 space-y-3">
          {/* Name and Tags */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="danger">18+</Badge>
              {character.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={tag === 'Spicy' ? 'primary' : 'secondary'}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p className="text-lg">
            <span className="mr-2">{character.zodiacSymbol}</span>
            {character.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-16 pt-4">
            <button
              onClick={onDislike}
              className="w-16 h-16 rounded-full bg-black/50 backdrop-blur border-2 border-red-500 flex items-center justify-center text-red-500 text-3xl hover:bg-red-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <button
              onClick={onLike}
              className="w-16 h-16 rounded-full bg-black/50 backdrop-blur border-2 border-green-400 flex items-center justify-center text-green-400 text-3xl hover:bg-green-400 hover:text-white transition-colors"
            >
              ♥
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};