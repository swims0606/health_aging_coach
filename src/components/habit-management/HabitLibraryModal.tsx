'use client';

import React, { useState } from 'react';
import { HabitTemplate, Habit, HabitCategory } from '@/lib/types';
import { habitTemplates } from '@/lib/habitTemplates';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search } from 'lucide-react';

interface HabitLibraryModalProps {
  onClose: () => void;
  onSelectTemplate: (template: HabitTemplate) => void;
}

export default function HabitLibraryModal({ onClose, onSelectTemplate }: HabitLibraryModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | 'all'>('all');

  // 필터링된 템플릿
  const filteredTemplates = habitTemplates.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: { key: HabitCategory | 'all'; label: string; color: string }[] = [
    { key: 'all', label: '전체', color: 'bg-gray-500' },
    { key: 'water', label: '수분', color: 'bg-blue-500' },
    { key: 'exercise', label: '운동', color: 'bg-green-500' },
    { key: 'nutrition', label: '영양', color: 'bg-orange-500' },
    { key: 'sleep', label: '수면', color: 'bg-purple-500' },
    { key: 'stress', label: '스트레스', color: 'bg-pink-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">습관 라이브러리</h2>
            <button
              onClick={onClose}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="습관 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="px-6 py-4 border-b flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${
                  selectedCategory === category.key
                    ? `${category.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* 템플릿 리스트 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTemplates.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectTemplate(template)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 text-left hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{template.name}</h3>
                      <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                        {template.difficulty === 'easy'
                          ? '쉬움'
                          : template.difficulty === 'medium'
                          ? '보통'
                          : '어려움'}
                      </span>
                    </div>
                    <Plus className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
