import React from 'react';
import { PointsDisplay } from './PointsDisplay';

interface HeaderProps {
  matchPoints: number;
  stars: number;
}

export const Header: React.FC<HeaderProps> = ({ matchPoints, stars }) => {
  return (
    <header className="fixed top-0 left-0 right-0 glass-bg p-4 z-10">
      <div className="max-w-sm mx-auto flex items-center justify-between">
        <div className="w-20" /> {/* Spacer */}
        <h1 className="text-2xl font-bold gradient-text">Desire Diaries</h1>
        <PointsDisplay matchPoints={matchPoints} stars={stars} />
      </div>
    </header>
  );
};