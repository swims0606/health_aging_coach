'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextContentProps {
  content: string;
  readingTime: number;
}

export default function TextContent({ content, readingTime }: TextContentProps) {
  // Simple markdown-like formatting
  const formatContent = (text: string) => {
    const lines = text.trim().split('\n');

    return lines.map((line, index) => {
      // Headings
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-gray-900 mt-5 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Bold text with **
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="text-gray-700 mb-3 leading-relaxed">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
          </p>
        );
      }

      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 mb-2 ml-6">
            {line.replace('- ', '')}
          </li>
        );
      }

      // Icons (emojis at start)
      if (line.match(/^[❌✅📖]/)) {
        return (
          <p key={index} className="text-gray-700 mb-2 leading-relaxed">
            {line}
          </p>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }

      // Regular paragraphs
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-6 md:p-8 prose prose-gray max-w-none"
    >
      {/* Reading time badge */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
        <BookOpen className="w-4 h-4" />
        <span>읽기 시간: 약 {readingTime}분</span>
      </div>

      {/* Formatted content */}
      <div className="space-y-1">{formatContent(content)}</div>
    </motion.div>
  );
}

// Missing import
import { BookOpen } from 'lucide-react';
