import React from 'react';
import { IMAGES } from '../../constants/images';
import { imageService } from '../../services/imageService';

export const ChatBackground: React.FC = () => {
  const backgroundImage = imageService.getLoadedImage(IMAGES.backgrounds.chat);

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        opacity: 0.03,
        filter: 'brightness(0.8) contrast(1.2)'
      }}
    />
  );
};