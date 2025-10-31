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
    md: designTokens.spacing.md,
    lg: designTokens.spacing.lg,
  };

  const shadowMap = {
    none: designTokens.shadows.none,
    sm: designTokens.shadows.sm,
    card: designTokens.shadows.card,
    elevated: designTokens.shadows.elevated,
    floating: designTokens.shadows.floating,
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0, 0, 0.2, 1]
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        bg-white rounded-[${designTokens.borderRadius.lg}]
        border border-gray-100
        ${className}
      `}
      style={{
        padding: paddingMap[padding],
        boxShadow: shadowMap[shadow],
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </Component>
  );
}
