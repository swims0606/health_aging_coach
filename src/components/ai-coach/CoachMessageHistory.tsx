'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter } from 'lucide-react';
import { AICoachMessage, AICoachMessageType } from '@/lib/types';
import { loadCoachMessageHistory } from '@/lib/aiCoach';
import AICoachCard from './AICoachCard';
import { designTokens } from '@/lib/designTokens';

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

  const filterOptions: Array<{ value: AICoachMessageType | 'all'; label: string }> = [
    { value: 'all', label: '전체' },
    { value: 'nutrition', label: '영양' },
    { value: 'exercise', label: '운동' },
    { value: 'sleep', label: '수면' },
    { value: 'stress', label: '스트레스' },
    { value: 'water', label: '수분' },
    { value: 'encouragement', label: '격려' },
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
      <div style={{ marginBottom: designTokens.spacing.sectionMargin }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
          <Clock
            size={22}
            strokeWidth={1.5}
            style={{ color: designTokens.colors.primary[500] }}
          />
          <h2
            style={{
              fontSize: designTokens.typography.fontSize.h2,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              margin: 0,
            }}
          >
            AI 코치 히스토리
          </h2>
        </div>
        <p
          style={{
            fontSize: designTokens.typography.fontSize.body,
            fontWeight: designTokens.typography.fontWeight.normal,
            color: designTokens.colors.text.secondary,
            margin: 0,
          }}
        >
          과거에 받은 맞춤 조언을 다시 확인해보세요
        </p>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: designTokens.spacing.sectionMargin }}>
        <div
          className="flex items-center gap-2"
          style={{ marginBottom: designTokens.spacing.md }}
        >
          <Filter
            size={18}
            strokeWidth={1.5}
            style={{ color: designTokens.colors.text.tertiary }}
          />
          <span
            style={{
              fontSize: designTokens.typography.fontSize.body,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.text.secondary,
            }}
          >
            카테고리 필터
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              style={{
                padding: '12px 20px',
                minHeight: designTokens.touchTargets.minimum,
                borderRadius: designTokens.borderRadius.md,
                fontSize: designTokens.typography.fontSize.body,
                fontWeight: designTokens.typography.fontWeight.medium,
                backgroundColor:
                  filter === option.value
                    ? designTokens.colors.primary[500]
                    : `${designTokens.colors.primary[500]}10`,
                color:
                  filter === option.value
                    ? '#ffffff'
                    : designTokens.colors.text.secondary,
                border: 'none',
                cursor: 'pointer',
                transition: `all ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.sectionMargin }}>
        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="text-center"
            style={{
              backgroundColor: designTokens.colors.background.card,
              borderRadius: designTokens.borderRadius.lg,
              padding: '48px 24px',
              boxShadow: designTokens.shadows.md,
            }}
          >
            <p
              style={{
                fontSize: designTokens.typography.fontSize.h3,
                fontWeight: designTokens.typography.fontWeight.semibold,
                color: designTokens.colors.text.primary,
                margin: 0,
                marginBottom: '8px',
              }}
            >
              아직 메시지가 없어요
            </p>
            <p
              style={{
                fontSize: designTokens.typography.fontSize.body,
                fontWeight: designTokens.typography.fontWeight.normal,
                color: designTokens.colors.text.secondary,
                margin: 0,
              }}
            >
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
                <div className="flex items-center gap-3" style={{ marginBottom: designTokens.spacing.lg }}>
                  <div
                    style={{
                      fontSize: designTokens.typography.fontSize.caption,
                      fontWeight: designTokens.typography.fontWeight.semibold,
                      color: designTokens.colors.text.tertiary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {formatDate(new Date(message.timestamp))}
                  </div>
                  <div
                    className="flex-1"
                    style={{
                      height: '1px',
                      backgroundColor: designTokens.colors.divider,
                    }}
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
          style={{
            marginTop: designTokens.spacing.sectionMargin,
            padding: designTokens.spacing.lg,
            borderRadius: designTokens.borderRadius.lg,
            backgroundColor: designTokens.colors.background.card,
            border: `1px solid ${designTokens.colors.divider}`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: designTokens.typography.fontSize.body,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.text.secondary,
              margin: 0,
            }}
          >
            총 {messages.length}개의 맞춤 조언을 받았어요
          </p>
        </div>
      )}
    </div>
  );
}
