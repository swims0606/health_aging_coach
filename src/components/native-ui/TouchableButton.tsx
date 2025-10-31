'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

interface TouchableButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  haptic?: boolean;
}

export default function TouchableButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  icon,
  haptic = true,
}: TouchableButtonProps) {
  const handleClick = () => {
    if (disabled) return;
    if (haptic) hapticFeedback.light();
    onClick?.();
  };

  const variantStyles = {
    primary: {
      background: designTokens.colors.primary[500],
      color: designTokens.colors.text.inverse,
      hoverBackground: designTokens.colors.primary[600],
    },
    secondary: {
      background: designTokens.colors.gray[100],
      color: designTokens.colors.text.primary,
      hoverBackground: designTokens.colors.gray[200],
    },
    ghost: {
      background: 'transparent',
      color: designTokens.colors.primary[600],
      hoverBackground: designTokens.colors.primary[50],
    },
    danger: {
      background: designTokens.colors.error.main,
      color: designTokens.colors.text.inverse,
      hoverBackground: designTokens.colors.error.dark,
    },
  };

  const sizeStyles = {
    sm: {
      height: designTokens.touchTargets.minimum,
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      fontSize: designTokens.typography.fontSize.sm,
    },
    md: {
      height: designTokens.touchTargets.comfortable,
      padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
      fontSize: designTokens.typography.fontSize.base,
    },
    lg: {
      height: designTokens.touchTargets.spacious,
      padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
      fontSize: designTokens.typography.fontSize.lg,
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        font-semibold
        transition-all duration-200
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        backgroundColor: currentVariant.background,
        color: currentVariant.color,
        height: currentSize.height,
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        borderRadius: designTokens.borderRadius.lg,
        border: 'none',
        boxShadow: variant === 'ghost' ? 'none' : designTokens.shadows.sm,
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
