import React from 'react';
import { motion } from 'framer-motion';
import { useImage } from '../hooks/useImage';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ src, className = '', alt = '', ...props }) => {
  const { imageUrl } = useImage(src);

  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      src={imageUrl}
      alt={alt}
      className={className}
      {...props}
    />
  );
};