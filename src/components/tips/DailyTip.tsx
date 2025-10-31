'use client';

import React, { useEffect, useState } from 'react';
import { HabitTip, Habit } from '@/lib/types';
import { getDailyTip } from '@/lib/habitTips';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens';

interface DailyTipProps {
  habits: Habit[];
}

export default function DailyTip({ habits }: DailyTipProps) {
  const [tip, setTip] = useState<HabitTip | null>(null);

  const loadTip = () => {
    const dailyTip = getDailyTip(habits);
    setTip(dailyTip);
  };

  useEffect(() => {
    loadTip();
  }, [habits]);

  if (!tip) {
    return null;
  }

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
        marginBottom: designTokens.spacing.sectionMargin,
      }}
    >
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: designTokens.spacing.md }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: designTokens.borderRadius.md,
              backgroundColor: `${designTokens.colors.accent[400]}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles
              size={16}
              strokeWidth={1.5}
              style={{ color: designTokens.colors.accent[400] }}
            />
          </div>
          <h3
            style={{
              fontSize: designTokens.typography.fontSize.h3,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              margin: 0,
            }}
          >
            오늘의 꿀팁
          </h3>
        </div>
        <button
          onClick={loadTip}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: designTokens.borderRadius.md,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `background-color ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = designTokens.colors.gray[50];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <RefreshCw
            size={16}
            strokeWidth={1.5}
            style={{ color: designTokens.colors.text.tertiary }}
          />
        </button>
      </div>

      <div>
        <h4
          style={{
            fontSize: designTokens.typography.fontSize.body,
            fontWeight: designTokens.typography.fontWeight.medium,
            color: designTokens.colors.text.primary,
            margin: 0,
            marginBottom: '8px',
          }}
        >
          {tip.title}
        </h4>
        <p
          style={{
            fontSize: designTokens.typography.fontSize.body,
            fontWeight: designTokens.typography.fontWeight.normal,
            color: designTokens.colors.text.secondary,
            lineHeight: designTokens.typography.lineHeight.normal,
            margin: 0,
          }}
        >
          {tip.content}
        </p>
      </div>
    </motion.div>
  );
}
