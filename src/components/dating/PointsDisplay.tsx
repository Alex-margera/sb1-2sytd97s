import React from 'react';

interface PointsDisplayProps {
  matchPoints: number;
  stars: number;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({ matchPoints, stars }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-red-500">❤️</span>
        <span className="text-white">{matchPoints}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>⭐</span>
        <span className="text-white">{stars}</span>
      </div>
    </div>
  );
};