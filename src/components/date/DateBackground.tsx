import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '../Image';

interface DateBackgroundProps {
  url: string;
}

export const DateBackground: React.FC<DateBackgroundProps> = ({ url }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0"
    >
      <Image
        src={url}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </motion.div>
  );
};