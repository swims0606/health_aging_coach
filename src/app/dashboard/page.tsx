'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import TabSystem, { TabType } from '@/components/dashboard/TabSystem';
import DailyView from '@/components/dashboard/DailyView';
import WeeklyView from '@/components/dashboard/WeeklyView';
import MonthlyView from '@/components/dashboard/MonthlyView';
import MotivationalQuote from '@/components/dashboard/MotivationalQuote';
import DailyTip from '@/components/tips/DailyTip';
import AICoachCard from '@/components/ai-coach/AICoachCard';
import { Habit, AICoachMessage } from '@/lib/types';
import { loadHabits, loadCompletions } from '@/lib/habitStorage';
import {
  generateCoachMessage,
  getTodayMessage,
  saveCoachMessage
} from '@/lib/aiCoach';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [coachMessage, setCoachMessage] = useState<AICoachMessage | null>(null);

  useEffect(() => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits);

    // Load or generate AI coach message
    const existingMessage = getTodayMessage();
    if (existingMessage) {
      setCoachMessage(existingMessage);
    } else if (loadedHabits.length > 0) {
      const completions = loadCompletions();
      const newMessage = generateCoachMessage(loadedHabits, completions);
      setCoachMessage(newMessage);
      saveCoachMessage(newMessage);
    }
  }, []);

  const handleRefreshCoachMessage = () => {
    if (habits.length > 0) {
      const completions = loadCompletions();
      const newMessage = generateCoachMessage(habits, completions);
      setCoachMessage(newMessage);
      saveCoachMessage(newMessage);
    }
  };

  const renderView = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyView />;
      case 'weekly':
        return <WeeklyView />;
      case 'monthly':
        return <MonthlyView />;
      default:
        return <DailyView />;
    }
  };

  return (
    <div>
      <Header title="대시보드" />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Motivational Quote */}
        <div className="mb-6">
          <MotivationalQuote />
        </div>

        {/* AI Coach Message */}
        {coachMessage && (
          <div className="mb-6">
            <AICoachCard
              message={coachMessage}
              onRefresh={handleRefreshCoachMessage}
            />
          </div>
        )}

        {/* Daily Tip */}
        {habits.length > 0 && (
          <div className="mb-6">
            <DailyTip habits={habits.filter(h => h.isActive !== false)} />
          </div>
        )}

        {/* Tab System */}
        <div className="mb-6">
          <TabSystem activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Dynamic Content */}
        {renderView()}
      </div>
    </div>
  );
}
