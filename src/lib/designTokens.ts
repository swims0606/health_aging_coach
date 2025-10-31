// Warm Emotional Design Tokens - Habit Space Inspired

export const designTokens = {
  // Warm Pastel Color System
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f4fc',
      200: '#c5e9f9',
      300: '#9ddef5',
      400: '#6EC1E4', // Soft sky blue (primary)
      500: '#6EC1E4',
      600: '#4ba8ce',
      700: '#3a8fb8',
      800: '#2d7699',
      900: '#1f5f7d',
    },
    secondary: {
      50: '#f0fdf6',
      100: '#dcfce9',
      200: '#bbf7d2',
      300: '#A8E6CF', // Mint green
      400: '#A8E6CF',
      500: '#86d4b2',
      600: '#5cb98a',
      700: '#3a9e6f',
      800: '#2e7d5a',
      900: '#1f5e43',
    },
    accent: {
      50: '#fff9f5',
      100: '#fff0e6',
      200: '#ffe5d1',
      300: '#FFD3B6', // Warm peach
      400: '#FFD3B6',
      500: '#ffb88a',
      600: '#ff9d5e',
      700: '#f58142',
      800: '#d96a2e',
      900: '#b5551f',
    },
    gray: {
      50: '#FAFAF9',
      100: '#F8F7F4',
      200: '#e8e6e3',
      300: '#d5d3cf',
      400: '#b0ada8',
      500: '#9ca3af', // Soft gray for icons
      600: '#6b7280',
      700: '#4b5563',
      800: '#374151',
      900: '#1f2937',
    },
    background: {
      primary: '#ffffff',
      secondary: '#FAFAF9',
      tertiary: '#F8F7F4',
      card: '#ffffff',
    },
    text: {
      primary: '#374151',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
    },
    // Warm Habit Colors (pastel tones)
    habits: {
      blue: '#6EC1E4',
      green: '#A8E6CF',
      purple: '#c4b5fd',
      orange: '#FFD3B6',
      pink: '#fda4c0',
      teal: '#7dd3ce',
      yellow: '#fde68a',
      red: '#fca5a5',
    },
  },

  // Generous Spacing (12 / 20 / 32px rhythm)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  // Rounded Elements
  borderRadius: {
    none: '0',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px', // Smooth rounded cards
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },

  // Soft Shadows
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.03)',
    md: '0 2px 8px rgba(0, 0, 0, 0.04)', // Smooth shadow
    lg: '0 4px 12px rgba(0, 0, 0, 0.05)',
    xl: '0 8px 20px rgba(0, 0, 0, 0.06)',
  },

  // Warm Typography - Poppins
  typography: {
    fontFamily: {
      base: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "'Poppins', sans-serif",
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
    },
    fontSize: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      lg: '17px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.3px', // For headings
    },
  },

  // Touch Targets
  touchTargets: {
    minimum: '44px',
    comfortable: '48px',
    spacious: '56px',
  },

  // Gentle, Organic Transitions
  transitions: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    gentle: '600ms', // For fade effects
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Organic easing
    },
  },

  // Gradients
  gradients: {
    card: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
    warm: 'linear-gradient(135deg, #FFD3B6, #fde68a)',
    sky: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
    subtle: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(248, 247, 244, 0.8))',
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

// Animation Presets - Gentle & Organic
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  gentlePop: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 150, damping: 15 },
  },
};

export default designTokens;
