'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { AICoachMessage } from '@/lib/types';
import ScienceExplainer from './ScienceExplainer';
import { designTokens } from '@/lib/designTokens';

interface AICoachCardProps {
  message: AICoachMessage;
  onRefresh?: () => void;
}

const getMessageColor = (type: string) => {
  const colors: { [key: string]: string } = {
    nutrition: designTokens.colors.secondary[500], // Green
    exercise: designTokens.colors.primary[500], // Blue
    sleep: designTokens.colors.lavender[300], // Lavender
    stress: designTokens.colors.accent[400], // Beige
    habit: designTokens.colors.primary[500],
    encouragement: designTokens.colors.secondary[500],
    water: designTokens.colors.primary[500],
  };
  return colors[type] || designTokens.colors.primary[500];
};

export default function AICoachCard({ message, onRefresh }: AICoachCardProps) {
  const [showScience, setShowScience] = useState(false);
  const accentColor = getMessageColor(message.type);

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
      {/* Header with accent bar */}
      <div className="flex items-start gap-3 mb-3">
        {/* Accent indicator */}
        <div
          style={{
            width: '4px',
            height: '40px',
            backgroundColor: accentColor,
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: designTokens.borderRadius.md,
            backgroundColor: `${accentColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Lightbulb
            size={20}
            strokeWidth={1.5}
            style={{ color: accentColor }}
          />
        </div>

        {/* Title and priority */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              style={{
                fontSize: designTokens.typography.fontSize.h3,
                fontWeight: designTokens.typography.fontWeight.semibold,
                color: designTokens.colors.text.primary,
                letterSpacing: designTokens.typography.letterSpacing.tight,
                lineHeight: designTokens.typography.lineHeight.tight,
                margin: 0,
              }}
            >
              AI 건강 코치
            </h3>
            {message.priority === 'high' && (
              <span
                style={{
                  fontSize: designTokens.typography.fontSize.caption,
                  fontWeight: designTokens.typography.fontWeight.medium,
                  color: accentColor,
                  backgroundColor: `${accentColor}15`,
                  padding: '2px 8px',
                  borderRadius: designTokens.borderRadius.sm,
                }}
              >
                중요
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: designTokens.typography.fontSize.caption,
              color: designTokens.colors.text.tertiary,
              margin: 0,
            }}
          >
            {message.personalization.timeOfDay === 'morning' && '아침 맞춤 조언'}
            {message.personalization.timeOfDay === 'lunch' && '점심 시간 조언'}
            {message.personalization.timeOfDay === 'afternoon' && '오후 조언'}
            {message.personalization.timeOfDay === 'evening' && '저녁 조언'}
            {message.personalization.timeOfDay === 'night' && '밤 조언'}
            {message.personalization.timeOfDay === 'anytime' && '맞춤 조언'}
          </p>
        </div>
      </div>

      {/* Main Message */}
      <div style={{ marginBottom: '16px' }}>
        <p
          style={{
            fontSize: designTokens.typography.fontSize.body,
            fontWeight: designTokens.typography.fontWeight.normal,
            color: designTokens.colors.text.primary,
            lineHeight: designTokens.typography.lineHeight.relaxed,
            margin: 0,
          }}
        >
          {message.message}
        </p>
      </div>

      {/* Actionable badge */}
      {message.actionable && (
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: designTokens.typography.fontSize.caption,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.secondary[600],
              backgroundColor: designTokens.colors.secondary[50],
              padding: '4px 12px',
              borderRadius: designTokens.borderRadius.md,
            }}
          >
            <span>✓</span>
            <span>실행 가능한 조언</span>
          </span>
        </div>
      )}

      {/* Science Explainer Toggle */}
      {message.scientificBasis && (
        <div>
          <button
            onClick={() => setShowScience(!showScience)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: designTokens.typography.fontSize.body,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.text.secondary,
              background: 'none',
              border: 'none',
              padding: '12px 0',
              minHeight: designTokens.touchTargets.minimum,
              cursor: 'pointer',
              transition: `color ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = designTokens.colors.text.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = designTokens.colors.text.secondary;
            }}
          >
            <span>과학적 근거</span>
            {showScience ? (
              <ChevronUp size={18} strokeWidth={1.5} />
            ) : (
              <ChevronDown size={18} strokeWidth={1.5} />
            )}
          </button>

          <AnimatePresence>
            {showScience && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: '12px' }}>
                  <ScienceExplainer
                    basis={message.scientificBasis}
                    source={message.source}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
