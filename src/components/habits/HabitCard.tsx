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
    hapticFeedback.light();
    onToggle(habit.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="bg-white hover:bg-gray-50 transition-colors"
      style={{
        borderBottom: `1px solid ${designTokens.colors.gray[200]}`,
        padding: `${designTokens.spacing.lg} ${designTokens.spacing.md}`,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Color Indicator + Check Button */}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 relative"
          style={{
            width: '32px',
            height: '32px',
          }}
        >
          {/* Circle with habit color */}
          <div
            className="absolute inset-0 rounded-full transition-all"
            style={{
              border: `2px solid ${habit.completedToday ? habitColor : designTokens.colors.gray[300]}`,
              backgroundColor: habit.completedToday ? habitColor : 'transparent',
            }}
          />

          {/* Checkmark */}
          {habit.completedToday && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3,8 6,11 13,4" />
              </svg>
            </motion.div>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-medium text-gray-900 text-base">{habit.name}</h3>
            {habit.streak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-semibold text-orange-500">{habit.streak}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-full overflow-hidden" style={{ height: '4px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: habitColor }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium" style={{ minWidth: '50px', textAlign: 'right' }}>
              {habit.totalCompletions}/{habit.targetDays}
            </span>
          </div>
        </div>

        {/* Calendar Button */}
        {onCalendarClick && (
          <button
            onClick={() => onCalendarClick(habit)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
