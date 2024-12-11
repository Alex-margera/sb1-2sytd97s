import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`
            w-4 h-4 rounded-full
            ${index < currentStep ? 'bg-purple-600' : 'bg-gray-700'}
            transition-colors duration-200
          `}
        />
      ))}
    </div>
  );
};