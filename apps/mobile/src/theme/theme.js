import { StyleSheet, Platform } from 'react-native';

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADII = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  pill: 9999,
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
};

export const DARK_COLORS = {
  bgDark: '#090d16',
  bgSurface: '#0e1422',
  bgCard: '#131b2e',
  bgCardHover: '#1a243d',
  bgGlass: 'rgba(255, 255, 255, 0.05)',
  
  border: 'rgba(255, 255, 255, 0.09)',
  borderActive: 'rgba(56, 189, 248, 0.4)',

  primary: '#38bdf8',
  primaryGlow: 'rgba(56, 189, 248, 0.25)',
  accentPurple: '#c084fc',
  accentIndigo: '#818cf8',
  accentEmerald: '#34d399',
  accentAmber: '#fbbf24',
  accentRose: '#f43f5e',

  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textInverse: '#090d16',
};

export const LIGHT_COLORS = {
  bgDark: '#f8fafc',
  bgSurface: '#ffffff',
  bgCard: '#ffffff',
  bgCardHover: '#f1f5f9',
  bgGlass: 'rgba(0, 0, 0, 0.04)',
  
  border: 'rgba(0, 0, 0, 0.08)',
  borderActive: 'rgba(2, 132, 199, 0.4)',

  primary: '#0284c7',
  primaryGlow: 'rgba(2, 132, 199, 0.2)',
  accentPurple: '#9333ea',
  accentIndigo: '#4f46e5',
  accentEmerald: '#059669',
  accentAmber: '#d97706',
  accentRose: '#e11d48',

  textMain: '#0f172a',
  textMuted: '#475569',
  textDim: '#94a3b8',
  textInverse: '#ffffff',
};

// Default Theme pointing to Dark mode
export const COLORS = DARK_COLORS;

export const SHADOWS = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
    },
    android: {
      elevation: 10,
    },
  }),
};
