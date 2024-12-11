import React from 'react';
import { motion } from 'framer-motion';
import { useRelationshipStore } from '../../store/relationshipStore';

interface RelationshipIndicatorProps {
  characterId: string;
}

export const RelationshipIndicator: React.FC<RelationshipIndicatorProps> = ({
  characterId
}) => {
  const { getRelationship } = useRelationshipStore();
  const { level, points } = getRelationship(characterId);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="text-red-500">❤️</span>
        <span className="font-bold">Lvl {level}</span>
      </div>
      
      <div className="flex-1 h-2 bg-dark-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(points / 60) * 100}%` }}
          className="h-full bg-gradient-to-r from-red-500 to-pink-500"
        />
      </div>
      
      <span className="text-sm text-gray-400">
        {points}/60
      </span>
    </div>
  );
};