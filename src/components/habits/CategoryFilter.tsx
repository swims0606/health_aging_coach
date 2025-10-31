'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, Apple, Moon, Heart, Filter } from 'lucide-react';
import { HabitCategory } from '@/lib/types';

interface CategoryFilterProps {
  selectedCategory: HabitCategory | 'all';
  onCategoryChange: (category: HabitCategory | 'all') => void;
}

const categories: { id: HabitCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: '전체', icon: Filter },
  { id: 'water', label: '수분', icon: Droplets },
  { id: 'exercise', label: '운동', icon: Activity },
  { id: 'nutrition', label: '영양', icon: Apple },
  { id: 'sleep', label: '수면', icon: Moon },
  { id: 'stress', label: '스트레스', icon: Heart },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded whitespace-nowrap transition-colors flex-shrink-0 ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
