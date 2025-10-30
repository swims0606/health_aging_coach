'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import { getMotivationalMessage } from '@/lib/behavioralSystem';

type MessageContext = 'achievements' | 'struggles' | 'progress' | 'encouragement';

interface MotivationalMessageProps {
  context?: MessageContext;
  autoRotate?: boolean;
}

export default function MotivationalMessage({
  context = 'encouragement',
  autoRotate = true,
}: MotivationalMessageProps) {
  const [message, setMessage] = useState('');
  const [currentContext, setCurrentContext] = useState<MessageContext>(context);

  const refreshMessage = () => {
    setMessage(getMotivationalMessage(currentContext));
  };

  useEffect(() => {
    refreshMessage();

    if (autoRotate) {
      const interval = setInterval(() => {
        const contexts: MessageContext[] = ['achievements', 'struggles', 'progress', 'encouragement'];
        const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
        setCurrentContext(randomContext);
        setMessage(getMotivationalMessage(randomContext));
      }, 10000); // Change every 10 seconds

      return () => clearInterval(interval);
    }
  }, [currentContext, autoRotate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" fill="currentColor" />
            <span className="text-sm font-medium opacity-90">오늘의 메시지</span>
          </div>
          <button
            onClick={refreshMessage}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="새로운 메시지"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-semibold leading-relaxed"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
