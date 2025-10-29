'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MonthlyChart from './MonthlyChart';
import AchievementCard from '@/components/ui/AchievementCard';
import { mockUserStats, recentAchievements } from '@/lib/mockData';
import { TrendingUp, Award, Calendar } from 'lucide-react';

export default function MonthlyView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-sm text-gray-600">월간 완료율</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {mockUserStats.monthlyCompletion}%
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 rounded-lg p-2">
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600">달성한 목표</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">15</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-secondary-100 rounded-lg p-2">
              <Calendar className="w-5 h-5 text-secondary-500" />
            </div>
            <p className="text-sm text-gray-600">활동 일수</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {mockUserStats.totalDays}일
          </p>
        </div>
      </div>

      {/* Monthly Chart */}
      <MonthlyChart />

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 성취</h3>
        <div className="space-y-3">
          {recentAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
