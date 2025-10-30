'use client';

import React from 'react';
import { CalendarStats as CalendarStatsType } from '@/lib/types';
import { Calendar, CheckCircle, TrendingUp, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarStatsProps {
  stats: CalendarStatsType;
}

export default function CalendarStats({ stats }: CalendarStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-primary-500" />
          <p className="text-xs text-gray-600">완료일</p>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {stats.completedDays}
          <span className="text-sm text-gray-500">/{stats.totalDays}일</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <p className="text-xs text-gray-600">완료율</p>
        </div>
        <p className="text-2xl font-bold text-gray-800">{stats.completionRate}%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <p className="text-xs text-gray-600">현재 스트릭</p>
        </div>
        <p className="text-2xl font-bold text-gray-800">{stats.currentStreak}일</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          <p className="text-xs text-gray-600">최장 스트릭</p>
        </div>
        <p className="text-2xl font-bold text-gray-800">{stats.longestStreak}일</p>
      </motion.div>
    </div>
  );
}
