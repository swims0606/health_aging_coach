'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WeeklyChart from './WeeklyChart';
import ProgressBar from '@/components/ui/ProgressBar';
import { habitProgressData, mockUserStats } from '@/lib/mockData';

export default function WeeklyView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Weekly Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">주간 요약</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">주간 완료율</p>
            <p className="text-3xl font-bold text-primary-500 mb-2">
              {mockUserStats.weeklyCompletion}%
            </p>
            <p className="text-xs text-gray-500">지난주 대비 +5%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">평균 달성률</p>
            <p className="text-3xl font-bold text-secondary-500 mb-2">85%</p>
            <p className="text-xs text-gray-500">우수한 성과!</p>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <WeeklyChart />

      {/* Habit Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          습관별 주간 달성률
        </h3>
        <div className="space-y-4">
          {habitProgressData.map((habit) => (
            <ProgressBar
              key={habit.id}
              label={habit.name}
              value={habit.completion}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
