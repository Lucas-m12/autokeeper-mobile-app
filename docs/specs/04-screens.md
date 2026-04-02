# Epic 4 — Auth Screens

Each screen has a view file in `src/app/(auth)/` and a logic hook in `src/features/auth/hooks/`.

Reference: `docs/prototypes/auth.html` for exact layouts, `docs/micro-copy.md` for all strings.

---

## Screen 1: Splash (`index.tsx` + no hook needed)

### Layout

- Full screen, background: `radial-gradient(ellipse at 50% 38%, #0f1d35, #060a14 70%)`
- Centered vertically: SplashGauge → Brand name → Tagline
- Bottom area: Speed lines (absolute), Progress bar, "Toque para continuar"
- Tap anywhere → navigate to Welcome

### Elements (top to bottom)

| Element | Component | Delay |
|---------|-----------|-------|
| Speed lines (3) | Inline animated views | 1.5s fade in |
| Gauge ring | `SplashGauge` | 0.3s start |
| Car icon (inside gauge) | Part of SplashGauge | 0.7s |
| "Auto**Keeper**" | `BrandLogo` size="splash" | 1.1s fade up |
| "CONTROLE VEICULAR" | Tagline text | 1.4s fade up |
| Progress bar | Inline (48x3px) | 1.6s fade in, 1.8s fill |
| "Toque para continuar" | Text | 2.6s fade up |

### Staggered Animation

Use Reanimated `FadeInUp.delay(ms)` entering animations or manual `useSharedValue` with `withDelay`.

### Navigation

- `onPress` (entire screen) → `router.replace('/welcome')`

---

## Screen 2: Welcome (`welcome.tsx` + no hook needed)

### Layout

- Full screen, bg: `#060a14`
- Decorations: 2 ambient glows (teal top-right, amber bottom-left) + 4 floating particles
- Content column: StatusBar → Illustration (flex 1, centered) → Bottom section

### Bottom Section (padding: 0 30px 44px)

| Element | Component |
|---------|-----------|
| Logo row | `BrandLogo` size="nav" |
| Heading | "Seu veículo, **sob controle.**" (controle in amber) — 27px, weight 700 |
| Description | Body text — 15px, `#8899ae` |
| Primary button | "Entrar na conta" → `router.push('/login')` |
| Outline button | "Criar conta gratuita" → `router.push('/register')` |

### Spacing

- Logo row margin-bottom: 14px
- Heading margin-bottom: 10px
- Description margin-bottom: 28px
- Buttons gap: 12px

---

## Screen 3: Login (`login.tsx` + `use-login.ts`)

### Layout

- Auth shell: StatusBar → Header (back button) → Scrollable body → Footer
- Decorations: 2 ambient glows + gauge arc (login variant)

### Body Elements

| Element | Component | Details |
|---------|-----------|---------|
| Auth icon | 42x42px amber variant | Car/lock icon, `rgba(232,168,56,0.15)` bg |
| Title | "Bem-vindo de volta" | h2, 25px |
| Subtitle | "Entre com seu celular..." | 14px, `#8899ae` |
| Phone input | `PhoneInput` | label "CELULAR" |
| Password input | `TextInput` | label "SENHA", secureTextEntry, eye toggle |
| Form extras row | Checkbox + forgot link | "Lembrar de mim" + "Esqueceu a senha?" (amber) |
| Primary button | "Entrar" | onPress → `useLogin.handleLogin()` |
| Divider | `Divider` | "ou" |
| Social row | 2x `Button` variant="social" | Google + Apple icons |

### Footer

- "Não tem conta?" + "Criar conta" (teal link) → `router.push('/register')`
- Padding: 14px 30px 38px

### Hook: `use-login.ts`

```
State: phone, password, rememberMe, isLoading, error
Actions: handleLogin(), toggleRemember()
Validation: phone required + format, password required
On success: router.replace('/(tabs)')
On error: set error message
```

---

## Screen 4: Register (`register.tsx` + `use-register.ts`)

### Layout

Same auth shell as Login. Gauge arc: register variant.

### Body Elements

| Element | Component |
|---------|-----------|
| Auth icon | 42x42px teal variant, user+ icon |
| Title | "Criar sua conta" |
| Subtitle | "É rápido e gratuito..." |
| Name input | `TextInput` label "NOME COMPLETO", person icon |
| Phone input | `PhoneInput` label "CELULAR" |
| Password input | `TextInput` + `PasswordStrength` |
| Confirm password | `TextInput` |
| Primary button | "Criar conta" → navigate to OTP |
| Terms text | Small text with Termos + Política links |

### Footer

- "Já tem conta?" + "Entrar" → `router.push('/login')`

### Hook: `use-register.ts`

```
State: name, phone, password, confirmPassword, isLoading, errors (per field)
Actions: handleRegister()
Validation: name required, phone format, password min 8 + complexity, confirm match
On success: router.push('/otp?flow=register&phone=...')
```

---

## Screen 5: OTP (`otp.tsx` + `use-otp.ts`)

Shared screen for register OTP and forgot-password OTP.

### Route Params

```
flow: 'register' | 'forgot-password'
phone: string (formatted for display)
```

### Layout

- Auth shell with centered content
- Decorations: centered ambient glow + OTP deco circles (concentric rings)

### Body Elements (centered)

| Element | Register Flow | Forgot Password Flow |
|---------|--------------|---------------------|
| Icon container | 64x64px, teal bg, phone icon | 64x64px, amber bg, phone icon |
| Title | "Verificar celular" | "Código de verificação" |
| Subtitle | "Enviamos um código SMS para" | "Enviamos um código SMS para" |
| Phone display | Bold, 15px | Bold, 15px |
| Hint | "Digite o código de 6 dígitos" | "Digite o código de 6 dígitos" |
| OTP input | `OtpInput` | `OtpInput` |
| Primary button | "Verificar" | "Verificar" |
| Timer | "Reenviar código em 00:XX" | "Reenviar código em 00:XX" |
| Alt action | "Usar outro número" → back | "Usar outro número" → back |

### Hook: `use-otp.ts`

```
Params: flow, phone
State: code, isLoading, error, canResend
Uses: useOtpTimer(60)
Actions: handleVerify(), handleResend()
On verify success (register): router.replace('/register-success')
On verify success (forgot): router.replace('/new-password?resetToken=...')
On error: show inline error, clear code
```

### Hook: `use-otp-timer.ts`

```
Input: initialSeconds (60)
Output: { seconds, canResend, resetTimer }
Counts down from initialSeconds to 0
When 0: canResend becomes true
resetTimer: resets to initialSeconds
Formats as "00:SS"
```

---

## Screen 6: Register Success (`register-success.tsx`)

### Layout

- Auth shell, centered content, no back button
- Single centered ambient glow (teal)

### Elements

| Element | Details |
|---------|---------|
| SuccessCheck | variant="teal" |
| Title | "Conta criada!" |
| Subtitle | "Bem-vindo ao Auto**Keeper**. Seu celular foi verificado com sucesso." |
| Description | "Adicione seu primeiro veículo para começar a receber lembretes inteligentes." |
| Primary button | "+ Adicionar meu veículo" (with plus icon) → future: vehicle add flow |
| Text button | "Fazer isso depois" → `router.replace('/(tabs)')` |

---

## Screen 7: Forgot Password (`forgot-password.tsx` + `use-forgot-password.ts`)

### Layout

Same auth shell. Gauge arc: forgot variant.

### Elements

| Element | Details |
|---------|---------|
| Auth icon | Amber variant, lock + dot icon |
| Title | "Esqueceu a senha?" |
| Subtitle | "Sem problemas! Digite seu número de celular..." |
| Phone input | `PhoneInput` label "CELULAR CADASTRADO" |
| Primary button | "Enviar código" |
| Help text | "Lembrou a senha?" + "Voltar ao login" (teal) |

### Hook: `use-forgot-password.ts`

```
State: phone, isLoading, error
Actions: handleSendCode()
Validation: phone required + format
On success: router.push('/otp?flow=forgot-password&phone=...')
```

---

## Screen 8: New Password (`new-password.tsx` + `use-new-password.ts`)

### Layout

Same auth shell. Gauge arc: newPassword variant.

### Route Params

```
resetToken: string
```

### Elements

| Element | Details |
|---------|---------|
| Auth icon | Teal variant, shield icon |
| Title | "Nova senha" |
| Subtitle | "Crie uma nova senha segura..." |
| Password input | `TextInput` + `PasswordStrength` |
| Confirm password | `TextInput` |
| Primary button | "Redefinir senha" |

### Hook: `use-new-password.ts`

```
Params: resetToken
State: password, confirmPassword, isLoading, errors
Actions: handleReset()
Validation: password min 8 + complexity, confirm match
On success: router.replace('/password-reset-success')
```

---

## Screen 9: Password Reset Success (`password-reset-success.tsx`)

### Layout

- Auth shell, centered content, no back button
- Single centered ambient glow (green-tinted)

### Elements

| Element | Details |
|---------|---------|
| SuccessCheck | variant="green" |
| Title | "Senha redefinida!" |
| Subtitle | "Sua senha foi alterada com sucesso. Agora você pode entrar com a nova senha." |
| Primary button | "Ir para o login" (with login arrow icon) → `router.replace('/login')` |

---

## Shared Auth Shell Pattern

Screens 3-9 share a common layout structure:

```
<SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.deep }}>
  {/* Ambient glows (absolute positioned) */}
  <AmbientGlow variant="teal" />
  <AmbientGlow variant="amber" />
  
  {/* Gauge decoration (absolute positioned) */}
  <GaugeArc screen="login" />
  
  {/* Header with back button */}
  <View style={styles.header}>
    <Button variant="back" onPress={router.back} />
  </View>
  
  {/* Scrollable body */}
  <ScrollView style={styles.body}>
    {/* Screen-specific content */}
  </ScrollView>
  
  {/* Footer (optional) */}
  <View style={styles.footer}>
    {/* "Já tem conta? Entrar" etc. */}
  </View>
</SafeAreaView>
```

Consider extracting an `AuthShell` wrapper to reduce duplication across screen files.

---

## Acceptance Criteria

- [ ] Each screen renders all elements matching the HTML prototype
- [ ] Navigation between screens follows the exact flow graph
- [ ] Splash animations play in correct staggered sequence
- [ ] Login/Register forms validate on submit
- [ ] OTP screen correctly adapts to register vs. forgot-password flow
- [ ] Success screens show animated checkmark
- [ ] All text matches micro-copy.md strings exactly
- [ ] Back button navigates to correct previous screen
- [ ] Footer links navigate to correct screens
