import React from 'react';
import Header from '@/components/layout/Header';
import { CheckCircle2 } from 'lucide-react';

export default function HabitsPage() {
  return (
    <div>
      <Header title="습관" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              습관 트래커
            </h2>
            <p className="text-gray-600 max-w-md">
              여기에 습관 트래커가 표시됩니다.
              <br />
              물 마시기, 운동하기, 건강한 식사 등의 습관을 체크하고
              연속 달성일을 확인할 수 있습니다.
            </p>
            <div className="mt-8 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                ✅ Phase 3에서 개발 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
