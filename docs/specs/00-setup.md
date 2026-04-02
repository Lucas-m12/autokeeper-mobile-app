# Epic 0 — Project Setup & Cleanup

## Dependencies to Install

```bash
pnpm add react-native-svg zustand expo-secure-store @expo-google-fonts/montserrat
```

| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-svg` | latest | SVG icons, gauge, illustration, decorative elements |
| `zustand` | latest | Auth state management |
| `expo-secure-store` | ~55.x | Token persistence (match Expo SDK version) |
| `@expo-google-fonts/montserrat` | latest | Android/Web typography (Avenir Next equivalent) |

## Files to Remove (Starter Template)

```
src/app/explore.tsx
src/components/animated-icon.tsx
src/components/animated-icon.web.tsx
src/components/animated-icon.module.css
src/components/app-tabs.tsx
src/components/app-tabs.web.tsx
src/components/external-link.tsx
src/components/hint-row.tsx
src/components/web-badge.tsx
src/components/ui/collapsible.tsx
src/components/themed-text.tsx
src/components/themed-view.tsx
src/global.css (evaluate — may keep for web font defs)
```

Keep `src/hooks/use-theme.ts` and `use-color-scheme.ts` only if adapted to the new dark-only token system. Otherwise remove and replace.

## Design Tokens Implementation

Replace `src/constants/theme.ts` with AutoKeeper tokens. Reference: `docs/01-Foundations.md` lines 232-257.

### Token Structure

```typescript
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
};

export const spacing = {
  '2xs': 4, xs: 6, sm: 8, md: 12, lg: 14,
  xl: 16, '2xl': 20, '3xl': 22, '4xl': 24,
  '5xl': 26, '6xl': 28, '7xl': 30, '8xl': 38,
  '9xl': 44, '10xl': 54,
};

export const radius = {
  sm: 5, md: 9, lg: 10, xl: 12,
  '2xl': 14, '3xl': 20, full: 9999,
};

export const typography = {
  display:  { fontSize: 30, fontWeight: '700', lineHeight: 36, letterSpacing: -0.5 },
  h1:       { fontSize: 27, fontWeight: '700', lineHeight: 32.4, letterSpacing: -0.5 },
  h2:       { fontSize: 25, fontWeight: '700', lineHeight: 30, letterSpacing: -0.5 },
  h3:       { fontSize: 20, fontWeight: '700', lineHeight: 26, letterSpacing: -0.3 },
  body:     { fontSize: 15, fontWeight: '400', lineHeight: 24 },
  button:   { fontSize: 16, fontWeight: '600', lineHeight: 16 },
  label:    { fontSize: 11, fontWeight: '700', lineHeight: 15.4, letterSpacing: 0.8, textTransform: 'uppercase' },
  caption:  { fontSize: 13, fontWeight: '400', lineHeight: 19.5 },
  small:    { fontSize: 12, fontWeight: '400', lineHeight: 19.2 },
  link:     { fontSize: 14, fontWeight: '600', lineHeight: 21 },
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
};
```

## Font Loading

In the root `_layout.tsx`, load Montserrat via `@expo-google-fonts/montserrat`:

```typescript
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
```

Font family mapping:
- iOS: `'Avenir Next'` (system font, no loading needed)
- Android/Web: `'Montserrat'` (loaded via expo-font)

## Root Layout Changes

- Remove tab navigation from root `_layout.tsx`
- Set up conditional rendering: `(auth)` stack if not authenticated, `(tabs)` if authenticated
- Set `StatusBar` style to `light` globally
- Set background color to `colors.bg.deep` (`#060a14`)

## Acceptance Criteria

- [ ] All starter template files removed
- [ ] Dependencies installed and building
- [ ] Montserrat font loading on Android
- [ ] `theme.ts` exports all token objects matching the DS docs
- [ ] Root layout renders without errors
- [ ] StatusBar shows light text on dark background
