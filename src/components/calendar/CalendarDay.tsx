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
    switch (day.status) {
      case 'completed':
        return 'bg-primary-500';
      case 'missed':
        return 'bg-red-200';
      case 'future':
        return 'bg-gray-100';
      case 'rest-day':
        return 'bg-gray-400';
      default:
        return 'bg-gray-100';
    }
  };

  const getTodayBorder = () => {
    if (day.isToday) {
      return 'ring-4 ring-blue-500 ring-opacity-50';
    }
    return '';
  };

  const getOpacity = () => {
    if (!isCurrentMonth) {
      return 'opacity-30';
    }
    return '';
  };

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-lg
        flex items-center justify-center
        ${getStatusColor()}
        ${getTodayBorder()}
        ${getOpacity()}
        transition-all duration-200
        hover:scale-105
      `}
    >
      <span
        className={`
          text-sm font-medium
          ${day.status === 'completed' ? 'text-white' : 'text-gray-700'}
        `}
      >
        {day.date.getDate()}
      </span>

      {day.isToday && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
      )}
    </motion.button>
  );
}
