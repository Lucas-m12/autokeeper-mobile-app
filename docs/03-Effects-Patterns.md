# AutoKeeper v2 — Effects & Patterns
## Shadows · Animations · Decorative Elements · Illustrations

---

## Shadow System

### Primary Button Shadow
```css
box-shadow: 0 4px 20px rgba(20,184,166,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
```
The inset highlight gives the button a "lit from above" feel. The teal glow reinforces the brand.

### Button Pressed Shadow
```css
box-shadow: 0 2px 10px rgba(20,184,166,0.2);
```

### Logo Icon Shadow
```css
box-shadow: 0 4px 14px rgba(20,184,166,0.25);
```

### Phone Frame Shadow (Prototype)
```css
box-shadow: 0 40px 100px rgba(0,0,0,0.6);
```

### Input Focus Ring
```css
box-shadow: 0 0 0 3px rgba(20,184,166,0.06);
```
Subtle teal outline on focus — not a harsh ring, a soft glow.

---

## Ambient Glows

Ambient glows create depth without cluttering the UI. They're large, blurry circles placed behind content.

### Teal Ambient Glow
```css
width: 280px; height: 280px;
border-radius: 50%;
background: radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%);
```
Placement: Top-right corner, offset -70px on both axes.

### Amber Ambient Glow
```css
width: 320px; height: 320px;
border-radius: 50%;
background: radial-gradient(circle, rgba(232,168,56,0.035) 0%, transparent 70%);
```
Placement: Bottom-left corner, offset -80px on both axes.

### Float Animation (Ambient Glows)
```css
@keyframes gFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}
animation: gFloat 8s ease-in-out infinite;
/* Reverse direction for the second glow, duration 10s */
```

---

## Particle System

Floating amber dots that drift upward. Used on the Welcome screen.

### Particle Element
```css
position: absolute;
width: 2px; height: 2px;
border-radius: 50%;
background: #e8a838;
```

### Particle Animation
```css
@keyframes particleFloat {
  0%   { opacity: 0; transform: translateY(0); }
  15%  { opacity: 0.22; }
  85%  { opacity: 0.22; }
  100% { opacity: 0; transform: translateY(-70px); }
}
animation: particleFloat 7s ease-in-out infinite;
```

### Placement (4 particles)
| # | Left | Top | Delay |
|---|------|-----|-------|
| 1 | 15% | 25% | 0s |
| 2 | 72% | 20% | 1.8s |
| 3 | 42% | 52% | 3.5s |
| 4 | 88% | 42% | 5s |

---

## Speed Lines (Splash)

Horizontal streaks that convey motion. Amber-tinted.

### Speed Line Element
```css
position: absolute;
height: 1px;
background: linear-gradient(90deg, transparent, rgba(232,168,56,0.12), transparent);
```

### Speed Line Animation
```css
@keyframes speedDash {
  from { transform: translateX(-100px); }
  to { transform: translateX(500px); }
}
```

### Placement (3 lines)
| # | Top | Width | Duration | Delay |
|---|-----|-------|----------|-------|
| 1 | 12px | 80px | 2.5s | 0s |
| 2 | 32px | 110px | 2s | 0.4s |
| 3 | 50px | 55px | 3s | 0.9s |

---

## Gauge Animation (Splash)

The signature splash element — a circular gauge that fills with the brand gradient.

### Gauge Structure
- SVG circle, radius 55, centered in 140x140 viewBox
- Rotated -90deg (starts from top)
- Background ring: `stroke: rgba(136,153,174,0.06)`, strokeWidth 4
- Fill ring: `stroke: url(#gaugeGradient)`, strokeWidth 4, strokeLinecap round

### Gauge Fill Animation
```css
stroke-dasharray: 345;
stroke-dashoffset: 345;
animation: gaugeFill 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
filter: drop-shadow(0 0 8px rgba(232,168,56,0.3));

@keyframes gaugeFill { to { stroke-dashoffset: 0; } }
```

### Gauge Gradient Stops
```
0%: #14b8a6 (teal)
50%: #e8a838 (amber)
100%: #f43f5e (rose)
```

---

## Gauge Decoration (Auth Screens)

Small, subtle gauge arcs in the top-right corner of auth screens.

### Properties
- Size: 50x50px
- Opacity: 0.06
- Position: `top: 68px, right: 22px`

### Login Variant
```svg
<circle r="28" stroke="#e8a838" strokeWidth="1" fill="none"/>
<path d="M30 6 A24 24 0 0 1 54 30" stroke="#14b8a6" strokeWidth="2"/>
```
Quarter-arc in teal, full ring in amber.

### Register Variant
```svg
<circle r="28" stroke="#14b8a6" strokeWidth="1" fill="none"/>
<path d="M30 6 A24 24 0 0 1 54 30 A24 24 0 0 1 30 54" stroke="#e8a838" strokeWidth="2"/>
```
Half-arc in amber, full ring in teal.

---

## Splash Sequence Timeline

| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Screen visible | — |
| 0.3s | Gauge ring | Begins filling (1.8s duration) |
| 0.7s | Car icon | Fade + scale in (0.5s) |
| 1.1s | "AutoKeeper" | Fade up (0.5s) |
| 1.4s | "CONTROLE VEICULAR" | Fade up (0.5s) |
| 1.5s | Speed lines | Fade in (0.5s) |
| 1.6s | Progress bar | Fade in (0.3s) |
| 1.8s | Progress bar fill | Begins filling (1.4s) |
| 2.6s | "Toque para continuar" | Fade up (0.4s) |

### Easing Functions
- Gauge fill: `cubic-bezier(0.4, 0, 0.2, 1)` — Material standard
- Fade/scale: `ease-out` — Quick deceleration
- Progress bar: `ease-in-out` — Smooth fill

---

## Screen Transitions

### Forward Navigation (e.g., Welcome → Login)
```css
/* Exiting screen */
opacity: 0; transform: translateX(-30px); /* slides left */
transition: opacity 0.45s ease, transform 0.45s ease;

/* Entering screen */
opacity: 1; transform: translateX(0); /* slides in from right */
transition: opacity 0.45s ease, transform 0.45s ease;
```

### Timing
- Exiting screen starts immediately
- Entering screen starts after 60ms delay
- Full transition: 460ms

---

## Night Illustration (Welcome)

The SVG illustration on the Welcome screen. Key elements:

### Road / Perspective
- Converging lines creating depth (vanishing point at center)
- Stroke: `rgba(136,153,174,0.05)`, width 65
- Amber lane markers diminishing toward horizon

### City Skyline
- Simple rectangles, `rgba(20,184,166,0.05)` fill
- Animated window lights: 3x3px amber rectangles with pulsing opacity

### Car
- Side view, centered on road
- Body: `#14202e` fill, `#1c2d4a` stroke
- Windows: `rgba(20,184,166,0.07)` fill (teal tint)
- Headlight: Animated amber circle (#e8a838) with glow ellipse
- Taillight: Rose (#f43f5e) static
- Wheels: Dark fill with subtle rim detail
- Roof line: Teal accent stroke

### Atmosphere
- Star/dot elements with pulsing opacity animations
- Headlight beam: Very subtle amber triangle

---

## Pattern: Status Icon Container

Used in reminder list items and dashboard cards.

```
┌────────────┐
│  38 × 38   │  Border Radius: 10px
│  [18px     │  Background: status color at 12% opacity
│   icon]    │  Icon: stroke = full status color
└────────────┘
```

| Status | BG | Icon Color |
|--------|----|------------|
| Warning | `rgba(245,158,11,0.12)` | `#f59e0b` |
| Info | `rgba(59,130,246,0.12)` | `#3b82f6` |
| Success | `rgba(16,185,129,0.12)` | `#10b981` |
| Error | `rgba(244,63,94,0.12)` | `#f43f5e` |

---

## Do / Don't

### Do
- Use ambient glows sparingly (max 2 per screen)
- Keep particles on welcome/splash only
- Use the gauge motif as a subtle decoration, never dominant
- Animate on entry, not continuously (except particles/ambient)
- Use teal for interactive feedback, amber for brand moments

### Don't
- No solid color backgrounds — always use the deep navy palette
- No pure black (#000000) except the notch
- No drop shadows on cards (use border only)
- No blur/glassmorphism (removed from v2 for simplicity)
- No gradient text (too complex for React Native)
- No animations longer than 2s (except ambient/particle loops)
- No more than 3 animated elements visible simultaneously
