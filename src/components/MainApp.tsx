import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BasicInfoScreen } from './onboarding/BasicInfoScreen';
import { PreferencesScreen } from './onboarding/PreferencesScreen';
import { GenreSelection } from './onboarding/GenreSelection';
import { ZodiacSelection } from './onboarding/ZodiacSelection';
import { AvatarSelection } from './onboarding/AvatarSelection';
import { DatingScreen } from './dating/DatingScreen';

export const MainApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <BasicInfoScreen 
          onContinue={() => setCurrentStep(1)} 
        />
      )}
      
      {currentStep === 1 && (
        <PreferencesScreen 
          onContinue={() => setCurrentStep(2)} 
        />
      )}

      {currentStep === 2 && (
        <GenreSelection 
          onContinue={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <ZodiacSelection 
          onContinue={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 4 && (
        <AvatarSelection
          onContinue={() => setCurrentStep(5)}
        />
      )}

      {currentStep === 5 && <DatingScreen />}
    </AnimatePresence>
  );
};