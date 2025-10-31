'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, ChevronRight, Trash2 } from 'lucide-react';
import { Habit } from '@/lib/types';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onCalendarClick?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
  index: number;
}

// Get habit color based on category - Habit Space minimal palette
const getHabitColor = (habit: Habit): string => {
  const colors: { [key: string]: string } = {
    water: designTokens.colors.primary[500], // Blue
    exercise: designTokens.colors.secondary[500], // Green
    nutrition: designTokens.colors.accent[400], // Sand beige
    sleep: designTokens.colors.lavender[300], // Lavender
    stress: designTokens.colors.primary[500], // Blue
  };
  return colors[habit.category] || designTokens.colors.primary[500];
};

export default function HabitCard({ habit, onToggle, onCalendarClick, onDelete, index }: HabitCardProps) {
  const habitColor = getHabitColor(habit);
  const progress = Math.min((habit.totalCompletions / habit.targetDays) * 100, 100);

  const handleToggle = () => {
    hapticFeedback.medium();
    onToggle(habit.id);
  };

  // Habit Space design - no gradients, just solid colors
  const getProgressColor = () => {
    return habitColor;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.2,
        ease: 'easeInOut'
      }}
      whileHover={{ y: -2 }}
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: '12px',
        padding: '14px 18px',
        boxShadow: designTokens.shadows.md,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Check Button - Habit Space minimal */}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 relative"
          style={{
            width: '44px',
            height: '44px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {/* Circle with habit color */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${habitColor}`,
              backgroundColor: habit.completedToday ? habitColor : designTokens.colors.background.card,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />

          {/* Checkmark with gentle pop animation */}
          {habit.completedToday && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4,10 8,14 16,6" />
              </svg>
            </motion.div>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            style={{
              fontSize: designTokens.typography.fontSize.h3,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              margin: 0,
              marginBottom: '4px',
            }}
          >
            {habit.name}
          </h3>

          {/* Streak Display */}
          {habit.streak > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex items-center gap-1.5"
              style={{ marginBottom: designTokens.spacing.md }}
            >
              <Flame
                size={18}
                strokeWidth={1.5}
                style={{ color: designTokens.colors.accent[400] }}
              />
              <span
                style={{
                  fontSize: designTokens.typography.fontSize.body,
                  fontWeight: designTokens.typography.fontWeight.medium,
                  color: designTokens.colors.text.secondary,
                }}
              >
                {habit.streak}일 연속
              </span>
            </motion.div>
          )}

          {/* Progress bar - Habit Space minimal */}
          <div className="flex items-center gap-3" style={{ marginTop: designTokens.spacing.md }}>
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{
                height: '6px',
                backgroundColor: designTokens.colors.gray[50],
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="h-full"
                style={{
                  backgroundColor: getProgressColor(),
                  borderRadius: '9999px',
                }}
              />
            </div>
            <span
              style={{
                fontSize: designTokens.typography.fontSize.body,
                fontWeight: designTokens.typography.fontWeight.medium,
                color: designTokens.colors.text.tertiary,
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              {habit.totalCompletions}/{habit.targetDays}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Calendar Button */}
          {onCalendarClick && (
            <button
              onClick={() => onCalendarClick(habit)}
              className="flex-shrink-0"
              style={{
                minWidth: designTokens.touchTargets.minimum,
                minHeight: designTokens.touchTargets.minimum,
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
              <Calendar
                size={22}
                strokeWidth={1.5}
                style={{ color: designTokens.colors.text.tertiary }}
              />
            </button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              onClick={() => onDelete(habit.id)}
              className="flex-shrink-0"
              style={{
                minWidth: designTokens.touchTargets.minimum,
                minHeight: designTokens.touchTargets.minimum,
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
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Trash2
                size={20}
                strokeWidth={1.5}
                style={{ color: '#ef4444' }}
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
