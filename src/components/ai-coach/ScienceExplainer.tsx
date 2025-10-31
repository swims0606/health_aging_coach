'use client';

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ScienceExplainerProps {
  basis?: string;
  source?: string;
}

export default function ScienceExplainer({ basis, source }: ScienceExplainerProps) {
  if (!basis) return null;

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Scientific Basis */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="p-1.5 rounded"
            style={{
              backgroundColor: 'rgba(110, 193, 228, 0.2)',
            }}
          >
            <BookOpen className="w-4 h-4" style={{ color: '#6EC1E4' }} />
          </div>
          <h4
            className="text-sm font-semibold"
            style={{ color: '#374151', letterSpacing: '0.3px' }}
          >
            과학적 근거
          </h4>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#4b5563', fontWeight: 300, lineHeight: 1.6 }}
        >
          {basis}
        </p>
      </div>

      {/* Source Citation */}
      {source && (
        <div className="pt-3 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
          <div className="flex items-start gap-2">
            <ExternalLink className="w-3.5 h-3.5 mt-0.5" style={{ color: '#9ca3af' }} />
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: '#6b7280' }}>
                출처
              </p>
              <p
                className="text-xs italic"
                style={{ color: '#9ca3af', fontWeight: 300 }}
              >
                {source}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trust indicator */}
      <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#6EC1E4' }}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: '#6b7280', fontWeight: 500 }}>
            검증된 과학적 연구 기반
          </span>
        </div>
      </div>
    </div>
  );
}
