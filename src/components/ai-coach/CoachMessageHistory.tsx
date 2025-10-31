'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter } from 'lucide-react';
import { AICoachMessage, AICoachMessageType } from '@/lib/types';
import { loadCoachMessageHistory } from '@/lib/aiCoach';
import AICoachCard from './AICoachCard';

export default function CoachMessageHistory() {
  const [messages, setMessages] = useState<AICoachMessage[]>([]);
  const [filter, setFilter] = useState<AICoachMessageType | 'all'>('all');

  useEffect(() => {
    const history = loadCoachMessageHistory();
    setMessages(history);
  }, []);

  const filteredMessages =
    filter === 'all'
      ? messages
      : messages.filter((m) => m.type === filter);

  const filterOptions: Array<{ value: AICoachMessageType | 'all'; label: string; emoji: string }> = [
    { value: 'all', label: '전체', emoji: '📋' },
    { value: 'nutrition', label: '영양', emoji: '🥗' },
    { value: 'exercise', label: '운동', emoji: '💪' },
    { value: 'sleep', label: '수면', emoji: '😴' },
    { value: 'stress', label: '스트레스', emoji: '🧘‍♀️' },
    { value: 'water', label: '수분', emoji: '💧' },
    { value: 'encouragement', label: '격려', emoji: '🎉' },
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5" style={{ color: '#6EC1E4' }} />
          <h2
            className="text-xl font-semibold"
            style={{ color: '#374151', letterSpacing: '0.3px' }}
          >
            AI 코치 히스토리
          </h2>
        </div>
        <p className="text-sm" style={{ color: '#6b7280', fontWeight: 300 }}>
          과거에 받은 맞춤 조언을 다시 확인해보세요
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4" style={{ color: '#9ca3af' }} />
          <span className="text-sm font-medium" style={{ color: '#6b7280' }}>
            카테고리 필터
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor:
                  filter === option.value
                    ? '#6EC1E4'
                    : 'rgba(110, 193, 228, 0.1)',
                color: filter === option.value ? '#ffffff' : '#6b7280',
              }}
            >
              <span className="mr-1.5">{option.emoji}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-6">
        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
              borderRadius: '20px',
              padding: '48px 24px',
            }}
          >
            <div className="text-6xl mb-4">📭</div>
            <p
              className="text-base font-medium mb-2"
              style={{ color: '#374151' }}
            >
              아직 메시지가 없어요
            </p>
            <p className="text-sm" style={{ color: '#9ca3af', fontWeight: 300 }}>
              AI 코치가 곧 맞춤 조언을 보내드릴 거예요
            </p>
          </motion.div>
        ) : (
          filteredMessages.map((message, index) => (
            <div key={message.id}>
              {/* Date separator */}
              {(index === 0 ||
                formatDate(new Date(message.timestamp)) !==
                  formatDate(new Date(filteredMessages[index - 1].timestamp))) && (
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af' }}
                  >
                    {formatDate(new Date(message.timestamp))}
                  </div>
                  <div
                    className="flex-1 h-px"
                    style={{ backgroundColor: '#e8e6e3' }}
                  />
                </div>
              )}

              <AICoachCard message={message} />
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {filteredMessages.length > 0 && (
        <div
          className="mt-8 p-4 rounded-lg text-center"
          style={{
            background: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: '#ffffff' }}>
            총 {messages.length}개의 맞춤 조언을 받았어요 ✨
          </p>
        </div>
      )}
    </div>
  );
}
