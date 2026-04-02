# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoKeeper is a Brazilian vehicle management app (IPVA, insurance, maintenance reminders) built with Expo SDK 55, React Native 0.83.4, and TypeScript in strict mode. The app targets iOS, Android, and Web. All user-facing text is in Portuguese (pt-BR).

## Commands

```bash
pnpm start          # Start Expo dev server
pnpm ios            # Run on iOS simulator
pnpm android        # Run on Android emulator
pnpm web            # Run on web
pnpm lint           # Run ESLint via Expo
```

No test runner is configured yet.

## Architecture

### Routing

Expo Router with file-based routing. Screens live in `src/app/` using route groups:
- `(auth)/` — authentication flow (stack navigator, no headers)
- `(tabs)/` — main app with bottom tabs

The root `_layout.tsx` conditionally renders `(auth)` or `(tabs)` based on auth state from the Zustand store.

### Code Organization Pattern

Each screen separates UI from logic into two files:
- **View**: `src/app/(auth)/login.tsx` — JSX rendering only
- **Hook**: `src/features/auth/hooks/use-login.ts` — state, validation, API calls, navigation

Shared UI components live in `src/components/`. Feature-specific components live in `src/features/<feature>/components/`.

### State Management

Zustand for global state (`src/stores/`). The auth store manages user, token, and `isAuthenticated`.

### API Layer

Repository pattern with TypeScript interfaces. `IAuthRepository` defines the contract; `FakeAuthRepository` provides an in-memory mock with simulated delays. Swap implementations by changing the injected repository — the contract stays the same.

### Design System

The app uses a dark-only theme ("Noite na Estrada" — deep navy backgrounds). Design tokens are centralized in `src/constants/theme.ts` and exported as `colors`, `spacing`, `radius`, `typography`, and `shadows` objects.

Dual-accent system: **teal (#14b8a6) for actions**, **amber (#e8a838) for brand identity**.

### Path Aliases

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Design System Documentation

`docs/` contains the complete design system specs — treat these as the source of truth for visual implementation:

- `01-Foundations.md` — color palette, typography scale, spacing, layout, border radius
- `02-Components.md` — button, input, checkbox, badge, logo, divider specs with exact measurements
- `03-Effects-Patterns.md` — animations, shadows, ambient glows, particles, screen transitions
- `micro-copy.md` — all pt-BR strings organized by screen
- `validation.md` — input validation rules, edge cases, error messages

`docs/specs/` contains implementation-level epics (00-06) with architecture decisions, component props, data flow, and acceptance criteria.

`docs/prototypes/` contains interactive HTML prototypes that serve as pixel-level visual references.

## Key Conventions

- Platform-specific files use `.web.tsx` suffix for web variants
- SVG icons are inline via `react-native-svg` (no icon library)
- Animations use `react-native-reanimated` (v4.2)
- All status bar text is light (dark background)
- Brazilian phone format: `(DD) 9XXXX-XXXX`, stored as `+55XXXXXXXXXXX`
