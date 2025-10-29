# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoKeeper is an **Expo React Native** mobile application for managing vehicle maintenance, documents, and reminders. The app targets Brazilian users (Portuguese-first) and features a **dark automotive theme** inspired by electric vehicle dashboards.

**Tech Stack:**
- Expo SDK ~54.0
- React Native 0.81.5
- React 19.1.0
- Expo Router ~6.0 (file-based routing)
- TypeScript 5.9.2

## Development Commands

### Starting the App
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android emulator
npm run ios            # Run on iOS simulator
npm run web            # Run on web
```

### Development Tools
```bash
npm run lint           # Run ESLint (expo lint)
npm run reset-project  # Reset to blank project (use with caution)
```

**Note:** There are no test scripts configured yet. When adding tests, update this file.

## Project Structure

```
src/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx   # Tab navigator layout
│   │   ├── index.tsx     # Home screen
│   │   └── explore.tsx   # Explore screen
│   ├── _layout.tsx        # Root layout
│   ├── login.tsx          # Login screen
│   └── modal.tsx          # Modal example
├── components/            # Reusable UI components
│   ├── ui/               # UI primitives (collapsible, icons)
│   ├── themed-text.tsx   # Theme-aware text
│   ├── themed-view.tsx   # Theme-aware view
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── use-theme-color.ts
│   ├── use-color-scheme.ts
│   └── ...
├── constants/             # App constants
│   └── theme.ts          # Theme definitions
└── assets/               # Images, fonts, icons
```

**Routing:** Expo Router uses file-based routing. Files in `src/app/` automatically become routes.
- `src/app/index.tsx` → `/`
- `src/app/login.tsx` → `/login`
- `src/app/(tabs)/index.tsx` → Tab navigation home

## Design System

AutoKeeper has a **comprehensive design system** documented in `/docs/`. All UI development must follow these specifications.

### Core Design Principles

1. **Dark-First**: Premium dark theme with subtle cyan accents
2. **Automotive Aesthetic**: Inspired by modern EV dashboards
3. **Glassmorphism**: Subtle backdrop blur for cards (use `@react-native-community/blur`)
4. **Brazilian Context**: Portuguese-first language, local conventions

### Design System Reference

| File | Purpose |
|------|---------|
| `docs/AutoKeeper-Design-System.md` | Overview and philosophy |
| `docs/01-Colors.md` | Complete color palette with semantic colors |
| `docs/02-Typography.md` | Font scales, weights, line heights |
| `docs/03-Spacing-Layout.md` | Spacing tokens, layouts, responsive breakpoints |
| `docs/04-Components.md` | Component specifications (buttons, cards, inputs) |
| `docs/05-Effects.md` | Shadows, glows, animations |
| `docs/06-Icons.md` | Icon system (recommends Lucide React Native) |

### Quick Design Reference

**Colors:**
- Primary: `#06b6d4` (cyan)
- Background: `#0a0a0a` to `#121212` (gradient)
- Text: `#ffffff` (headings), `#f1f5f9` (body), `#9ca3af` (secondary)
- Status: Success `#10b981`, Warning `#f59e0b`, Error `#ef4444`

**Spacing Scale (4px-based):**
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px, 2xl: 24px, 3xl: 32px, 4xl: 40px, 5xl: 48px, 6xl: 64px

**Typography:**
- Font: System default (SF Pro on iOS, Roboto on Android)
- Sizes: 13px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 28px (3xl), 32px (4xl)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Border Radius:**
- Inputs: 12px, Buttons: 16px, Cards (mobile): 24-32px

**Icons:**
- Library: Lucide React Native (recommended)
- Sizes: 16px, 20px, 24px, 32px, 40px, 48px, 64px
- Stroke width: 2px (small), 2.5px (medium), 3px (large)

## TypeScript Configuration

**Path Aliases:** (configured in `tsconfig.json`)
```typescript
import { MyComponent } from '@/components/MyComponent';
import { useCustomHook } from '@hooks/useCustomHook';
import icon from '@assets/images/icon.png';
```

Available aliases:
- `@/*` → `./src/*`
- `@assets/*` → `./src/assets/*`
- `@components/*` → `./src/components/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`

**Strict mode is enabled.** Always type your components properly.

## Component Development Guidelines

### When Creating New Components:

1. **Check design system first** (`docs/04-Components.md`)
2. **Use design tokens** from `src/constants/` (create if needed based on docs)
3. **Follow naming conventions:**
   - PascalCase for components: `PrimaryButton.tsx`
   - kebab-case for utilities: `format-date.ts`
   - camelCase for hooks: `useVehicleData.ts`

4. **Component template:**
```typescript
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Use design tokens from docs
    padding: 24, // spacing.2xl
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
});
```

### Accessibility Requirements:

- Minimum touch target: **44×44px**
- Color contrast: **WCAG AA minimum** (see `docs/01-Colors.md`)
- Provide `accessibilityLabel` for icon-only buttons
- Support dynamic type scaling

### Animation Guidelines:

- Use React Native Animated API or `react-native-reanimated`
- Keep animations fast: **200-300ms** for most interactions
- Use ease-out easing for natural feel
- Respect `AccessibilityInfo.isReduceMotionEnabled()`
- See `docs/05-Effects.md` for detailed specs

## Expo Router Navigation

**File-based routing:**
```typescript
// Navigate to a screen
import { router } from 'expo-router';

router.push('/login');
router.push('/(tabs)/explore');
router.back();
```

**Typed routes:** The project has `typedRoutes: true` in `app.json`, so routes are type-safe.

## Mobile-First Responsive Design

**Target Devices:**
- Primary: iPhone 14 Pro (390px width)
- Minimum: Small Android (360px width)
- Tablet: 768px+ (center content, max-width 420px)

**Breakpoints:**
- Use `Dimensions.get('window')` or media queries
- Screen padding: 24px (mobile), 32px (tablet)
- Always test at 360px and 390px widths

## Platform-Specific Code

When needed, use platform extensions:
- `component.ios.tsx` - iOS only
- `component.android.tsx` - Android only
- `component.web.tsx` - Web only

Or inline:
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      ios: 24,
      android: 20,
      default: 24,
    }),
  },
});
```

## Important Notes

- **Ignore `src/app/` example code** - It's boilerplate from Expo template, not production code
- **Always reference `docs/` for design decisions** - Don't make up colors, spacing, or component styles
- **Portuguese-first language** - UI copy should be in Brazilian Portuguese
- **Dark mode only** - App uses dark theme exclusively
- **No backend yet** - Focus on UI/UX and local state management
- **File location conventions:**
  - Screens → `src/app/`
  - Reusable components → `src/components/`
  - UI primitives → `src/components/ui/`
  - Hooks → `src/hooks/`
  - Utils → `src/utils/`
  - Constants → `src/constants/`

## Common Patterns

### Creating a new screen:
1. Add file to `src/app/` (e.g., `src/app/vehicles.tsx`)
2. Use design system components from `docs/`
3. Wrap in `SafeAreaView` from `react-native-safe-area-context`
4. Follow spacing/layout guidelines from `docs/03-Spacing-Layout.md`

### Styling approach:
- Use `StyleSheet.create()` for performance
- Define design tokens in `src/constants/` based on docs
- Prefer Flexbox with `gap` property (RN ≥0.71 supports it)
- Use `rgba()` for transparent colors

### State management:
- No global state library configured yet
- Use React hooks (`useState`, `useReducer`, `useContext`) as needed
- When adding state management (Redux, Zustand, etc.), update this file

## Design System Compliance Checklist

When implementing a new feature, ensure:
- [ ] Colors match `docs/01-Colors.md`
- [ ] Typography follows `docs/02-Typography.md` scale
- [ ] Spacing uses 4px-based scale from `docs/03-Spacing-Layout.md`
- [ ] Components match `docs/04-Components.md` specifications
- [ ] Shadows/animations follow `docs/05-Effects.md`
- [ ] Icons use Lucide library as per `docs/06-Icons.md`
- [ ] Minimum 44×44px touch targets
- [ ] WCAG AA contrast ratios
- [ ] Tested at 360px and 390px widths
- [ ] Portuguese language copy

## Future Considerations

When adding these features, update this file:
- Backend API integration (endpoints, auth)
- State management library
- Testing framework (Jest, React Native Testing Library)
- CI/CD configuration
- Environment variables (.env setup)
- Analytics/crash reporting
- Push notifications
