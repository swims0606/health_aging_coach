'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Target } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import CircularProgress from '@/components/ui/CircularProgress';
import ProgressBar from '@/components/ui/ProgressBar';
import { mockUserStats, habitProgressData } from '@/lib/mockData';

export default function DailyView() {
  const stats = mockUserStats;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="연속 달성일"
          value={stats.currentStreak}
          subtitle={`총 ${stats.totalDays}일 활동`}
          icon={Flame}
          iconColor="#f97316"
        />
        <StatsCard
          title="오늘의 습관"
          value={`${stats.habitsCompletedToday}/${stats.habitsTotalToday}`}
          subtitle="완료됨"
          icon={Target}
        />
        <StatsCard
          title="레벨"
          value={stats.level}
          subtitle={`${stats.nextMilestone}까지 ${stats.daysToMilestone}일`}
          icon={Trophy}
          iconColor="#eab308"
        />
      </div>

      {/* Today's Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">오늘의 진행률</h3>
          <CircularProgress
            value={stats.habitsCompletedToday}
            max={stats.habitsTotalToday}
          />
        </div>

        <div className="space-y-4">
          {habitProgressData.slice(0, 3).map((habit) => (
            <div key={habit.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {habit.name}
                </span>
                <span className="text-xs text-gray-500">
                  🔥 {habit.streak}일 연속
                </span>
              </div>
              <ProgressBar
                value={habit.completion}
                showPercentage={false}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
