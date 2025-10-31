'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'card' | 'elevated' | 'floating';
  onClick?: () => void;
  index?: number;
}

export default function AppCard({
  children,
  className = '',
  padding = 'md',
  shadow = 'card',
  onClick,
  index = 0,
}: AppCardProps) {
  const paddingMap = {
    none: '0',
    sm: designTokens.spacing.sm,
    md: `${designTokens.spacing.cardPaddingV} ${designTokens.spacing.cardPaddingH}`,
    lg: designTokens.spacing.xl,
  };

  const shadowMap = {
    none: 'none',
    sm: designTokens.shadows.sm,
    card: designTokens.shadows.md,
    elevated: designTokens.shadows.md,
    floating: designTokens.shadows.lg,
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.2,
        ease: 'easeInOut'
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.lg,
        padding: paddingMap[padding],
        boxShadow: shadowMap[shadow],
        cursor: onClick ? 'pointer' : 'default',
        border: 'none',
      }}
    >
      {children}
    </Component>
  );
}
