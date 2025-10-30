'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface BonusRewardModalProps {
  isOpen: boolean;
  points: number;
  message: string;
  onClose: () => void;
}

export default function BonusRewardModal({
  isOpen,
  points,
  message,
  onClose,
}: BonusRewardModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl p-8 max-w-sm mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sparkles Animation */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Message */}
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                {message}
              </h3>
              <p className="text-center text-gray-600 mb-4">
                추가 포인트 획득!
              </p>

              {/* Points */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-center"
              >
                <p className="text-4xl font-bold text-white">+{points}</p>
                <p className="text-sm text-white/90">보너스 포인트</p>
              </motion.div>

              {/* Confetti Effect (simple) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 1,
                    }}
                    animate={{
                      x: `${50 + (Math.random() - 0.5) * 200}%`,
                      y: `${50 + (Math.random() - 0.5) * 200}%`,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.05,
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'][i % 4],
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
