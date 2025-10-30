'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
}

export default function CalendarHeader({
  year,
  month,
  onPrevious,
  onNext,
  canGoNext,
}: CalendarHeaderProps) {
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPrevious}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">
          {year}년 {monthNames[month]}
        </h2>
      </div>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-2 rounded-lg transition-colors ${
          canGoNext
            ? 'hover:bg-gray-100'
            : 'opacity-30 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}
