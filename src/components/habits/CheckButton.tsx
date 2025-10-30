'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckButtonProps {
  isCompleted: boolean;
  onToggle: () => void;
}

export default function CheckButton({ isCompleted, onToggle }: CheckButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
        isCompleted
          ? 'bg-primary-500 hover:bg-primary-600'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label={isCompleted ? '완료 취소' : '완료 표시'}
    >
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}
