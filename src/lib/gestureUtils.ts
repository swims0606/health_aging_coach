// Haptic Feedback Utilities for Native-like Experience

export const hapticFeedback = {
  // Light tap
  light: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  },

  // Medium impact
  medium: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }
  },

  // Heavy impact
  heavy: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  },

  // Success pattern
  success: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([10, 10, 10]);
    }
  },

  // Error pattern
  error: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([50, 10, 50]);
    }
  },

  // Selection changed
  selection: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(5);
    }
  },
};

// Gesture Handlers Interface
export interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

// Swipe Detection
export const useSwipeGesture = (handlers: GestureHandlers) => {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let longPressTimer: NodeJS.Timeout | null = null;
  let lastTapTime = 0;

  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;

    // Long press detection
    if (handlers.onLongPress) {
      longPressTimer = setTimeout(() => {
        handlers.onLongPress?.();
        hapticFeedback.medium();
      }, 500);
    }

    // Double tap detection
    if (handlers.onDoubleTap) {
      const now = Date.now();
      if (now - lastTapTime < 300) {
        handlers.onDoubleTap();
        hapticFeedback.light();
      }
      lastTapTime = now;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }

    handleSwipe();
  };

  const handleTouchMove = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  };

  const handleSwipe = () => {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Horizontal swipe
    if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
      if (deltaX > 0 && handlers.onSwipeRight) {
        handlers.onSwipeRight();
        hapticFeedback.light();
      } else if (deltaX < 0 && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
        hapticFeedback.light();
      }
    }
    // Vertical swipe
    else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      if (deltaY > 0 && handlers.onSwipeDown) {
        handlers.onSwipeDown();
        hapticFeedback.light();
      } else if (deltaY < 0 && handlers.onSwipeUp) {
        handlers.onSwipeUp();
        hapticFeedback.light();
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  };
};

// Smooth scroll utility
export const smoothScrollTo = (element: HTMLElement | null, offset: number = 0) => {
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

// Prevent overscroll (rubber band effect)
export const preventOverscroll = (element: HTMLElement) => {
  let startY = 0;

  element.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
  }, { passive: false });

  element.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].pageY;
    const isAtTop = element.scrollTop === 0;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if ((isAtTop && currentY > startY) || (isAtBottom && currentY < startY)) {
      e.preventDefault();
    }
  }, { passive: false });
};
