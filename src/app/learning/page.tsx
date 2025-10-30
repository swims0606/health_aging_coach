'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import YouTubeEmbed from '@/components/learning/YouTubeEmbed';
import ContentTabs, { ContentTabType } from '@/components/learning/ContentTabs';
import TextContent from '@/components/learning/TextContent';
import KeyPoints from '@/components/learning/KeyPoints';
import ActionTip from '@/components/learning/ActionTip';
import CompletionButton from '@/components/learning/CompletionButton';
import ProgressIndicator from '@/components/learning/ProgressIndicator';
import { learningContents } from '@/lib/learningData';
import { LearningProgress } from '@/lib/types';
import {
  loadLearningProgress,
  saveLearningProgress,
  isContentCompleted,
  updateProgress,
} from '@/lib/learningStorage';
import { Clock, Tag } from 'lucide-react';

export default function LearningPage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState<ContentTabType>('video');
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentContent = learningContents.find((c) => c.day === currentDay);
  const totalDays = learningContents.length;

  // Load progress on mount
  useEffect(() => {
    const loadedProgress = loadLearningProgress();
    setProgress(loadedProgress);
    setIsLoading(false);
  }, []);

  // Handle completion
  const handleComplete = () => {
    if (!currentContent) return;

    const updates: Partial<LearningProgress> = {
      completedAt: new Date(),
    };

    if (activeTab === 'video') {
      updates.watchedVideo = true;
    } else {
      updates.readText = true;
    }

    const newProgress = updateProgress(currentContent.id, updates, progress);
    setProgress(newProgress);
    saveLearningProgress(newProgress);
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading || !currentContent) {
    return (
      <div>
        <Header title="학습" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600">콘텐츠 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = isContentCompleted(currentContent.id, progress);
  const completedCount = learningContents.filter((c) =>
    isContentCompleted(c.id, progress)
  ).length;

  return (
    <div>
      <Header title="학습" />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-6">
          <ProgressIndicator
            currentDay={currentDay}
            totalDays={totalDays}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>

        {/* Overall Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-secondary-500 to-purple-500 rounded-xl p-6 text-white mb-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">전체 학습 진도</p>
              <p className="text-3xl font-bold">
                {completedCount}/{totalDays}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">완료율</p>
              <p className="text-3xl font-bold">
                {Math.round((completedCount / totalDays) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalDays) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Content Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  Day {currentContent.day}
                </span>
                {isCompleted && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ 완료
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {currentContent.title}
              </h1>
              <p className="text-gray-600">{currentContent.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentContent.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>{currentContent.category}</span>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>

        {/* Content Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          {activeTab === 'video' ? (
            <YouTubeEmbed videoId={currentContent.youtubeId} title={currentContent.title} />
          ) : (
            <TextContent content={currentContent.textContent} readingTime={currentContent.readingTime} />
          )}
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <KeyPoints points={currentContent.keyPoints} />
        </motion.div>

        {/* Action Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <ActionTip tip={currentContent.actionTip} />
        </motion.div>

        {/* Completion Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <CompletionButton isCompleted={isCompleted} onComplete={handleComplete} />
        </motion.div>
      </div>
    </div>
  );
}
