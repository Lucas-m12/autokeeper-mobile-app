# Epic 2 — Auth-Specific Components

All components live in `src/features/auth/components/`. These are complex, animated components used only within the auth flow.

Reference: `docs/03-Effects-Patterns.md` for all animation specs.

---

## SplashGauge (`splash-gauge.tsx`)

The signature animated gauge ring on the splash screen. Reference: `03-Effects-Patterns.md` lines 130-156.

### Structure

- SVG container: 150x150px
- Circle centered at (70,70), radius 55, in 140x140 viewBox
- Rotated -90deg (starts fill from top)
- Background ring: stroke `rgba(136,153,174,0.06)`, strokeWidth 4
- Fill ring: stroke uses `linearGradient`, strokeWidth 4, strokeLinecap round

### Gradient (SVG LinearGradient)

```
0%:   #14b8a6 (teal)
50%:  #e8a838 (amber)
100%: #f43f5e (rose)
```

### Animation

- Property: `strokeDashoffset` from 345 → 0
- Duration: 1.8s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — use Reanimated `Easing.bezier(0.4, 0, 0.2, 1)`
- Delay: 0.3s
- Filter/glow: `drop-shadow(0 0 8px rgba(232,168,56,0.3))` — approximate with RN shadow

### Car Icon (inside gauge, centered)

- 46x46px SVG car (see prototype line 154 for exact paths)
- Animation: fade + scale (0.6 → 1), 0.5s ease-out, delay 0.7s
- Use Reanimated `FadeIn` + `ZoomIn` entering animation

### Props

```
onAnimationComplete?: () => void
```

---

## NightIllustration (`night-illustration.tsx`)

Full welcome screen illustration. Reference: `03-Effects-Patterns.md` lines 226-250, prototype line 166.

### Structure (SVG 300x240, viewBox 320x260)

1. **Road**: Converging perspective lines, stroke `rgba(136,153,174,0.05)`, width 65
2. **Lane markers**: 3 amber lines diminishing toward horizon (opacity 0.2 → 0.08)
3. **City skyline**: 4 rectangles, teal fill at 5% opacity
4. **Window lights**: 4 small 3x3px amber rectangles with pulsing opacity animation
5. **Car** (centered, translate 110,115):
   - Body: `#14202e` fill, `#1c2d4a` stroke
   - Windows: `rgba(20,184,166,0.07)` fill
   - Headlight: Animated amber circle + glow ellipse
   - Taillight: Rose circle, static
   - Wheels: 2 circles with rim detail
   - Roof line: Teal accent stroke
6. **Stars**: 2 dots with pulsing opacity

### Animations (Reanimated)

| Element | Animation | Duration | Type |
|---------|-----------|----------|------|
| Window lights (4x) | opacity 0.05 → 0.2 → 0.05 | 3-4s | withRepeat, infinite |
| Headlight | opacity 0.7 → 1 → 0.7 | 2s | withRepeat, infinite |
| Stars (2x) | opacity 0.1 → 0.4/0.5 → back | 3-4s | withRepeat, infinite |

### Props

```
(no props — self-contained)
```

---

## OtpInput (`otp-input.tsx`)

6-digit OTP input with auto-advance. Reference: prototype lines 118-126.

### Layout

- 6 input boxes in a row, 10px gap, centered
- Each box: 50x60px, radius 12px

### Box Styles

| State | Background | Border |
|-------|-----------|--------|
| Empty | `#0f1a2e` | `1.5px rgba(136,153,174,0.15)` |
| Focused | `rgba(20,184,166,0.03)` | `1.5px #14b8a6` + focus ring |
| Filled | `rgba(20,184,166,0.04)` | `1.5px rgba(20,184,166,0.3)` |

### Text: 24px, weight 700, `#e8ecf4`, centered

### Behavior

- On digit entry: auto-advance to next box
- On backspace with empty box: move focus to previous box, clear it
- On paste: distribute digits across all boxes
- Max 1 character per box, digits only

### Props

```
length?: number (default 6)
value: string
onChangeText: (code: string) => void
error?: boolean
```

---

## PasswordStrength (`password-strength.tsx`)

4-bar strength meter. Reference: prototype lines 137-143, 353-364.

### Layout

- 4 bars in a row, 4px gap, margin-top 8px
- Each bar: flex 1, height 3px, radius 2px
- Label below: 11px, margin-top 4px

### Strength Levels

| Level | Bars Lit | Color | Label |
|-------|----------|-------|-------|
| 0 | 0 | — | "Use letras, números e símbolos" (default) / "Digite sua nova senha" (reset) |
| 1 (Weak) | 1 | `#f43f5e` | "Fraca" |
| 2 (Fair) | 2 | `#f59e0b` | "Razoável" |
| 3 (Good) | 3 | `#14b8a6` | "Boa" |
| 4 (Strong) | 4 | `#10b981` | "Forte" |

### Calculation Rules

- 8+ characters: +1
- Has uppercase letter: +1
- Has digit: +1
- Has special character: +1

### Props

```
password: string
defaultLabel?: string
```

This component is pure UI — the `use-password-strength.ts` hook computes the level.

---

## SuccessCheck (`success-check.tsx`)

Animated checkmark with pulsing ring. Reference: `03-Effects-Patterns.md` lines 129-134, prototype lines 130-134.

### Structure

- Outer container: 88x88px, radius 50%
- Ring: inset -4px, 2px border, pulsing animation
- Checkmark: SVG polyline `20 6 9 17 4 12`, stroke-dasharray draw animation

### Variants

| Variant | Circle BG | Circle Border | Ring Border | Check Color |
|---------|----------|---------------|-------------|-------------|
| `teal` (register success) | `rgba(20,184,166,0.08)` | `rgba(20,184,166,0.2)` | `rgba(20,184,166,0.08)` | `#14b8a6` |
| `green` (password reset) | `rgba(16,185,129,0.1)` | `rgba(16,185,129,0.2)` | `rgba(16,185,129,0.08)` | `#10b981` |

### Animations (Reanimated)

- **Checkmark draw**: `strokeDashoffset` 40 → 0, 0.5s ease-out, 0.3s delay
- **Ring pulse**: scale 1 → 1.08, opacity 0.5 → 1, 2s ease-in-out, infinite repeat

### Props

```
variant: 'teal' | 'green'
```

---

## AuthDecorations (`auth-decorations.tsx`)

Ambient glows, floating particles, and gauge arcs. Reference: `03-Effects-Patterns.md` lines 38-98.

### Sub-components / Exported Elements

#### AmbientGlow

Positioned absolutely, large blurry circle with radial gradient.

| Variant | Size | Color | Position |
|---------|------|-------|----------|
| Teal (top-right) | 220-280px | `rgba(20,184,166,0.03-0.05)` | top: -40px, right: -60px |
| Amber (bottom-left) | 260-320px | `rgba(232,168,56,0.025-0.035)` | bottom: 60-80px, left: -80px |
| Center | 300-350px | varies | centered with translate -50% |

Animation: `translate(10px, -10px)` at 50%, 8-10s ease-in-out infinite.

#### FloatingParticles (Welcome only)

4 amber dots (2x2px), absolute positioned:

| # | Left | Top | Delay |
|---|------|-----|-------|
| 1 | 15% | 25% | 0s |
| 2 | 72% | 20% | 1.8s |
| 3 | 42% | 52% | 3.5s |
| 4 | 88% | 42% | 5s |

Animation: opacity 0→0.22→0, translateY 0→-70px, 7s ease-in-out infinite.

#### GaugeArc (Auth screens top-right decoration)

SVG 50x50px, opacity 0.06, positioned top: 68px, right: 22px.

| Screen | Outer Ring | Arc |
|--------|------------|-----|
| Login | Amber circle | Teal quarter-arc |
| Register | Teal circle | Amber half-arc |
| Forgot Password | Amber circle | Teal three-quarter-arc |
| New Password | Teal circle | Amber quarter-arc |

### Props

```
AmbientGlow: { variant: 'teal' | 'amber' | 'center', color?: string }
FloatingParticles: (no props)
GaugeArc: { screen: 'login' | 'register' | 'forgot' | 'newPassword' }
```

---

## Acceptance Criteria

- [ ] SplashGauge fills smoothly with gradient over 1.8s
- [ ] Car icon fades + scales in at 0.7s delay
- [ ] NightIllustration renders all elements with animated headlight/windows
- [ ] OtpInput auto-advances on digit entry
- [ ] OtpInput handles backspace to previous box
- [ ] PasswordStrength shows correct bars/label for each strength level
- [ ] SuccessCheck draws checkmark with animation
- [ ] SuccessCheck ring pulses continuously
- [ ] AmbientGlow floats with slow translate animation
- [ ] FloatingParticles drift upward with fade
- [ ] GaugeArc renders correct variant per screen
