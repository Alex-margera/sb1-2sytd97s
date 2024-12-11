import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useUserStore } from '../../store/userStore';

interface ShopItem {
  id: string;
  stars: number;
  bonus: number;
  price: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  timeLeft?: string;
}

const shopItems: ShopItem[] = [
  {
    id: 'small',
    stars: 22,
    bonus: 4,
    price: '1,99 US$',
    timeLeft: '02:58:14 left'
  },
  {
    id: 'medium',
    stars: 60,
    bonus: 12,
    price: '5,99 US$',
    isPopular: true
  },
  {
    id: 'large',
    stars: 130,
    bonus: 26,
    price: '11,99 US$'
  },
  {
    id: 'xl',
    stars: 270,
    bonus: 54,
    price: '22,99 US$'
  },
  {
    id: 'xxl',
    stars: 700,
    bonus: 140,
    price: '59,99 US$'
  },
  {
    id: 'mega',
    stars: 1500,
    bonus: 300,
    price: '119,99 US$',
    isBestValue: true
  }
];

interface ShopScreenProps {
  onClose: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ onClose }) => {
  const { stars, addStars } = useUserStore();

  const handlePurchase = (item: ShopItem) => {
    // Add both base stars and bonus stars
    const totalStars = item.stars + item.bonus;
    addStars(totalStars);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm h-[calc(100vh-4rem)] bg-dark-200 rounded-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-dark-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-xl font-semibold">{stars}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Premium Banner */}
          <div className="p-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Get +20% more stars</h2>
              <p>for each purchase with Premium</p>
            </div>
          </div>

          {/* Shop Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-4">
              {shopItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePurchase(item)}
                  className={`
                    relative p-4 rounded-2xl border-2
                    ${item.isPopular ? 'border-blue-500 bg-blue-500/10' : 
                      item.isBestValue ? 'border-yellow-500 bg-yellow-500/10' : 
                      'border-dark-300 bg-dark-300'}
                  `}
                >
                  {(item.isPopular || item.isBestValue) && (
                    <div className={`
                      absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold
                      ${item.isPopular ? 'bg-blue-500' : 'bg-yellow-500'}
                    `}>
                      {item.isPopular ? 'Most popular' : 'Best value'}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">👑</span>
                    <span className="text-green-400">+{item.bonus}⭐</span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl font-bold">{item.stars}</span>
                  </div>

                  {item.timeLeft && (
                    <div className="text-xs text-red-400 mb-2">
                      ⏰ {item.timeLeft}
                    </div>
                  )}

                  <div className="text-lg font-bold">{item.price}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};