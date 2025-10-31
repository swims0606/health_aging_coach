'use client';

import React from 'react';
import { CalendarDay as CalendarDayType } from '@/lib/types';
import { motion } from 'framer-motion';

interface CalendarDayProps {
  day: CalendarDayType;
  isCurrentMonth: boolean;
  onClick?: () => void;
}

export default function CalendarDay({ day, isCurrentMonth, onClick }: CalendarDayProps) {
  const getStatusColor = () => {
    // Habit Space color palette for calendar
    switch (day.status) {
      case 'completed':
        return '#D1FAE5'; // Light green for completed days
      case 'missed':
        return '#E5E7EB'; // Soft gray for missed days
      case 'future':
        return '#F9FAFB'; // Off-white for future days
      case 'rest-day':
        return '#9CA3AF'; // Medium gray for rest days
      default:
        return '#F9FAFB';
    }
  };

  const getTodayBorder = () => {
    if (day.isToday) {
      // Accent color border for current day (orange/primary)
      return {
        border: '2px solid #3B82F6',
        boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
      };
    }
    return {};
  };

  const getOpacity = () => {
    if (!isCurrentMonth) {
      return 'opacity-30';
    }
    return '';
  };

  const textColor = day.status === 'rest-day' ? '#ffffff' : '#111827';

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${getOpacity()}`}
      style={{
        backgroundColor: getStatusColor(),
        ...getTodayBorder(),
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: textColor,
        }}
      >
        {day.date.getDate()}
      </span>

      {day.isToday && (
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: '#3B82F6' }}
        ></div>
      )}
    </motion.button>
  );
}
