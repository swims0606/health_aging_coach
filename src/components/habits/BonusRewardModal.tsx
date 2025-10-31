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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 max-w-sm mx-4 relative border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Sparkles Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 rounded-full p-3">
                  <Sparkles className="w-8 h-8 text-gray-700" />
                </div>
              </div>

              {/* Message */}
              <h3 className="text-lg font-semibold text-center text-gray-900 mb-1">
                {message}
              </h3>
              <p className="text-center text-gray-500 text-sm mb-4">
                추가 포인트 획득!
              </p>

              {/* Points */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">+{points}</p>
                <p className="text-xs text-gray-500">보너스 포인트</p>
              </div>

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
