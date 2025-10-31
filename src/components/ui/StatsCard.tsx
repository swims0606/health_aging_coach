'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { designTokens } from '@/lib/designTokens';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = designTokens.colors.primary[500],
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.lg,
        padding: `${designTokens.spacing.cardPaddingV} ${designTokens.spacing.cardPaddingH}`,
        boxShadow: designTokens.shadows.md,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            style={{
              fontSize: designTokens.typography.fontSize.body,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.text.secondary,
              margin: 0,
              marginBottom: '4px',
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: designTokens.typography.fontSize.h1,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              margin: 0,
              marginBottom: subtitle ? '4px' : 0,
            }}
          >
            {value}
          </p>
          {subtitle && (
            <p
              style={{
                fontSize: designTokens.typography.fontSize.caption,
                fontWeight: designTokens.typography.fontWeight.normal,
                color: designTokens.colors.text.tertiary,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: designTokens.borderRadius.md,
            backgroundColor: `${iconColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}
