'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { motivationalQuotes } from '@/lib/mockData';
import { designTokens } from '@/lib/designTokens';

export default function MotivationalQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Get a random quote on mount
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative"
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.lg,
        padding: `${designTokens.spacing.cardPaddingV} ${designTokens.spacing.cardPaddingH}`,
        boxShadow: designTokens.shadows.md,
        border: `1px solid ${designTokens.colors.divider}`,
      }}
    >
      {/* Decorative icon */}
      <div className="absolute top-4 right-4" style={{ opacity: 0.15 }}>
        <Sparkles
          size={24}
          strokeWidth={1.5}
          style={{ color: designTokens.colors.accent[400] }}
        />
      </div>

      <div className="relative z-10">
        <p
          style={{
            fontSize: designTokens.typography.fontSize.caption,
            fontWeight: designTokens.typography.fontWeight.medium,
            color: designTokens.colors.text.tertiary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: 0,
            marginBottom: '8px',
          }}
        >
          오늘의 동기부여
        </p>
        <p
          style={{
            fontSize: designTokens.typography.fontSize.h3,
            fontWeight: designTokens.typography.fontWeight.normal,
            color: designTokens.colors.text.primary,
            fontStyle: 'italic',
            lineHeight: designTokens.typography.lineHeight.normal,
            letterSpacing: designTokens.typography.letterSpacing.normal,
            margin: 0,
          }}
        >
          "{quote}"
        </p>
      </div>
    </motion.div>
  );
}
