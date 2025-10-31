'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens';
import { hapticFeedback } from '@/lib/gestureUtils';

export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = true,
}: SegmentedControlProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      hapticFeedback.selection();
      onChange(newValue);
    }
  };

  return (
    <div
      className={`
        relative flex items-center
        bg-gray-100 p-1
        ${fullWidth ? 'w-full' : 'w-auto'}
      `}
      style={{
        borderRadius: designTokens.borderRadius.lg,
        gap: designTokens.spacing.xs,
      }}
    >
      {/* Sliding background indicator */}
      <motion.div
        className="absolute top-1 bg-white shadow-sm"
        style={{
          height: 'calc(100% - 8px)',
          borderRadius: designTokens.borderRadius.md,
          zIndex: 0,
        }}
        initial={false}
        animate={{
          left: `calc(${(selectedIndex / options.length) * 100}% + 4px)`,
          width: `calc(${100 / options.length}% - 8px)`,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 35,
        }}
      />

      {/* Segment buttons */}
      {options.map((option, index) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={`
              relative z-10
              flex items-center justify-center gap-2
              px-4 py-2
              font-medium text-sm
              transition-colors duration-200
              ${fullWidth ? 'flex-1' : ''}
              ${isSelected ? 'text-gray-900' : 'text-gray-600'}
            `}
            style={{
              minHeight: designTokens.touchTargets.minimum,
            }}
          >
            {option.icon && (
              <span className="flex-shrink-0">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
