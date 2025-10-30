'use client';

import React from 'react';
import { HabitTip } from '@/lib/types';
import { Lightbulb, Clock, MapPin, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface TipCardProps {
  tip: HabitTip;
  index?: number;
}

export default function TipCard({ tip, index = 0 }: TipCardProps) {
  const getCategoryIcon = () => {
    switch (tip.category) {
      case 'getting-started':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'consistency':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'motivation':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'troubleshooting':
        return <MapPin className="w-5 h-5 text-red-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryLabel = () => {
    switch (tip.category) {
      case 'getting-started':
        return '시작하기';
      case 'consistency':
        return '꾸준히 하기';
      case 'motivation':
        return '동기부여';
      case 'troubleshooting':
        return '문제 해결';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
          {getCategoryIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500">{getCategoryLabel()}</span>
            {tip.successRate && (
              <span className="text-xs text-primary-600 font-medium">
                성공률 {tip.successRate}%
              </span>
            )}
          </div>
          <h4 className="font-bold text-gray-800 mb-2">{tip.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>

          {(tip.timeOfDay || tip.situation) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tip.timeOfDay && tip.timeOfDay !== 'anytime' && (
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {tip.timeOfDay === 'morning'
                    ? '아침'
                    : tip.timeOfDay === 'afternoon'
                    ? '오후'
                    : '저녁'}
                </span>
              )}
              {tip.situation && (
                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                  {tip.situation}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
