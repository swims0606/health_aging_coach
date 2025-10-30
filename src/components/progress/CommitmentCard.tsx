'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, AlertCircle } from 'lucide-react';
import { Commitment } from '@/lib/types';

interface CommitmentCardProps {
  commitment: Commitment;
  habitName: string;
  index: number;
}

const typeIcons = {
  public_declaration: Target,
  penalty: AlertCircle,
  reward: Award,
};

const typeColors = {
  public_declaration: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  penalty: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  reward: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
};

const typeLabels = {
  public_declaration: '공개 선언',
  penalty: '벌칙',
  reward: '보상',
};

export default function CommitmentCard({ commitment, habitName, index }: CommitmentCardProps) {
  const Icon = typeIcons[commitment.type];
  const colors = typeColors[commitment.type];
  const progress = Math.min((commitment.currentProgress / commitment.targetDays) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`bg-white rounded-xl p-5 shadow-sm border-2 ${colors.border}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`${colors.bg} rounded-lg p-3`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
              {typeLabels[commitment.type]}
            </span>
            {commitment.isActive && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary-100 text-primary-700">
                진행 중
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{habitName}</h3>
          <p className="text-sm text-gray-600">{commitment.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">진행률</span>
          <span className="font-semibold text-gray-900">
            {commitment.currentProgress}/{commitment.targetDays}일
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`h-2 rounded-full ${
              progress >= 100 ? 'bg-green-500' : colors.bg.replace('100', '500')
            }`}
          />
        </div>
      </div>

      {/* Penalty or Reward */}
      {commitment.penalty && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-600 font-medium mb-1">실패 시 벌칙</p>
          <p className="text-sm text-red-700">{commitment.penalty}</p>
        </div>
      )}

      {commitment.reward && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium mb-1">성공 시 보상</p>
          <p className="text-sm text-green-700">{commitment.reward}</p>
        </div>
      )}
    </motion.div>
  );
}
