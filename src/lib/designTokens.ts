// Habit Space Design Tokens - Calm, Minimal, Professional

export const designTokens = {
  // Habit Space Color System
  colors: {
    // Primary Blue - Trust & Focus
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3B82F6', // Primary blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Soft Green - Growth & Health
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#10B981', // Soft green
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    // Sand Beige - Warm Light
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#FCDDB0', // Sand beige
      500: '#FCDDB0',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    // Pastel Lavender - Calm Depth
    lavender: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#C7D2FE', // Pastel lavender
      400: '#C7D2FE',
      500: '#a78bfa',
      600: '#8b5cf6',
      700: '#7c3aed',
      800: '#6d28d9',
      900: '#5b21b6',
    },
    // Grayscale - Balanced & Professional
    gray: {
      50: '#F9FAFB', // Off-white background
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9CA3AF', // Tertiary text
      500: '#6B7280', // Secondary text / icons
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827', // Primary text
    },
    background: {
      primary: '#F9FAFB', // Off-white
      secondary: '#FFFFFF', // Pure white
      card: '#FFFFFF', // Pure white cards
      tertiary: '#f3f4f6',
    },
    text: {
      primary: '#111827', // Dark gray-black
      secondary: '#6B7280', // Medium gray
      tertiary: '#9CA3AF', // Light gray
      inverse: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.05)', // Subtle divider
    // Habit Category Colors (minimal, professional)
    habits: {
      blue: '#3B82F6',
      green: '#10B981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      pink: '#ec4899',
      teal: '#14b8a6',
      yellow: '#eab308',
      red: '#ef4444',
    },
  },

  // 8px Baseline Grid Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px', // Card horizontal padding
    '2xl': '32px', // Section margin
    '3xl': '48px',
    '4xl': '64px',
    cardPaddingH: '20px',
    cardPaddingV: '16px',
    componentGap: '12px',
    sectionMargin: '32px',
  },

  // Border Radius - Habit Space
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px', // Buttons, inputs
    lg: '16px', // Cards
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // Subtle Shadows - Habit Space
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 2px 8px rgba(0, 0, 0, 0.06)', // Main shadow
    lg: '0 4px 12px rgba(0, 0, 0, 0.08)',
    xl: '0 8px 20px rgba(0, 0, 0, 0.10)',
  },

  // Typography System - Inter
  typography: {
    fontFamily: {
      base: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
      display: "'Inter', sans-serif",
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
    },
    fontSize: {
      caption: '12px',
      body: '14px',
      h3: '16px',
      h2: '20px',
      h1: '24px',
      // Legacy aliases
      xs: '12px',
      sm: '14px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeight: {
      normal: 400, // Body text
      medium: 500, // Subheadings
      semibold: 600, // Headlines
    },
    lineHeight: {
      tight: 1.3, // For headings
      normal: 1.5, // For body
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.2px', // For headings
      normal: '0', // For body
      wide: '0.3px',
    },
  },

  // Touch Targets
  touchTargets: {
    minimum: '44px',
    comfortable: '48px',
    spacious: '56px',
  },

  // Gentle Transitions - Habit Space
  transitions: {
    fast: '150ms',
    base: '200ms', // Main transition duration
    slow: '300ms',
    easing: {
      standard: 'ease-in-out', // Standard Habit Space easing
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Minimal Gradients
  gradients: {
    subtle: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
    blue: 'linear-gradient(135deg, #3B82F6, #60a5fa)',
    green: 'linear-gradient(135deg, #10B981, #34d399)',
    lavender: 'linear-gradient(135deg, #C7D2FE, #e0e7ff)',
  },

  // Z-Index
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// Breakpoints
export const breakpoints = {
  mobile: '320px',
  mobileLg: '375px',
  tablet: '768px',
  tabletLg: '1024px',
  desktop: '1280px',
};

// Animation Presets - Gentle & Calm
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  scaleIn: {
    initial: { scale: 0.98, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

export default designTokens;
