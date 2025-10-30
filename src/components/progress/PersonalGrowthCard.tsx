'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp } from 'lucide-react';
import { PersonalGrowth } from '@/lib/types';

interface PersonalGrowthCardProps {
  growth: PersonalGrowth;
  index: number;
}

export default function PersonalGrowthCard({ growth, index }: PersonalGrowthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 shadow-sm border border-purple-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-purple-500 rounded-lg p-2">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">{growth.metric}</h3>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(growth.measurementDate).toLocaleDateString('ko-KR')}
        </span>
      </div>

      {/* Before and After */}
      <div className="flex items-center gap-3 mb-3">
        {/* Before */}
        <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">이전</p>
          <p className="text-sm font-medium text-gray-700">{growth.beforeValue}</p>
        </div>

        {/* Arrow */}
        <ArrowUp className="w-5 h-5 text-green-500" />

        {/* After */}
        <div className="flex-1 bg-white rounded-lg p-3 border border-green-200">
          <p className="text-xs text-green-600 mb-1">현재</p>
          <p className="text-sm font-semibold text-green-700">{growth.afterValue}</p>
        </div>
      </div>

      {/* Improvement */}
      <div className="bg-green-500 rounded-lg p-3 text-center">
        <p className="text-xs text-white/90 mb-1">개선도</p>
        <p className="text-2xl font-bold text-white">{growth.improvement}</p>
      </div>
    </motion.div>
  );
}
