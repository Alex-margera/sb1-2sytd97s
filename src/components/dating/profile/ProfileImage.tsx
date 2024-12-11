import React from 'react';
import { Image } from '../../common/Image';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  return (
    <div className="relative">
      <div className="w-full aspect-[3/5]">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
};