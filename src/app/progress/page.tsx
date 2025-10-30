'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import CommitmentCard from '@/components/progress/CommitmentCard';
import IfThenPlanner from '@/components/progress/IfThenPlanner';
import HabitChain from '@/components/progress/HabitChain';
import PersonalGrowthCard from '@/components/progress/PersonalGrowthCard';
import MotivationalMessage from '@/components/progress/MotivationalMessage';
import {
  mockCommitments,
  mockImplementationIntentions,
  mockHabitStacks,
  mockPersonalGrowth,
  habitNames,
} from '@/lib/mockBehavioralData';
import { Target, Zap, Link2, TrendingUp } from 'lucide-react';

type SectionType = 'all' | 'commitments' | 'intentions' | 'stacks' | 'growth';

export default function ProgressPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('all');

  const sections = [
    { id: 'all' as SectionType, label: '전체', icon: TrendingUp },
    { id: 'commitments' as SectionType, label: '약속', icon: Target },
    { id: 'intentions' as SectionType, label: '실행 의도', icon: Zap },
    { id: 'stacks' as SectionType, label: '습관 스태킹', icon: Link2 },
    { id: 'growth' as SectionType, label: '성장', icon: TrendingUp },
  ];

  const shouldShowSection = (section: SectionType) => {
    return activeSection === 'all' || activeSection === section;
  };

  return (
    <div>
      <Header title="진행상황" />
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <MotivationalMessage autoRotate={true} />
        </motion.div>

        {/* Section Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Commitments Section */}
        {shouldShowSection('commitments') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">약속 장치 (Commitment Device)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              목표에 대한 공개적 약속으로 동기를 강화하세요. 성공 시 보상, 실패 시 벌칙을 설정할 수 있습니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCommitments.map((commitment, index) => (
                <CommitmentCard
                  key={commitment.id}
                  commitment={commitment}
                  habitName={habitNames[commitment.habitId] || '습관'}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Implementation Intentions Section */}
        {shouldShowSection('intentions') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">실행 의도 (If-Then Planning)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              "만약 X가 발생하면, Y를 한다" 형식으로 구체적인 실행 계획을 세우세요. 행동의 자동화를 도와줍니다.
            </p>
            <div className="space-y-4">
              {mockImplementationIntentions.map((intention, index) => (
                <IfThenPlanner
                  key={intention.id}
                  intention={intention}
                  habitName={habitNames[intention.habitId] || '습관'}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Habit Stacking Section */}
        {shouldShowSection('stacks') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">습관 스태킹 (Habit Stacking)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              기존 습관 뒤에 새로운 습관을 연결하세요. 이미 확립된 루틴을 활용하여 새 습관을 쉽게 형성할 수 있습니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockHabitStacks.map((stack, index) => (
                <HabitChain key={stack.id} stack={stack} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Personal Growth Section */}
        {shouldShowSection('growth') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">개인 성장 추적</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              습관 형성을 통해 실제로 개선된 당신의 삶의 질을 확인하세요. 시각적인 변화가 강력한 동기부여가 됩니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPersonalGrowth.map((growth, index) => (
                <PersonalGrowthCard key={growth.id} growth={growth} index={index} />
              ))}
            </div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
            >
              <h3 className="text-lg font-bold text-green-900 mb-3">
                🎊 축하합니다! 당신은 계속 성장하고 있습니다
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {mockPersonalGrowth.length}
                  </p>
                  <p className="text-sm text-green-700">개선된 지표</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">+120%</p>
                  <p className="text-sm text-green-700">평균 개선도</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {mockCommitments.filter((c) => c.isActive).length}
                  </p>
                  <p className="text-sm text-green-700">활성 약속</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {mockHabitStacks.filter((s) => s.status === 'active').length}
                  </p>
                  <p className="text-sm text-green-700">진행 중 스택</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
