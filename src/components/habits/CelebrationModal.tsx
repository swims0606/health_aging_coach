'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  milestone: number;
  habitName: string;
  onClose: () => void;
}

export default function CelebrationModal({
  isOpen,
  milestone,
  habitName,
  onClose,
}: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const getMilestoneMessage = (days: number) => {
    if (days === 3) return '첫 3일 연속 달성!';
    if (days === 7) return '일주일 연속 달성!';
    if (days === 21) return '습관 형성 완료!';
    return `${days}일 연속 달성!`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Trophy Animation */}
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
              className="inline-flex bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 mb-6"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>

            {/* Celebration Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              축하합니다! 🎉
            </h2>
            <p className="text-xl font-semibold text-primary-500 mb-3">
              {getMilestoneMessage(milestone)}
            </p>
            <p className="text-gray-600 mb-6">
              {habitName}을(를) {milestone}일 연속으로 완료했습니다.
              <br />
              계속 이 페이스를 유지하세요!
            </p>

            {/* Stats */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">일관성은 성공의 열쇠입니다</p>
              <p className="text-2xl font-bold text-primary-500">{milestone}일 연속</p>
            </div>

            {/* Fireworks Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50%',
                    y: '80%',
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 150}%`,
                    y: `${Math.random() * 100}%`,
                    scale: Math.random() * 1.5 + 0.5,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.03,
                    ease: 'easeOut',
                  }}
                  className="absolute"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][i % 5],
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
