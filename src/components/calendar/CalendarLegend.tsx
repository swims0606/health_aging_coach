'use client';

import React from 'react';

export default function CalendarLegend() {
  const legendItems = [
    { label: '완료', color: 'bg-primary-500', description: '습관을 실천한 날' },
    { label: '놓침', color: 'bg-red-200', description: '실천하지 못한 날' },
    { label: '오늘', color: 'border-blue-500 border-4', description: '오늘' },
    { label: '미래', color: 'bg-gray-100', description: '아직 오지 않은 날' },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">범례</h3>
      <div className="grid grid-cols-2 gap-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full ${item.color}`}
            ></div>
            <div>
              <p className="text-xs font-medium text-gray-700">{item.label}</p>
              <p className="text-[10px] text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
