import React from 'react';
import Header from '@/components/layout/Header';
import { BarChart3 } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div>
      <Header title="진행상황" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-100 mb-4">
              <BarChart3 className="w-10 h-10 text-secondary-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              진행상황 분석
            </h2>
            <p className="text-gray-600 max-w-md">
              여기에 진행상황 분석이 표시됩니다.
              <br />
              일간/주간/월간 통계, 습관별 달성률,
              개인 성장 기록 등을 확인할 수 있습니다.
            </p>
            <div className="mt-8 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                📈 Phase 2에서 개발 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
