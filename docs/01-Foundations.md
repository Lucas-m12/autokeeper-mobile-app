# AutoKeeper v2 — Foundations
## Colors · Typography · Spacing · Layout

---

## Color Philosophy: "Noite na Estrada"

The warmth of a car dashboard at night. Deep navy backgrounds with depth, not flat black. A dual-accent system — **teal for actions**, **amber for brand identity** — that immediately reads as automotive.

---

## Color Palette

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-amber` | `#e8a838` | Logo accent, brand marks, "Keeper" text, forgot password links |
| `brand-amber-light` | `#f0c060` | Hover state on amber elements |
| `brand-amber-glow` | `rgba(232,168,56,0.15)` | Amber icon backgrounds, subtle amber surfaces |

### Action Colors (Teal)

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-teal` | `#14b8a6` | Primary buttons, links, active states, focus rings |
| `accent-teal-light` | `#2dd4bf` | Hover on teal elements |
| `accent-teal-dark` | `#0d9488` | Gradient end for primary buttons, pressed states |
| `accent-teal-glow` | `rgba(20,184,166,0.12)` | Teal icon backgrounds, subtle teal surfaces |

### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-deep` | `#060a14` | App background, splash screen |
| `bg-base` | `#0b1120` | Main content background |
| `bg-surface` | `#111d33` | Elevated surfaces, social buttons, back button |
| `bg-card` | `#162036` | Card backgrounds, hover on surfaces |
| `bg-input` | `#0f1a2e` | Input fields, checkbox backgrounds |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#e8ecf4` | Headings, body text, primary content |
| `text-secondary` | `#8899ae` | Subtitles, descriptions, labels |
| `text-muted` | `#556677` | Placeholders on dark bg, footer text, hints |
| `text-placeholder` | `#3d5068` | Input placeholder text |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `border-subtle` | `rgba(136,153,174,0.1)` | Back button borders, light separators |
| `border-input` | `rgba(136,153,174,0.15)` | Input borders, outline buttons, social buttons |
| `border-focus` | `rgba(20,184,166,0.4)` | Focus state borders, active elements |

### Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `status-success` | `#10b981` | Completed, OK status |
| `status-warning` | `#f59e0b` | "Vencendo" status, approaching deadlines |
| `status-error` | `#f43f5e` | "Atrasado" status, errors, taillights (rose-500) |
| `status-info` | `#3b82f6` | "Agendado" status, informational |

### Status Background Colors (15% opacity)

| Token | Value | Usage |
|-------|-------|-------|
| `status-success-bg` | `rgba(16,185,129,0.15)` | Success badge/icon background |
| `status-warning-bg` | `rgba(245,158,11,0.15)` | Warning badge/icon background |
| `status-error-bg` | `rgba(244,63,94,0.15)` | Error badge/icon background |
| `status-info-bg` | `rgba(59,130,246,0.15)` | Info badge/icon background |

---

## Gradients

### Primary Button Gradient
```css
background: linear-gradient(135deg, #14b8a6, #0d9488);
```

### Logo Icon Gradient
```css
background: linear-gradient(135deg, #0d9488, #14b8a6);
```

### Gauge Gradient (Splash)
```css
/* SVG linearGradient */
#14b8a6 (0%) → #e8a838 (50%) → #f43f5e (100%)
```

### Progress Bar Gradient
```css
background: linear-gradient(90deg, #14b8a6, #e8a838);
```

### App Background
```css
background: radial-gradient(ellipse at 50% 38%, #0f1d35 0%, #060a14 70%);
```

### Divider Line
```css
background: linear-gradient(90deg, transparent, rgba(136,153,174,0.1), transparent);
```

---

## Typography

### Font Stack

```css
font-family: 'Avenir Next', Montserrat, 'Segoe UI', system-ui, -apple-system, sans-serif;
```

**Why this stack:**
- Avenir Next: Geometric, modern, premium feel (available on iOS/macOS)
- Montserrat: Similar geometry on Android/Windows
- System fallbacks for maximum compatibility

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display` | 30px | 700 | 1.2 | -0.5px | Splash brand name |
| `h1` | 27px | 700 | 1.2 | -0.5px | Welcome heading |
| `h2` | 25px | 700 | 1.2 | -0.5px | Auth screen titles |
| `h3` | 20px | 700 | 1.3 | -0.3px | Card titles, section headers |
| `body` | 15px | 400 | 1.6 | 0 | Descriptions, paragraphs |
| `button` | 16px | 600 | 1.0 | 0 | All button text |
| `label` | 11px | 700 | 1.4 | 0.8px | Form labels (UPPERCASE) |
| `caption` | 13px | 400 | 1.5 | 0 | Helper text, hints |
| `small` | 12px | 400 | 1.6 | 0 | Terms, legal text |
| `tagline` | 11px | 600 | 1.4 | 3.5px | Uppercase taglines (UPPERCASE) |
| `link` | 14px | 600 | 1.5 | 0 | Footer links, navigation |
| `social` | 14px | 500 | 1.0 | 0 | Social button text |
| `status` | 14px | 600 | 1.0 | 0 | Footer action links |

### Text Color Pairings

| Context | Color Token |
|---------|-------------|
| Headings (h1, h2, h3) | `text-primary` (#e8ecf4) |
| Body text, descriptions | `text-secondary` (#8899ae) |
| Form labels | `text-secondary` (#8899ae) |
| Input text (typed) | `text-primary` (#e8ecf4) |
| Input placeholder | `text-placeholder` (#3d5068) |
| Footer text, hints | `text-muted` (#556677) |
| Links (teal) | `accent-teal` (#14b8a6) |
| Links (amber) | `brand-amber` (#e8a838) |
| Brand "Keeper" | `brand-amber` (#e8a838) |
| Button text | `#ffffff` |

### Special: Brand Name Split

"Auto" renders in `text-primary`, "Keeper" renders in `brand-amber`. Always bold (700). This split is the core visual identity.

---

## Spacing Scale

**Base unit: 4px**

| Token | Value | Usage |
|-------|-------|-------|
| `2xs` | 4px | Minimal gaps |
| `xs` | 6px | Badge padding vertical, tight gaps |
| `sm` | 8px | Label-to-input gap, icon gaps |
| `md` | 12px | Button gap, card content gaps |
| `lg` | 14px | Input padding vertical, section margins |
| `xl` | 16px | Form group bottom margin, card padding |
| `2xl` | 20px | Auth body padding top |
| `3xl` | 22px | Icon-to-title margin, form extras margin |
| `4xl` | 24px | Auth header horizontal padding |
| `5xl` | 26px | Auth subtitle bottom margin |
| `6xl` | 28px | Welcome heading bottom margin, welcome description bottom |
| `7xl` | 30px | Auth body horizontal padding, welcome bottom horizontal |
| `8xl` | 38px | Auth footer bottom padding |
| `9xl` | 44px | Welcome bottom section padding bottom |
| `10xl` | 54px | Status bar height, auth top padding |

### Screen Padding

| Context | Horizontal | Vertical Top | Vertical Bottom |
|---------|-----------|--------------|-----------------|
| Welcome bottom | 30px | 0 | 44px |
| Auth body | 30px | 16px | — |
| Auth header | 24px | 8px | 0 |
| Auth footer | 30px | 14px | 38px |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 5px | Checkbox |
| `md` | 9px | Logo icon (small) |
| `lg` | 10px | Inputs, social buttons |
| `xl` | 12px | Back button, auth decorative icon |
| `2xl` | 14px | Buttons (primary, outline) |
| `3xl` | 20px | Cards (future) |
| `4xl` | 48px | Phone frame (prototype only) |
| `full` | 50% | Ambient glows, particles |

---

## Layout

### Primary Frame
- Width: 390px (iPhone 14 Pro reference)
- Min support: 360px
- Centering: `margin: 0 auto` on larger screens

### Safe Areas
- Top: 54px (status bar + notch clearance)
- Bottom: 38-44px (home indicator clearance)

### Content Max Width
- Forms: full width minus 60px (30px padding each side)
- Effective content width: 330px on 390px screen

---

## React Native Token Export

```javascript
export const colors = {
  brand: { amber: '#e8a838', amberLight: '#f0c060', amberGlow: 'rgba(232,168,56,0.15)' },
  accent: { teal: '#14b8a6', tealLight: '#2dd4bf', tealDark: '#0d9488', tealGlow: 'rgba(20,184,166,0.12)' },
  bg: { deep: '#060a14', base: '#0b1120', surface: '#111d33', card: '#162036', input: '#0f1a2e' },
  text: { primary: '#e8ecf4', secondary: '#8899ae', muted: '#556677', placeholder: '#3d5068' },
  border: { subtle: 'rgba(136,153,174,0.1)', input: 'rgba(136,153,174,0.15)', focus: 'rgba(20,184,166,0.4)' },
  status: { success: '#10b981', warning: '#f59e0b', error: '#f43f5e', info: '#3b82f6' },
};

export const spacing = { '2xs':4, xs:6, sm:8, md:12, lg:14, xl:16, '2xl':20, '3xl':22, '4xl':24, '5xl':26, '6xl':28, '7xl':30 };

export const radius = { sm:5, md:9, lg:10, xl:12, '2xl':14, '3xl':20, full:9999 };

export const typography = {
  display:  { fontSize:30, fontWeight:'700', lineHeight:36, letterSpacing:-0.5 },
  h1:       { fontSize:27, fontWeight:'700', lineHeight:32.4, letterSpacing:-0.5 },
  h2:       { fontSize:25, fontWeight:'700', lineHeight:30, letterSpacing:-0.5 },
  h3:       { fontSize:20, fontWeight:'700', lineHeight:26, letterSpacing:-0.3 },
  body:     { fontSize:15, fontWeight:'400', lineHeight:24 },
  button:   { fontSize:16, fontWeight:'600', lineHeight:16 },
  label:    { fontSize:11, fontWeight:'700', lineHeight:15.4, letterSpacing:0.8, textTransform:'uppercase' },
  caption:  { fontSize:13, fontWeight:'400', lineHeight:19.5 },
  small:    { fontSize:12, fontWeight:'400', lineHeight:19.2 },
  link:     { fontSize:14, fontWeight:'600', lineHeight:21 },
};
```
