'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface CompletionButtonProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export default function CompletionButton({ isCompleted, onComplete }: CompletionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onComplete}
      disabled={isCompleted}
      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
        isCompleted
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
          : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl'
      }`}
    >
      {isCompleted ? (
        <>
          <CheckCircle className="w-6 h-6" />
          <span>학습 완료!</span>
        </>
      ) : (
        <>
          <Circle className="w-6 h-6" />
          <span>학습 완료 표시</span>
        </>
      )}
    </motion.button>
  );
}
