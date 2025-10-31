'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  color?: string;
}

export default function FloatingActionButton({
  icon,
  onClick,
  label,
  position = 'bottom-right',
  color = designTokens.colors.primary[500],
}: FloatingActionButtonProps) {
  const handleClick = () => {
    hapticFeedback.medium();
    onClick();
  };

  const positionStyles = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-20 left-4',
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`
        fixed ${positionStyles[position]}
        flex items-center gap-3
        px-6 h-14
        text-white font-semibold
        shadow-lg
        z-50
      `}
      style={{
        backgroundColor: color,
        borderRadius: label ? designTokens.borderRadius.full : '50%',
        width: label ? 'auto' : '56px',
        boxShadow: designTokens.shadows.floating,
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      {label && (
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  );
}
