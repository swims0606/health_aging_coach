'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { AICoachMessage } from '@/lib/types';
import ScienceExplainer from './ScienceExplainer';
import { designTokens } from '@/lib/designTokens';

interface AICoachCardProps {
  message: AICoachMessage;
  onRefresh?: () => void;
}

const getMessageIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    nutrition: '🥗',
    exercise: '💪',
    sleep: '😴',
    stress: '🧘‍♀️',
    habit: '✅',
    encouragement: '🎉',
    water: '💧',
  };
  return icons[type] || '💡';
};

const getMessageGradient = (type: string) => {
  const gradients: { [key: string]: string } = {
    nutrition: 'linear-gradient(135deg, #FFD3B6, #fde68a)',
    exercise: 'linear-gradient(135deg, #A8E6CF, #c4b5fd)',
    sleep: 'linear-gradient(135deg, #c4b5fd, #fda4c0)',
    stress: 'linear-gradient(135deg, #fda4c0, #FFD3B6)',
    habit: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
    encouragement: 'linear-gradient(135deg, #FFD3B6, #A8E6CF)',
    water: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
  };
  return gradients[type] || 'linear-gradient(135deg, #6EC1E4, #A8E6CF)';
};

export default function AICoachCard({ message, onRefresh }: AICoachCardProps) {
  const [showScience, setShowScience] = useState(false);

  const icon = getMessageIcon(message.type);
  const gradient = getMessageGradient(message.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden"
      style={{
        background: gradient,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        marginBottom: '24px',
      }}
    >
      {/* Decorative icon */}
      <div className="absolute top-4 right-4 opacity-20 text-5xl">
        {icon}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-gray-700" />
          <h3
            className="font-semibold text-sm uppercase tracking-wide"
            style={{ color: '#374151', letterSpacing: '0.05em' }}
          >
            AI 건강 코치
          </h3>
          {message.priority === 'high' && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                color: '#374151',
              }}
            >
              중요
            </span>
          )}
        </div>
      </div>

      {/* Main Message */}
      <div className="relative z-10 mb-4">
        <p
          className="text-base leading-relaxed"
          style={{
            color: '#374151',
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          {message.message}
        </p>
      </div>

      {/* Actionable indicator */}
      {message.actionable && (
        <div className="relative z-10 mb-4">
          <div
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            <span className="text-sm">✨</span>
            <span>바로 실천할 수 있는 조언</span>
          </div>
        </div>
      )}

      {/* Science Explainer Toggle */}
      {message.scientificBasis && (
        <div className="relative z-10">
          <button
            onClick={() => setShowScience(!showScience)}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-300"
            style={{
              color: '#374151',
            }}
          >
            <Info className="w-4 h-4" />
            <span>과학적 근거 보기</span>
            {showScience ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {showScience && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <ScienceExplainer
                    basis={message.scientificBasis}
                    source={message.source}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Personalization info */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/30">
        <p className="text-xs" style={{ color: '#6b7280', fontWeight: 300 }}>
          {message.personalization.timeOfDay === 'morning' && '아침에 '}
          {message.personalization.timeOfDay === 'lunch' && '점심 시간에 '}
          {message.personalization.timeOfDay === 'afternoon' && '오후에 '}
          {message.personalization.timeOfDay === 'evening' && '저녁에 '}
          {message.personalization.timeOfDay === 'night' && '밤에 '}
          맞춤 조언
          {message.personalization.strugglingAreas.length > 0 &&
            ` • ${message.personalization.strugglingAreas[0]}에 집중`}
        </p>
      </div>
    </motion.div>
  );
}
