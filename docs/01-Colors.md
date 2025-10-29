# 01 — Color Palette

**AutoKeeper Design System v1.0**

---

## 🎨 Color Philosophy

AutoKeeper uses a **dark, sophisticated palette** inspired by:
- Modern electric vehicle dashboards
- Premium automotive HUD displays
- Tech-forward interfaces
- Calm, trustworthy cyan accents (not aggressive)

---

## 🌈 Primary Colors

### Cyan (Primary Brand Color)

**Primary Cyan**
- **Hex:** `#06b6d4`
- **RGB:** `6, 182, 212`
- **Usage:** Primary buttons, primary actions, logo gradients, active states
- **React Native:** `#06b6d4`

**Cyan Light**
- **Hex:** `#22d3ee`
- **RGB:** `34, 211, 238`
- **Usage:** Links, hover states, lighter accents
- **React Native:** `#22d3ee`

**Cyan Lighter**
- **Hex:** `#67e8f9`
- **RGB:** `103, 232, 249`
- **Usage:** Hover states on links, subtle highlights
- **React Native:** `#67e8f9`

**Cyan Pale**
- **Hex:** `#a5f3fc`
- **RGB:** `165, 243, 252`
- **Usage:** Very subtle accents, gradient stops
- **React Native:** `#a5f3fc`

**Cyan Dark**
- **Hex:** `#0891b2`
- **RGB:** `8, 145, 178`
- **Usage:** Button gradient end, darker accent
- **React Native:** `#0891b2`

---

### Blue (Secondary Accent)

**Primary Blue**
- **Hex:** `#3b82f6`
- **RGB:** `59, 130, 246`
- **Usage:** Secondary accents, gradient pairs with cyan, glow orbs
- **React Native:** `#3b82f6`

**Blue Light**
- **Hex:** `#60a5fa`
- **RGB:** `96, 165, 250`
- **Usage:** Hover states, lighter blue accents
- **React Native:** `#60a5fa`

---

## ⚫ Background Colors

### Pure Backgrounds

**Background Black**
- **Hex:** `#0a0a0a`
- **RGB:** `10, 10, 10`
- **Usage:** Main app background (gradient start)
- **React Native:** `#0a0a0a`

**Background Dark**
- **Hex:** `#121212`
- **RGB:** `18, 18, 18`
- **Usage:** Main app background (gradient end), card backgrounds
- **React Native:** `#121212`

**Background Medium**
- **Hex:** `#1a1a1a`
- **RGB:** `26, 26, 26`
- **Usage:** Gradient middle, elevated surfaces
- **React Native:** `#1a1a1a`

### Surface Colors

**Surface Dark**
- **Hex:** `#1e1e1e` (opacity: 0.6)
- **RGB:** `30, 30, 30`
- **Usage:** Secondary buttons, input backgrounds (unfocused)
- **React Native:** `rgba(30, 30, 30, 0.6)`

**Surface Medium**
- **Hex:** `#282828` (opacity: 0.8)
- **RGB:** `40, 40, 40`
- **Usage:** Hover states on secondary elements, focused inputs
- **React Native:** `rgba(40, 40, 40, 0.8)`

**Card Background**
- **Hex:** `#121212` (opacity: 0.9)
- **RGB:** `18, 18, 18`
- **Usage:** Main card backgrounds with backdrop blur
- **React Native:** `rgba(18, 18, 18, 0.9)`

---

## 📝 Text Colors

### Primary Text

**Text White**
- **Hex:** `#ffffff`
- **RGB:** `255, 255, 255`
- **Usage:** Highest emphasis text, headings, button text
- **React Native:** `#ffffff`

**Text Light**
- **Hex:** `#f1f5f9`
- **RGB:** `241, 245, 249`
- **Usage:** Body text, high-priority content
- **React Native:** `#f1f5f9`

**Text Gray Light**
- **Hex:** `#d1d5db`
- **RGB:** `209, 213, 219`
- **Usage:** Secondary text, taglines, labels
- **React Native:** `#d1d5db`

### Secondary Text

**Text Gray**
- **Hex:** `#9ca3af`
- **RGB:** `156, 163, 175`
- **Usage:** Tertiary text, descriptions, subtitles
- **React Native:** `#9ca3af`

**Text Gray Medium**
- **Hex:** `#6b7280`
- **RGB:** `107, 114, 128`
- **Usage:** Placeholder text, disabled text
- **React Native:** `#6b7280`

**Text Gray Dark**
- **Hex:** `#475569`
- **RGB:** `71, 85, 105`
- **Usage:** Very low priority text, divider labels
- **React Native:** `#475569`

**Text Muted**
- **Hex:** `#64748b`
- **RGB:** `100, 116, 139`
- **Usage:** Footer text, legal copy
- **React Native:** `#64748b`

---

## 🎯 Semantic Colors

### Status Colors

**Success Green**
- **Hex:** `#10b981`
- **RGB:** `16, 185, 129`
- **Usage:** Success messages, completed reminders, checkmarks
- **React Native:** `#10b981`

**Warning Amber**
- **Hex:** `#f59e0b`
- **RGB:** `245, 158, 11`
- **Usage:** "Vencendo" status (30 days before), warnings
- **React Native:** `#f59e0b`

**Error Red**
- **Hex:** `#ef4444`
- **RGB:** `239, 68, 68`
- **Usage:** "Em atraso" status, errors, destructive actions
- **React Native:** `#ef4444`

**Info Blue**
- **Hex:** `#3b82f6`
- **RGB:** `59, 130, 246`
- **Usage:** Information messages, scheduled reminders
- **React Native:** `#3b82f6`

---

## 🔲 Border Colors

**Border Cyan**
- **Hex:** `#22d3ee` (opacity: 0.2)
- **RGB:** `34, 211, 238`
- **Usage:** Default borders on cards and buttons
- **React Native:** `rgba(34, 211, 238, 0.2)`

**Border Cyan Active**
- **Hex:** `#22d3ee` (opacity: 0.4-0.5)
- **RGB:** `34, 211, 238`
- **Usage:** Active/focused borders
- **React Native:** `rgba(34, 211, 238, 0.4)` or `rgba(34, 211, 238, 0.5)`

**Border White**
- **Hex:** `#ffffff` (opacity: 0.1)
- **RGB:** `255, 255, 255`
- **Usage:** Subtle inner borders (inset)
- **React Native:** `rgba(255, 255, 255, 0.1)`

---

## 🌟 Gradient Definitions

### Primary Gradient (Cyan)
```css
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
```
**Usage:** Primary buttons, CTAs, brand elements

### Logo Gradient
```css
background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
```
**Usage:** Logo icon background

### Text Gradient (Brand Name)
```css
background: linear-gradient(135deg, #ffffff 0%, #a5f3fc 50%, #22d3ee 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
**Usage:** Brand name, special headings

### Background Gradient
```css
background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #121212 100%);
```
**Usage:** App background

### Divider Gradient
```css
background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent);
```
**Usage:** Horizontal dividers, separators

---

## 📊 Opacity Scale

Use these opacity values consistently:

- **100%** (1.0) — Full opacity
- **90%** (0.9) — Card backgrounds
- **80%** (0.8) — Hover states
- **60%** (0.6) — Secondary surfaces
- **50%** (0.5) — Active borders
- **40%** (0.4) — Hover borders
- **20%** (0.2) — Default borders, subtle accents
- **15%** (0.15) — Very subtle glows
- **12%** (0.12) — Background orbs
- **10%** (0.1) — Inner borders, very subtle highlights
- **8%** (0.08) — Extremely subtle glows
- **3%** (0.03) — Background patterns

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA)

**Text on Dark Backgrounds:**
- White (`#ffffff`) on Black (`#0a0a0a`): **21:1** ✅ AAA
- Light Gray (`#f1f5f9`) on Black (`#0a0a0a`): **19.3:1** ✅ AAA
- Gray (`#9ca3af`) on Black (`#0a0a0a`): **9.8:1** ✅ AAA

**Interactive Elements:**
- Cyan (`#06b6d4`) on Black (`#0a0a0a`): **6.9:1** ✅ AA
- Cyan (`#22d3ee`) on Black (`#0a0a0a`): **8.4:1** ✅ AAA

**Status Colors:**
- Success Green (`#10b981`) on Black: **5.8:1** ✅ AA
- Warning Amber (`#f59e0b`) on Black: **7.1:1** ✅ AAA
- Error Red (`#ef4444`) on Black: **4.8:1** ✅ AA

All primary text and interactive elements meet **WCAG AA standards** (4.5:1 minimum).

---

## 🎨 Color Naming Convention

When naming colors in code:

```javascript
// React Native / Expo
const colors = {
  // Primary
  primary: '#06b6d4',
  primaryLight: '#22d3ee',
  primaryDark: '#0891b2',
  
  // Background
  bgBlack: '#0a0a0a',
  bgDark: '#121212',
  bgMedium: '#1a1a1a',
  
  // Surface
  surfaceDark: 'rgba(30, 30, 30, 0.6)',
  surfaceMedium: 'rgba(40, 40, 40, 0.8)',
  cardBg: 'rgba(18, 18, 18, 0.9)',
  
  // Text
  textWhite: '#ffffff',
  textLight: '#f1f5f9',
  textGray: '#9ca3af',
  textMuted: '#64748b',
  
  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Border
  borderCyan: 'rgba(34, 211, 238, 0.2)',
  borderCyanActive: 'rgba(34, 211, 238, 0.4)',
  borderWhite: 'rgba(255, 255, 255, 0.1)',
};
```

---

## 🚫 Don't Use

**Avoid these colors:**
- Pure white backgrounds (`#ffffff`) — Too harsh
- Aggressive oranges/reds as primary — Too aggressive
- Bright neon colors — Not premium
- Low contrast combinations — Accessibility fail
- Saturated colors on dark backgrounds — Eye strain

---

## ✅ Usage Examples

### Primary Button
- Background: Cyan Gradient
- Text: White
- Border: Cyan (0.2 opacity) inset
- Shadow: Cyan glow

### Secondary Button
- Background: Surface Dark
- Text: Text Light
- Border: Cyan (0.2 opacity)
- Hover: Surface Medium, Border Cyan (0.4 opacity)

### Card
- Background: Card Background (0.9 opacity)
- Border: Cyan (0.2 opacity)
- Text: Text Light (body), Text Gray (secondary)

### Status Badge "Vencendo"
- Background: Warning Amber (0.15 opacity)
- Text: Warning Amber
- Border: Warning Amber (0.3 opacity)

---

**Next:** See [02-Typography.md](./02-Typography.md) for text styling guidelines.
