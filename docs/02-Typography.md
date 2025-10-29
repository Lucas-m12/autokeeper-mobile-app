# 02 — Typography

**AutoKeeper Design System v1.0**

---

## 📖 Typography Philosophy

AutoKeeper uses **system default fonts** for optimal performance and native feel on both iOS and Android. The typographic hierarchy emphasizes clarity, readability, and a modern, premium aesthetic.

---

## 🔤 Font Families

### Primary Font Stack

**System Default**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

**React Native:**
```javascript
fontFamily: 'System' // Let React Native use the system default
```

This automatically uses:
- **iOS:** San Francisco (SF Pro)
- **Android:** Roboto
- **Web:** System default fallback

### Why System Fonts?

- ✅ Native feel on each platform
- ✅ No custom font loading (faster)
- ✅ Excellent readability
- ✅ Professional, clean aesthetic
- ✅ Matches OS conventions

---

## 📏 Type Scale

**Base Size:** 16px  
**Scale Ratio:** 1.25 (Major Third)

### Scale Reference

| Name | Size (px) | Size (pt) | React Native | Usage |
|------|-----------|-----------|--------------|-------|
| **xs** | 13px | 13pt | 13 | Very small text, legal copy |
| **sm** | 14px | 14pt | 14 | Labels, secondary text, captions |
| **base** | 16px | 16pt | 16 | Body text, default size |
| **lg** | 18px | 18pt | 18 | Emphasized body, large labels |
| **xl** | 20px | 20pt | 20 | Small headings, card titles |
| **2xl** | 24px | 24pt | 24 | Section headings |
| **3xl** | 28px | 28pt | 28 | Page headings, brand name (login) |
| **4xl** | 32px | 32pt | 32 | Hero text, brand name (welcome) |

---

## ⚖️ Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| **Regular** | 400 | Body text, default |
| **Medium** | 500 | Labels, taglines, emphasis |
| **Semibold** | 600 | Buttons, important labels |
| **Bold** | 700 | Headings, brand name, CTAs |

**React Native:**
```javascript
fontWeight: '400' // Regular
fontWeight: '500' // Medium
fontWeight: '600' // Semibold
fontWeight: '700' // Bold
```

---

## 📐 Line Height

| Context | Line Height | Usage |
|---------|-------------|-------|
| **Tight** | 1.2 | Large headings (28px+) |
| **Snug** | 1.375 | Small headings (20-24px) |
| **Normal** | 1.5 | Body text (16-18px) |
| **Relaxed** | 1.6 | Descriptions, long-form text |

**React Native:**
```javascript
lineHeight: fontSize * 1.5 // For body text
```

---

## 🎯 Typography Styles

### Headings

**H1 — Page Title**
- **Size:** 32px (4xl)
- **Weight:** 700 (Bold)
- **Line Height:** 1.2
- **Color:** `textWhite` or gradient
- **Letter Spacing:** -0.5px
- **Usage:** Brand name (welcome), main page titles
```javascript
{
  fontSize: 32,
  fontWeight: '700',
  lineHeight: 38.4, // 32 * 1.2
  letterSpacing: -0.5,
  color: colors.textWhite
}
```

**H2 — Section Title**
- **Size:** 28px (3xl)
- **Weight:** 700 (Bold)
- **Line Height:** 1.2
- **Color:** `textWhite` or gradient
- **Letter Spacing:** -0.5px
- **Usage:** Brand name (login), section headings
```javascript
{
  fontSize: 28,
  fontWeight: '700',
  lineHeight: 33.6,
  letterSpacing: -0.5,
  color: colors.textWhite
}
```

**H3 — Card Title**
- **Size:** 20px (xl)
- **Weight:** 600 (Semibold)
- **Line Height:** 1.375
- **Color:** `textWhite`
- **Usage:** Card titles, modal headers
```javascript
{
  fontSize: 20,
  fontWeight: '600',
  lineHeight: 27.5,
  color: colors.textWhite
}
```

---

### Body Text

**Body Large**
- **Size:** 18px (lg)
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** `textLight`
- **Usage:** Emphasized paragraphs
```javascript
{
  fontSize: 18,
  fontWeight: '400',
  lineHeight: 27,
  color: colors.textLight
}
```

**Body (Default)**
- **Size:** 16px (base)
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** `textLight`
- **Usage:** Default body text, descriptions
```javascript
{
  fontSize: 16,
  fontWeight: '400',
  lineHeight: 24,
  color: colors.textLight
}
```

**Body Small**
- **Size:** 14px (sm)
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** `textGray`
- **Usage:** Secondary descriptions, captions
```javascript
{
  fontSize: 14,
  fontWeight: '400',
  lineHeight: 21,
  color: colors.textGray
}
```

---

### Labels & UI Text

**Tagline / Subtitle**
- **Size:** 16px (base)
- **Weight:** 500 (Medium)
- **Line Height:** 1.5
- **Color:** `textGrayLight`
- **Usage:** "Mantenha seus veículos em dia", "Bem-vindo de volta!"
```javascript
{
  fontSize: 16,
  fontWeight: '500',
  lineHeight: 24,
  color: colors.textGrayLight
}
```

**Label**
- **Size:** 14px (sm)
- **Weight:** 500 (Medium)
- **Line Height:** 1.5
- **Color:** `textGrayLight`
- **Usage:** Form labels, input labels
```javascript
{
  fontSize: 14,
  fontWeight: '500',
  lineHeight: 21,
  color: colors.textGrayLight
}
```

**Button Text**
- **Size:** 16px (base)
- **Weight:** 600 (Semibold)
- **Line Height:** 1.5
- **Color:** `textWhite`
- **Usage:** All button text
```javascript
{
  fontSize: 16,
  fontWeight: '600',
  lineHeight: 24,
  color: colors.textWhite
}
```

**Caption / Helper**
- **Size:** 13px (xs)
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** `textMuted`
- **Usage:** Footer text, legal copy, helper text
```javascript
{
  fontSize: 13,
  fontWeight: '400',
  lineHeight: 19.5,
  color: colors.textMuted
}
```

---

### Links

**Link**
- **Size:** Inherits from context
- **Weight:** 500-600 (Medium to Semibold)
- **Color:** `primaryLight` (#22d3ee)
- **Hover:** `primaryLighter` (#67e8f9)
- **Underline:** None by default, underline on hover (optional)
```javascript
{
  fontSize: 14, // or inherit
  fontWeight: '500',
  color: colors.primaryLight,
  textDecorationLine: 'none'
}
```

---

### Input Text

**Input Text (Filled)**
- **Size:** 16px (base)
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** `textLight`
```javascript
{
  fontSize: 16,
  fontWeight: '400',
  lineHeight: 24,
  color: colors.textLight
}
```

**Input Placeholder**
- **Size:** 16px (base)
- **Weight:** 400 (Regular)
- **Color:** `textGrayMedium` (#6b7280)
```javascript
{
  fontSize: 16,
  fontWeight: '400',
  color: colors.textGrayMedium
}
```

---

## 🎨 Special Text Styles

### Gradient Text (Brand)

Used for brand name on welcome/login screens:

```javascript
// React Native (requires react-native-linear-gradient or MaskedView)
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

<MaskedView
  maskElement={
    <Text style={{ fontSize: 32, fontWeight: '700' }}>
      AutoKeeper
    </Text>
  }
>
  <LinearGradient
    colors={['#ffffff', '#a5f3fc', '#22d3ee']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <Text style={{ fontSize: 32, fontWeight: '700', opacity: 0 }}>
      AutoKeeper
    </Text>
  </LinearGradient>
</MaskedView>
```

**CSS (Web):**
```css
background: linear-gradient(135deg, #ffffff 0%, #a5f3fc 50%, #22d3ee 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 📊 Hierarchy Examples

### Login/Welcome Screen

```
AutoKeeper          → H1 (32px, bold, gradient)
Bem-vindo de volta! → Tagline (16px, medium, textGrayLight)
E-mail              → Label (14px, medium, textGrayLight)
seu@email.com.br    → Input (16px, regular, textLight)
Entrar              → Button (16px, semibold, white)
Não tem uma conta?  → Caption (14px, regular, textMuted)
Criar conta         → Link (14px, semibold, primaryLight)
```

### Dashboard Screen

```
Meus Veículos       → H2 (24px, bold, textWhite)
IPVA Vence em 15d   → Card Title (18px, semibold, textWhite)
Vencendo            → Badge (13px, medium, warning)
Honda Civic 2020    → Body (16px, regular, textLight)
Ver detalhes        → Link (14px, medium, primaryLight)
```

---

## ♿ Accessibility

### Minimum Sizes

- **Body text minimum:** 16px (preferred)
- **Small text minimum:** 14px (use sparingly)
- **Button text minimum:** 16px (always)
- **Legal/footer text:** 13px (acceptable)

### Contrast

All text colors meet WCAG AA standards when used on specified backgrounds (see `01-Colors.md`).

### Dynamic Type Support

For iOS/Android, support system font scaling:

```javascript
// React Native
import { Text } from 'react-native';

// Text automatically scales with system settings
<Text style={{ fontSize: 16 }}>Scales with system</Text>

// To disable scaling (use sparingly)
<Text allowFontScaling={false}>Fixed size</Text>
```

---

## 🚫 Don't Use

- ❌ Font sizes smaller than 13px (except icons)
- ❌ Font weights lighter than 400 (too thin on dark)
- ❌ ALL CAPS for long text (hard to read)
- ❌ Mixing too many font sizes in one component
- ❌ Line heights < 1.2 for body text
- ❌ Tight letter spacing on small text

---

## ✅ Best Practices

1. **Use the scale** — Stick to defined sizes
2. **Limit weights** — Use 3-4 weights max (400, 500, 600, 700)
3. **Consistent hierarchy** — H1 > H2 > H3 > Body
4. **Adequate contrast** — Use approved color combinations
5. **Proper line height** — Never less than 1.2x font size
6. **Left-align Portuguese** — Right-align only for numbers/dates
7. **Test at small sizes** — Ensure readability on 360px screens

---

## 📱 React Native Implementation

### Create a Typography Hook

```javascript
// hooks/useTypography.js
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38.4,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 33.6,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 27.5,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  link: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
};

// Usage in components
import { typography } from './hooks/useTypography';

<Text style={[typography.h1, { color: colors.textWhite }]}>
  AutoKeeper
</Text>
```

---

**Next:** See [03-Spacing-Layout.md](./03-Spacing-Layout.md) for spacing and layout guidelines.
