# Epic 5 — Navigation & Flow

---

## Route Structure (Expo Router)

```
src/app/
  _layout.tsx              ← Root: conditionally renders (auth) or (tabs)
  (auth)/
    _layout.tsx            ← Stack navigator, headerShown: false
    index.tsx              ← Splash
    welcome.tsx
    login.tsx
    register.tsx
    otp.tsx
    register-success.tsx
    forgot-password.tsx
    new-password.tsx
    password-reset-success.tsx
  (tabs)/
    _layout.tsx            ← Tab navigator (future)
    index.tsx              ← Home (future)
```

---

## Navigation Graph

```
Splash (index)
  └─ [tap] ──────────────→ Welcome

Welcome
  ├─ "Entrar na conta" ──→ Login
  └─ "Criar conta" ──────→ Register

Login
  ├─ [back] ─────────────→ Welcome
  ├─ "Entrar" ───────────→ (tabs) [replace]
  ├─ "Esqueceu a senha?" → Forgot Password
  ├─ "Criar conta" ──────→ Register
  └─ Google/Apple ───────→ (tabs) [replace]

Register
  ├─ [back] ─────────────→ Welcome
  ├─ "Criar conta" ──────→ OTP (flow=register)
  └─ "Entrar" ───────────→ Login

OTP (flow=register)
  ├─ [back] ─────────────→ Register
  ├─ "Verificar" ────────→ Register Success [replace]
  └─ "Usar outro número" → Register

Register Success
  ├─ "Adicionar veículo" → (future vehicle flow)
  └─ "Fazer isso depois" → (tabs) [replace]

Forgot Password
  ├─ [back] ─────────────→ Login
  ├─ "Enviar código" ────→ OTP (flow=forgot-password)
  └─ "Voltar ao login" ──→ Login

OTP (flow=forgot-password)
  ├─ [back] ─────────────→ Forgot Password
  ├─ "Verificar" ────────→ New Password [replace]
  └─ "Usar outro número" → Forgot Password

New Password
  ├─ [back] ─────────────→ OTP (forgot-password)
  └─ "Redefinir senha" ──→ Password Reset Success [replace]

Password Reset Success
  └─ "Ir para o login" ──→ Login [replace]
```

### Navigation Methods

- `router.push()` — forward navigation (adds to stack, animates slide-in)
- `router.replace()` — replaces current screen (no back gesture to previous)
- `router.back()` — pop stack (back button)

---

## Screen Transitions

Reference: `03-Effects-Patterns.md` lines 207-222.

### Forward (push)

```
Exiting screen: opacity 1→0, translateX 0→-30px (0.45s ease)
Entering screen: opacity 0→1, translateX 30px→0 (0.45s ease, 60ms delay)
```

### Back (pop)

Reverse of forward:
```
Exiting screen: opacity 1→0, translateX 0→30px
Entering screen: opacity 0→1, translateX -30px→0
```

### Configuration in Stack Layout

```typescript
// (auth)/_layout.tsx
<Stack
  screenOptions={{
    headerShown: false,
    animation: 'fade_from_bottom', // or custom
    contentStyle: { backgroundColor: colors.bg.deep },
  }}
/>
```

For pixel-perfect matching of the prototype transitions, consider a custom `TransitionPreset` or Reanimated-based screen wrapper with `FadeIn`/`FadeOut` + `SlideInRight`/`SlideOutLeft`.

---

## Auth State Routing

The root `_layout.tsx` controls which route group is active based on auth state.

### Pattern

```typescript
// src/app/_layout.tsx
const { isAuthenticated, isLoading } = useAuthStore();

if (isLoading) return <SplashScreen />;  // or null while checking SecureStore

return (
  <Stack screenOptions={{ headerShown: false }}>
    {isAuthenticated ? (
      <Stack.Screen name="(tabs)" />
    ) : (
      <Stack.Screen name="(auth)" />
    )}
  </Stack>
);
```

### Expo Router Alternative

Use `Redirect` component:
```typescript
if (!isAuthenticated) return <Redirect href="/(auth)" />;
return <Redirect href="/(tabs)" />;
```

---

## Route Params

### OTP Screen

```typescript
type OtpParams = {
  flow: 'register' | 'forgot-password';
  phone: string;  // formatted for display: "+55 (11) 98765-4321"
};
```

### New Password Screen

```typescript
type NewPasswordParams = {
  resetToken: string;
};
```

### Typed Routes

With `typedRoutes: true` in app.json, Expo Router generates types automatically. Use `useLocalSearchParams<OtpParams>()` to read params.

---

## Deep Linking (future consideration)

Not in scope for auth flow, but the route structure supports it:
- `autokeeper://auth/login`
- `autokeeper://auth/register`

---

## Acceptance Criteria

- [ ] Root layout correctly gates `(auth)` vs `(tabs)` based on `isAuthenticated`
- [ ] Auth stack shows no headers
- [ ] Screen transitions match the 0.45s slide + fade spec
- [ ] Back gesture works on iOS (swipe from left edge)
- [ ] `router.replace()` prevents back navigation on success screens
- [ ] OTP screen reads `flow` and `phone` from route params
- [ ] New Password screen reads `resetToken` from route params
- [ ] After login/register success, navigating back doesn't return to auth screens
