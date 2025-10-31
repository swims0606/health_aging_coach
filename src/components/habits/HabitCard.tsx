'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, ChevronRight } from 'lucide-react';
import { Habit } from '@/lib/types';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onCalendarClick?: (habit: Habit) => void;
  index: number;
}

// Get habit color based on category
const getHabitColor = (habit: Habit): string => {
  const colors: { [key: string]: string } = {
    water: designTokens.colors.habits.blue,
    exercise: designTokens.colors.habits.green,
    nutrition: designTokens.colors.habits.orange,
    sleep: designTokens.colors.habits.purple,
    stress: designTokens.colors.habits.pink,
  };
  return colors[habit.category] || designTokens.colors.habits.blue;
};

export default function HabitCard({ habit, onToggle, onCalendarClick, index }: HabitCardProps) {
  const habitColor = getHabitColor(habit);
  const progress = Math.min((habit.totalCompletions / habit.targetDays) * 100, 100);

  const handleToggle = () => {
    hapticFeedback.medium();
    onToggle(habit.id);
  };

  // Create gradient for progress bar
  const getProgressGradient = () => {
    if (habit.category === 'water') return 'linear-gradient(90deg, #6EC1E4, #A8E6CF)';
    if (habit.category === 'exercise') return 'linear-gradient(90deg, #A8E6CF, #c4b5fd)';
    if (habit.category === 'nutrition') return 'linear-gradient(90deg, #FFD3B6, #fde68a)';
    if (habit.category === 'sleep') return 'linear-gradient(90deg, #c4b5fd, #fda4c0)';
    if (habit.category === 'stress') return 'linear-gradient(90deg, #fda4c0, #FFD3B6)';
    return `linear-gradient(90deg, ${habitColor}, ${habitColor})`;
  };

  // Get subtle background tint based on category
  const getCardBackground = () => {
    if (habit.category === 'water') return 'rgba(110, 193, 228, 0.03)';
    if (habit.category === 'exercise') return 'rgba(168, 230, 207, 0.03)';
    if (habit.category === 'nutrition') return 'rgba(255, 211, 182, 0.03)';
    if (habit.category === 'sleep') return 'rgba(196, 181, 253, 0.03)';
    if (habit.category === 'stress') return 'rgba(253, 164, 192, 0.03)';
    return '#ffffff';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -2 }}
      style={{
        background: `linear-gradient(to bottom, #ffffff, ${getCardBackground()})`,
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        marginBottom: '12px',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Check Button with Smooth Animation */}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 relative"
          style={{
            width: '48px',
            height: '48px',
          }}
        >
          {/* Circle with habit color */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid ${habitColor}`,
              backgroundColor: habit.completedToday ? habitColor : '#ffffff',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />

          {/* Checkmark with gentle pop animation */}
          {habit.completedToday && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
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
          <div className="flex items-baseline gap-2 mb-2">
            <h3
              className="font-semibold text-base"
              style={{
                color: '#374151',
                letterSpacing: '0.3px',
              }}
            >
              {habit.name}
            </h3>
          </div>

          {/* Streak Display */}
          {habit.streak > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 mb-3"
            >
              <Flame className="w-4 h-4" style={{ color: '#FFD3B6' }} />
              <span
                className="text-sm font-medium"
                style={{ color: '#f97316' }}
              >
                {habit.streak}일 연속
              </span>
            </motion.div>
          )}

          {/* Progress bar with gradient */}
          <div className="flex items-center gap-3 mt-3">
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{
                height: '8px',
                backgroundColor: '#F8F7F4',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full"
                style={{
                  background: getProgressGradient(),
                  borderRadius: '9999px',
                }}
              />
            </div>
            <span
              className="text-sm font-medium"
              style={{
                minWidth: '60px',
                textAlign: 'right',
                color: '#6b7280',
              }}
            >
              {habit.totalCompletions}/{habit.targetDays}
            </span>
          </div>
        </div>

        {/* Calendar Button */}
        {onCalendarClick && (
          <button
            onClick={() => onCalendarClick(habit)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
            style={{ color: '#9ca3af' }}
          >
            <Calendar className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
