import React from 'react';
import Header from '@/components/layout/Header';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <Header title="대시보드" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
              <Sparkles className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              대시보드
            </h2>
            <p className="text-gray-600 max-w-md">
              여기에 진행상황 대시보드가 표시됩니다.
              <br />
              연속 달성일, 오늘의 습관, 학습 진행률 등을 확인할 수 있습니다.
            </p>
            <div className="mt-8 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                📊 Phase 2에서 개발 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
