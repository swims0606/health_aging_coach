import React from 'react';
import Header from '@/components/layout/Header';
import { BookOpen } from 'lucide-react';

export default function LearningPage() {
  return (
    <div>
      <Header title="학습" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-100 mb-4">
              <BookOpen className="w-10 h-10 text-secondary-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              학습 센터
            </h2>
            <p className="text-gray-600 max-w-md">
              여기에 학습 콘텐츠가 표시됩니다.
              <br />
              저속노화에 대한 과학적 근거와 실천 방법을
              유튜브 영상과 텍스트로 학습할 수 있습니다.
            </p>
            <div className="mt-8 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                🎬 Phase 4에서 개발 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
