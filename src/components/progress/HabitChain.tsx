'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Check } from 'lucide-react';
import { HabitStack } from '@/lib/types';

interface HabitChainProps {
  stack: HabitStack;
  index: number;
}

const statusColors = {
  planned: { bg: 'bg-gray-100', text: 'text-gray-700', label: '계획됨' },
  active: { bg: 'bg-blue-100', text: 'text-blue-700', label: '진행 중' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
};

export default function HabitChain({ stack, index }: HabitChainProps) {
  const statusColor = statusColors[stack.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 rounded-lg p-2">
            <Link2 className="w-4 h-4 text-orange-500" />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor.bg} ${statusColor.text}`}>
            {statusColor.label}
          </span>
        </div>
        {stack.status === 'completed' && (
          <div className="bg-green-500 rounded-full p-1">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Habit Stack Visualization */}
      <div className="space-y-3">
        {/* Existing Habit */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">기존 습관</p>
          <p className="text-sm font-semibold text-gray-900">{stack.existingHabit}</p>
        </div>

        {/* Link Symbol */}
        <div className="flex justify-center">
          <div className="bg-primary-500 rounded-full p-2">
            <Link2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* New Habit */}
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <p className="text-xs text-primary-600 mb-1">새로운 습관</p>
          <p className="text-sm font-semibold text-primary-900">{stack.newHabit}</p>
        </div>
      </div>

      {/* Success Days */}
      {stack.successDays > 0 && (
        <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-900">성공일</span>
            <span className="text-lg font-bold text-orange-600">{stack.successDays}일</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
