'use client';

import React, { useState } from 'react';
import { Habit, HabitCompletion, CalendarDay } from '@/lib/types';
import {
  generateCalendarDayObjects,
  calculateMonthlyStats,
  getPreviousMonth,
  getNextMonth,
} from '@/lib/calendarUtils';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarStats from './CalendarStats';
import CalendarLegend from './CalendarLegend';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface HabitCalendarViewProps {
  habit: Habit;
  completions: HabitCompletion[];
  onClose: () => void;
}

export default function HabitCalendarView({
  habit,
  completions,
  onClose,
}: HabitCalendarViewProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // 캘린더 날짜 생성
  const calendarDays = generateCalendarDayObjects(
    currentYear,
    currentMonth,
    habit,
    completions
  );

  // 월간 통계 계산
  const stats = calculateMonthlyStats(currentYear, currentMonth, habit, completions);

  // 이전 달로 이동
  const handlePrevious = () => {
    const prev = getPreviousMonth(currentYear, currentMonth);
    setCurrentYear(prev.year);
    setCurrentMonth(prev.month);
  };

  // 다음 달로 이동
  const handleNext = () => {
    const next = getNextMonth(currentYear, currentMonth);
    setCurrentYear(next.year);
    setCurrentMonth(next.month);
  };

  // 미래 월로 이동 불가
  const canGoNext =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth < today.getMonth());

  // 날짜 클릭 핸들러
  const handleDayClick = (day: CalendarDay) => {
    // 추후 상세 정보 모달 등을 추가할 수 있음
    console.log('Clicked day:', day);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-50 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">{habit.name}</h2>
            <button
              onClick={onClose}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-sm text-white opacity-90">습관 달력</p>
        </div>

        {/* 컨텐츠 */}
        <div className="p-4">
          {/* 통계 */}
          <CalendarStats stats={stats} />

          {/* 캘린더 네비게이션 */}
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoNext={canGoNext}
          />

          {/* 캘린더 그리드 */}
          <CalendarGrid
            days={calendarDays}
            currentYear={currentYear}
            currentMonth={currentMonth}
            onDayClick={handleDayClick}
          />

          {/* 범례 */}
          <div className="mt-4">
            <CalendarLegend />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
