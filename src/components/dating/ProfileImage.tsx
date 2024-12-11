import React from 'react';
import { motion } from 'framer-motion';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};