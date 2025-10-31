'use client';

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { designTokens } from '@/lib/designTokens';

interface ScienceExplainerProps {
  basis?: string;
  source?: string;
}

export default function ScienceExplainer({ basis, source }: ScienceExplainerProps) {
  if (!basis) return null;

  return (
    <div
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.lg,
        padding: designTokens.spacing.cardPaddingV,
        border: `1px solid ${designTokens.colors.divider}`,
      }}
    >
      {/* Scientific Basis */}
      <div style={{ marginBottom: '12px' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: designTokens.borderRadius.md,
              backgroundColor: `${designTokens.colors.primary[500]}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <BookOpen
              size={16}
              strokeWidth={1.5}
              style={{ color: designTokens.colors.primary[500] }}
            />
          </div>
          <h4
            style={{
              fontSize: designTokens.typography.fontSize.body,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.normal,
              margin: 0,
            }}
          >
            과학적 근거
          </h4>
        </div>
        <p
          style={{
            fontSize: designTokens.typography.fontSize.body,
            fontWeight: designTokens.typography.fontWeight.normal,
            color: designTokens.colors.text.secondary,
            lineHeight: designTokens.typography.lineHeight.normal,
            margin: 0,
          }}
        >
          {basis}
        </p>
      </div>

      {/* Source Citation */}
      {source && (
        <div
          className="pt-3 border-t"
          style={{
            borderColor: designTokens.colors.divider,
            paddingTop: '12px',
          }}
        >
          <div className="flex items-start gap-2">
            <ExternalLink
              size={16}
              strokeWidth={1.5}
              style={{
                color: designTokens.colors.text.tertiary,
                marginTop: '2px',
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: designTokens.typography.fontSize.caption,
                  fontWeight: designTokens.typography.fontWeight.medium,
                  color: designTokens.colors.text.secondary,
                  margin: 0,
                  marginBottom: '2px',
                }}
              >
                출처
              </p>
              <p
                style={{
                  fontSize: designTokens.typography.fontSize.caption,
                  fontWeight: designTokens.typography.fontWeight.normal,
                  color: designTokens.colors.text.tertiary,
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {source}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trust indicator */}
      <div
        className="mt-3 pt-3 border-t"
        style={{
          borderColor: designTokens.colors.divider,
          marginTop: '12px',
          paddingTop: '12px',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: designTokens.colors.primary[500],
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: designTokens.typography.fontSize.caption,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.text.secondary,
            }}
          >
            검증된 과학적 연구 기반
          </span>
        </div>
      </div>
    </div>
  );
}
