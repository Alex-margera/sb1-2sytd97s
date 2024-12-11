import React from 'react';
import { WelcomeScreenProps } from '../types/User';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  userDetails,
  onUserDetailsChange,
  onContinue
}) => {
  const isValid = userDetails.name && userDetails.gender && userDetails.age;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Story App
      </h1>
      <p className="text-gray-400 mb-8">
        Tell us a bit about yourself to get started
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What's your name?
          </label>
          <input
            type="text"
            value={userDetails.name || ''}
            onChange={(e) => onUserDetailsChange({ name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How old are you?
          </label>
          <input
            type="number"
            value={userDetails.age || ''}
            onChange={(e) => onUserDetailsChange({ age: parseInt(e.target.value) || null })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Enter your age"
            min="13"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What's your gender?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['male', 'female', 'other'].map((gender) => (
              <button
                key={gender}
                onClick={() => onUserDetailsChange({ gender: gender as 'male' | 'female' | 'other' })}
                className={`
                  px-4 py-3 rounded-lg capitalize
                  ${userDetails.gender === gender ? 'bg-purple-600' : 'bg-gray-800'}
                  transition-colors duration-200
                `}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValid}
        className={`
          mt-8 w-full py-3 rounded-full
          ${isValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 cursor-not-allowed'}
          transition-colors duration-200
        `}
      >
        Continue
      </button>
    </div>
  );
};