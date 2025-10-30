'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Zap, ArrowRight } from 'lucide-react';
import { ImplementationIntention } from '@/lib/types';

interface IfThenPlannerProps {
  intention: ImplementationIntention;
  habitName: string;
  index: number;
}

export default function IfThenPlanner({ intention, habitName, index }: IfThenPlannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-100 rounded-lg p-2">
          <Zap className="w-4 h-4 text-purple-500" />
        </div>
        <h3 className="font-semibold text-gray-900">{habitName}</h3>
        {intention.isActive && (
          <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
            활성화
          </span>
        )}
      </div>

      {/* If-Then Structure */}
      <div className="space-y-3">
        {/* Situation (If) */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <p className="text-xs font-medium text-blue-600 mb-1">만약 (상황)</p>
          <p className="text-sm font-semibold text-blue-900">{intention.situation}</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Action (Then) */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <p className="text-xs font-medium text-green-600 mb-1">그러면 (행동)</p>
          <p className="text-sm font-semibold text-green-900">{intention.action}</p>
        </div>
      </div>

      {/* Context */}
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{intention.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{intention.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
