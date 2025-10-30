'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressIndicatorProps {
  currentDay: number;
  totalDays: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ProgressIndicator({
  currentDay,
  totalDays,
  onPrevious,
  onNext,
}: ProgressIndicatorProps) {
  const canGoPrevious = currentDay > 1;
  const canGoNext = currentDay < totalDays;

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`p-2 rounded-lg transition-colors ${
          canGoPrevious
            ? 'hover:bg-gray-100 text-gray-700'
            : 'text-gray-300 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4 flex-1 mx-4">
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">학습 진도</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">{currentDay}</span>
            <span className="text-gray-400">/</span>
            <span className="text-lg text-gray-600">{totalDays}일</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentDay / totalDays) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((currentDay / totalDays) * 100)}% 완료
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-2 rounded-lg transition-colors ${
          canGoNext ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
