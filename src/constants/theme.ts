import { Platform, TextStyle } from 'react-native';

export const colors = {
  brand: {
    amber: '#e8a838',
    amberLight: '#f0c060',
    amberGlow: 'rgba(232,168,56,0.15)',
  },
  accent: {
    teal: '#14b8a6',
    tealLight: '#2dd4bf',
    tealDark: '#0d9488',
    tealGlow: 'rgba(20,184,166,0.12)',
  },
  bg: {
    deep: '#060a14',
    base: '#0b1120',
    surface: '#111d33',
    card: '#162036',
    input: '#0f1a2e',
  },
  text: {
    primary: '#e8ecf4',
    secondary: '#8899ae',
    muted: '#556677',
    placeholder: '#3d5068',
  },
  border: {
    subtle: 'rgba(136,153,174,0.1)',
    input: 'rgba(136,153,174,0.15)',
    focus: 'rgba(20,184,166,0.4)',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#f43f5e',
    info: '#3b82f6',
  },
} as const;

export const spacing = {
  '2xs': 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  '2xl': 20,
  '3xl': 22,
  '4xl': 24,
  '5xl': 26,
  '6xl': 28,
  '7xl': 30,
  '8xl': 38,
  '9xl': 44,
  '10xl': 54,
} as const;

export const radius = {
  sm: 5,
  md: 9,
  lg: 10,
  xl: 12,
  '2xl': 14,
  '3xl': 20,
  full: 9999,
} as const;

const font = Platform.select({
  ios: 'Avenir Next',
  default: 'Montserrat_400Regular',
});

const fontBold = Platform.select({
  ios: 'Avenir Next',
  default: 'Montserrat_700Bold',
});

const fontSemiBold = Platform.select({
  ios: 'Avenir Next',
  default: 'Montserrat_600SemiBold',
});

const fontMedium = Platform.select({
  ios: 'Avenir Next',
  default: 'Montserrat_500Medium',
});

export const typography: Record<string, TextStyle> = {
  display: { fontSize: 30, fontWeight: '700', lineHeight: 36, letterSpacing: -0.5, fontFamily: fontBold },
  h1: { fontSize: 27, fontWeight: '700', lineHeight: 32.4, letterSpacing: -0.5, fontFamily: fontBold },
  h2: { fontSize: 25, fontWeight: '700', lineHeight: 30, letterSpacing: -0.5, fontFamily: fontBold },
  h3: { fontSize: 20, fontWeight: '700', lineHeight: 26, letterSpacing: -0.3, fontFamily: fontBold },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 24, fontFamily: font },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 16, fontFamily: fontSemiBold },
  label: { fontSize: 11, fontWeight: '700', lineHeight: 15.4, letterSpacing: 0.8, textTransform: 'uppercase', fontFamily: fontBold },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 19.5, fontFamily: font },
  small: { fontSize: 12, fontWeight: '400', lineHeight: 19.2, fontFamily: font },
  link: { fontSize: 14, fontWeight: '600', lineHeight: 21, fontFamily: fontSemiBold },
};

export const shadows = {
  primaryButton: {
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoIcon: {
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;

export const fontFamily = font;
