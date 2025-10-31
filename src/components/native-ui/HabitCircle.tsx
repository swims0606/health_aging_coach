'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

interface HabitCircleProps {
  isCompleted: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  disabled?: boolean;
}

export default function HabitCircle({
  isCompleted,
  onToggle,
  size = 'md',
  color = designTokens.colors.primary[500],
  disabled = false,
}: HabitCircleProps) {
  const sizeMap = {
    sm: { outer: 32, inner: 28, icon: 16 },
    md: { outer: 44, inner: 40, icon: 20 },
    lg: { outer: 56, inner: 52, icon: 24 },
  };

  const currentSize = sizeMap[size];

  const handleClick = () => {
    if (disabled) return;
    hapticFeedback.medium();
    onToggle();
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={handleClick}
      disabled={disabled}
      className="relative flex items-center justify-center"
      style={{
        width: currentSize.outer,
        height: currentSize.outer,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${isCompleted ? color : designTokens.colors.gray[300]}`,
          backgroundColor: isCompleted ? color : 'transparent',
        }}
        animate={{
          scale: isCompleted ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner circle with checkmark */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: currentSize.inner,
          height: currentSize.inner,
          backgroundColor: isCompleted ? color : 'transparent',
        }}
        initial={false}
        animate={{
          scale: isCompleted ? 1 : 0,
          opacity: isCompleted ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <Check
          size={currentSize.icon}
          className="text-white"
          strokeWidth={3}
        />
      </motion.div>

      {/* Ripple effect on tap */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: color,
          opacity: 0,
        }}
        animate={isCompleted ? {
          scale: [1, 1.5],
          opacity: [0.5, 0],
        } : {}}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}
