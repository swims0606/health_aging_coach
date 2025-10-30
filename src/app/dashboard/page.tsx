'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import TabSystem, { TabType } from '@/components/dashboard/TabSystem';
import DailyView from '@/components/dashboard/DailyView';
import WeeklyView from '@/components/dashboard/WeeklyView';
import MonthlyView from '@/components/dashboard/MonthlyView';
import MotivationalQuote from '@/components/dashboard/MotivationalQuote';
import DailyTip from '@/components/tips/DailyTip';
import { Habit } from '@/lib/types';
import { loadHabits } from '@/lib/habitStorage';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits);
  }, []);

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
