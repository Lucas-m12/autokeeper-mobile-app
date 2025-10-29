/**
 * AutoKeeper Design System - Theme Constants
 * Based on the design system documented in /docs/
 *
 * This app uses a dark-first automotive theme inspired by modern EV dashboards.
 */

import { Platform } from 'react-native';

/**
 * Color Palette
 * Reference: docs/01-Colors.md
 */
export const Colors = {
  // Primary Colors
  primary: '#06b6d4',
  primaryLight: '#22d3ee',
  primaryLighter: '#67e8f9',
  primaryPale: '#a5f3fc',
  primaryDark: '#0891b2',

  // Secondary Colors
  secondary: '#3b82f6',
  secondaryLight: '#60a5fa',

  // Background Colors
  bgBlack: '#0a0a0a',
  bgDark: '#121212',
  bgMedium: '#1a1a1a',

  // Surface Colors
  surfaceDark: 'rgba(30, 30, 30, 0.6)',
  surfaceMedium: 'rgba(40, 40, 40, 0.8)',
  cardBg: 'rgba(18, 18, 18, 0.9)',

  // Text Colors
  textWhite: '#ffffff',
  textLight: '#f1f5f9',
  textGrayLight: '#d1d5db',
  textGray: '#9ca3af',
  textGrayMedium: '#6b7280',
  textGrayDark: '#475569',
  textMuted: '#64748b',

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Border Colors
  borderCyan: 'rgba(34, 211, 238, 0.2)',
  borderCyanActive: 'rgba(34, 211, 238, 0.4)',
  borderCyanStrong: 'rgba(34, 211, 238, 0.5)',
  borderWhite: 'rgba(255, 255, 255, 0.1)',
} as const;

/**
 * Gradients
 * Reference: docs/01-Colors.md
 */
export const Gradients = {
  // Primary gradient for buttons and CTAs
  primary: {
    colors: ['#06b6d4', '#0891b2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Logo gradient
  logo: {
    colors: ['#06b6d4', '#3b82f6'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Background gradient
  background: {
    colors: ['#0a0a0a', '#1a1a1a', '#121212'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Text gradient (for brand name)
  text: {
    colors: ['#ffffff', '#a5f3fc', '#22d3ee'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

/**
 * Typography Scale
 * Reference: docs/02-Typography.md
 */
export const Typography = {
  // Heading styles
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 38.4,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 33.6,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 27.5,
  },

  // Body text
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 27,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  },

  // UI text
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 21,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 19.5,
  },
  link: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 21,
  },
} as const;

/**
 * Font Families
 * Reference: docs/02-Typography.md
 * Uses system fonts for native feel and performance
 */
export const Fonts = Platform.select({
  ios: {
    /** SF Pro (San Francisco) - iOS default */
    default: 'System',
    sans: 'system-ui',
    mono: 'ui-monospace',
  },
  android: {
    /** Roboto - Android default */
    default: 'System',
    sans: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    default: 'system-ui',
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    default: 'System',
    sans: 'normal',
    mono: 'monospace',
  },
});

/**
 * Spacing Scale (4px-based)
 * Reference: docs/03-Spacing-Layout.md
 */
export const Spacing = {
  xss: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

/**
 * Border Radius
 * Reference: docs/03-Spacing-Layout.md
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

/**
 * Icon Sizes
 * Reference: docs/06-Icons.md
 */
export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
} as const;

/**
 * Icon Stroke Widths
 * Reference: docs/06-Icons.md
 */
export const IconStrokeWidths = {
  xs: 2,
  sm: 2,
  md: 2,
  lg: 2.5,
  xl: 2.5,
  '2xl': 2.5,
  '3xl': 3,
} as const;

/**
 * Shadow Presets
 * Reference: docs/05-Effects.md
 */
export const Shadows = {
  // Standard shadows (black)
  level1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Android
  },
  level2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  level3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  level4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 60,
    elevation: 20,
  },

  // Cyan glows (colored shadows)
  glowSubtle: {
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  glowMedium: {
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
  },
  glowStrong: {
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 16,
  },
} as const;

/**
 * Animation Durations (in milliseconds)
 * Reference: docs/05-Effects.md
 */
export const AnimationDurations = {
  fast: 100,
  quick: 200,
  standard: 300,
  slow: 500,
  verySlow: 800,
} as const;

/**
 * Opacity Scale
 * Reference: docs/01-Colors.md
 */
export const Opacity = {
  full: 1.0,
  high: 0.9,
  medium: 0.8,
  moderate: 0.6,
  low: 0.4,
  veryLow: 0.2,
  subtle: 0.15,
  trace: 0.1,
} as const;
