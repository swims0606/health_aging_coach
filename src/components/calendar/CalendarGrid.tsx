'use client';

import React from 'react';
import { CalendarDay as CalendarDayType } from '@/lib/types';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  days: CalendarDayType[];
  currentYear: number;
  currentMonth: number;
  onDayClick?: (day: CalendarDayType) => void;
}

export default function CalendarGrid({
  days,
  currentYear,
  currentMonth,
  onDayClick,
}: CalendarGridProps) {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const isCurrentMonth = (date: Date) => {
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <span className={`text-xs font-semibold ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            isCurrentMonth={isCurrentMonth(day.date)}
            onClick={() => onDayClick && onDayClick(day)}
          />
        ))}
      </div>
    </div>
  );
}
