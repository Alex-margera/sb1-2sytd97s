import React, { useState } from 'react';
import { useUserStore } from '../../store/userStore';

export const PointsControl: React.FC = () => {
  const { matchPoints, stars, setMatchPoints } = useUserStore();
  const [decreaseAmount, setDecreaseAmount] = useState('');

  const handleAdd999Points = () => {
    setMatchPoints(matchPoints + 999);
  };

  const handleDecreasePoints = () => {
    const amount = parseInt(decreaseAmount);
    if (!isNaN(amount) && amount > 0) {
      setMatchPoints(Math.max(0, matchPoints - amount));
      setDecreaseAmount('');
    }
  };

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
      <button
        onClick={handleAdd999Points}
        className="px-3 py-1 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-colors text-sm"
      >
        +999
      </button>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={decreaseAmount}
          onChange={(e) => setDecreaseAmount(e.target.value)}
          className="w-16 px-2 py-1 rounded bg-dark-300 text-white text-sm"
          placeholder="Amount"
        />
        <button
          onClick={handleDecreasePoints}
          className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-sm"
        >
          -❤️
        </button>
      </div>
    </div>
  );
};