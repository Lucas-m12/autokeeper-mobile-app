# 03 — Spacing & Layout

**AutoKeeper Design System v1.0**

---

## 📏 Spacing Philosophy

AutoKeeper uses a **4px-based spacing scale** for consistent, predictable layouts. This ensures visual harmony and makes development faster with reusable spacing tokens.

---

## 📐 Spacing Scale

**Base Unit:** 4px

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Minimal spacing, icon padding |
| `sm` | 8px | Tight spacing, form field gaps |
| `md` | 12px | Default gap between related elements |
| `lg` | 16px | Standard padding, button padding |
| `xl` | 20px | Larger spacing between sections |
| `2xl` | 24px | Card padding (mobile), section spacing |
| `3xl` | 32px | Card padding (desktop), large section gaps |
| `4xl` | 40px | Extra large spacing |
| `5xl` | 48px | Major section breaks |
| `6xl` | 64px | Hero sections, major breaks |

### React Native Implementation

```javascript
// constants/spacing.js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

// Usage
<View style={{ padding: spacing.lg, gap: spacing.md }}>
  {/* Content */}
</View>
```

---

## 📱 Container & Padding

### Screen Padding

**Mobile (< 480px)**
- **Horizontal:** 24px (`2xl`)
- **Vertical:** 24px (`2xl`)

**Tablet / Large (≥ 480px)**
- **Horizontal:** 32px (`3xl`)
- **Vertical:** 32px (`3xl`)

```javascript
// Layout wrapper
<View style={{
  paddingHorizontal: spacing['2xl'], // 24px
  paddingVertical: spacing['2xl'],   // 24px
}}>
  {/* Screen content */}
</View>
```

### Card Padding

**Standard Card**
- **Mobile:** 24px all sides (`2xl`)
- **Desktop:** 32px all sides (`3xl`)

**Compact Card**
- **All sizes:** 16px all sides (`lg`)

```javascript
// Card
<View style={{
  padding: spacing['2xl'], // 24px on mobile
  // padding: spacing['3xl'], // 32px on desktop
}}>
  {/* Card content */}
</View>
```

---

## 📦 Component Spacing

### Button Spacing

**Padding:**
- **Horizontal:** 24px (`2xl`)
- **Vertical:** 16px (`lg`)
- **Total height:** ~56px (16 + 24 + 16)

**Gap between buttons:**
- **Vertical stack:** 12px (`md`)

```javascript
<View style={{ gap: spacing.md }}>
  <Pressable style={{
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
  }}>
    <Text>Button</Text>
  </Pressable>
  <Pressable style={{
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
  }}>
    <Text>Button</Text>
  </Pressable>
</View>
```

### Form Spacing

**Label to Input:**
- **Gap:** 8px (`sm`)

**Between Form Groups:**
- **Gap:** 20px (`xl`)

**Input Padding:**
- **Horizontal:** 16px (`lg`)
- **Vertical:** 14px (custom, between `md` and `lg`)

```javascript
<View style={{ gap: spacing.xl }}>
  {/* Form Group 1 */}
  <View style={{ gap: spacing.sm }}>
    <Text>Label</Text>
    <TextInput style={{
      paddingHorizontal: spacing.lg,
      paddingVertical: 14,
    }} />
  </View>
  
  {/* Form Group 2 */}
  <View style={{ gap: spacing.sm }}>
    <Text>Label</Text>
    <TextInput style={{
      paddingHorizontal: spacing.lg,
      paddingVertical: 14,
    }} />
  </View>
</View>
```

### List Item Spacing

**Between list items:**
- **Tight:** 8px (`sm`)
- **Default:** 12px (`md`)
- **Comfortable:** 16px (`lg`)

**List item padding:**
- **Horizontal:** 16px (`lg`)
- **Vertical:** 12px (`md`)

---

## 🎯 Section Spacing

### Between Sections

**Small break:**
- **Gap:** 24px (`2xl`)
- **Usage:** Between related sections (e.g., logo to form)

**Medium break:**
- **Gap:** 32px (`3xl`)
- **Usage:** Between major sections (e.g., form to divider)

**Large break:**
- **Gap:** 48px (`5xl`)
- **Usage:** Between distinct content areas

### Logo Section (Login/Welcome)

```javascript
<View style={{ marginBottom: spacing['5xl'] }}> // 48px
  <View style={{ marginBottom: spacing.xl }}> // 20px
    {/* Logo Icon */}
  </View>
  <Text>{/* Brand Name */}</Text>
  <Text>{/* Tagline */}</Text>
  <Text>{/* Subtitle */}</Text>
</View>
```

---

## 📐 Border Radius

**Consistent rounded corners:**

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | Small chips, tags |
| `md` | 12px | Inputs, small buttons |
| `lg` | 16px | Standard buttons, cards (small) |
| `xl` | 20px | Logo icon, larger cards |
| `2xl` | 24px | Cards (mobile) |
| `3xl` | 32px | Cards (desktop), modals |
| `full` | 9999px | Circular elements, pills |

```javascript
// constants/borderRadius.js
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Usage
<View style={{
  borderRadius: borderRadius.lg, // 16px buttons
}}>
  {/* Content */}
</View>
```

---

## 📱 Grid System

### Mobile-First Approach

**Primary breakpoint:** 390px (iPhone 14 Pro)  
**Minimum support:** 360px (small Android)  
**Maximum card width:** 420px (with 24px side padding)

### Responsive Breakpoints

| Device | Width | Padding | Max Content Width |
|--------|-------|---------|-------------------|
| **Small Mobile** | 360px | 20px | 320px |
| **Mobile** | 390px | 24px | 342px |
| **Large Mobile** | 428px | 24px | 380px |
| **Tablet** | 768px+ | 32px | 420px (centered) |

### Layout Patterns

**Single Column (Default)**
- Full width with padding
- Max width: 420px (centered on tablet)

```javascript
<View style={{
  width: '100%',
  maxWidth: 420,
  paddingHorizontal: spacing['2xl'],
  marginHorizontal: 'auto', // Center on large screens
}}>
  {/* Content */}
</View>
```

**Two Column (Future - Tablet)**
- Split at 768px
- Gap: 24px (`2xl`)
- Equal width columns

---

## 🎨 Safe Areas

### iOS Safe Area

Always respect safe areas for notch/home indicator:

```javascript
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1 }}>
  {/* Content automatically avoids notch/home indicator */}
</SafeAreaView>
```

### Android System Bars

Use `StatusBar` component:

```javascript
import { StatusBar } from 'react-native';

<>
  <StatusBar
    barStyle="light-content" // White icons on dark background
    backgroundColor="#0a0a0a" // Match app background
  />
  {/* Content */}
</>
```

---

## 📏 Component Dimensions

### Button Heights

**Primary/Secondary Buttons:**
- **Height:** 56px (with padding: 16px top + 24px text line-height + 16px bottom)
- **Min Width:** 120px
- **Max Width:** 100% (full width in forms)

**Small Buttons:**
- **Height:** 40px
- **Padding:** 12px vertical, 16px horizontal

### Input Heights

**Standard Input:**
- **Height:** 52px (with padding: 14px top + 24px line-height + 14px bottom)
- **Min Width:** 200px
- **Full Width:** Preferred in forms

### Card Dimensions

**Reminder Card:**
- **Min Height:** 80px
- **Width:** Full width minus padding
- **Padding:** 16px all sides

**Vehicle Card:**
- **Min Height:** 120px
- **Width:** Full width minus padding
- **Padding:** 20px all sides

---

## 🔲 Icon Sizing

| Size | Dimension | Usage |
|------|-----------|-------|
| **xs** | 16×16px | Inline icons, badges |
| **sm** | 20×20px | Small buttons, list items |
| **md** | 24×24px | Standard buttons, inputs |
| **lg** | 32×32px | Card headers, nav icons |
| **xl** | 40×40px | Logo (small), feature icons |
| **2xl** | 64×64px | Logo (large) |

```javascript
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 64,
};
```

---

## 📐 Aspect Ratios

### Logo
- **Ratio:** 1:1 (square)
- **Sizes:** 64×64px (login), 72×72px (welcome)

### Vehicle Type Icons
- **Ratio:** 1:1 (square)
- **Size:** 48×48px

### Status Badges
- **Ratio:** Variable (auto-width)
- **Height:** 24px
- **Padding:** 6px vertical, 12px horizontal

---

## ✅ Spacing Checklist

When creating a new screen:

- [ ] Use spacing tokens (no arbitrary values)
- [ ] Screen padding: 24px horizontal minimum
- [ ] Card padding: 24px on mobile, 32px on desktop
- [ ] Button height: 56px (with proper padding)
- [ ] Input height: 52px (with proper padding)
- [ ] Gap between buttons: 12px
- [ ] Gap between form groups: 20px
- [ ] Section breaks: 24-48px
- [ ] Respect safe areas (iOS notch, Android bars)
- [ ] Test at 360px (minimum) and 390px (primary)

---

## 🚫 Don't Use

- ❌ Arbitrary spacing values (e.g., 13px, 27px)
- ❌ Inconsistent padding within similar components
- ❌ Touching screen edges (always add padding)
- ❌ Too tight spacing (< 8px between interactive elements)
- ❌ Different border radius values for similar components
- ❌ Fixed heights without accounting for dynamic content

---

## ✅ Best Practices

1. **Use tokens** — Always use spacing scale, never arbitrary values
2. **Be consistent** — Same spacing for similar elements
3. **Think mobile-first** — Design for 390px, scale up
4. **Test small screens** — Verify 360px works
5. **Respect safe areas** — Use SafeAreaView on iOS
6. **Add breathing room** — Don't cram content
7. **Align to 4px grid** — All dimensions divisible by 4
8. **Use gap property** — Modern React Native supports gap in Flexbox

---

## 📱 React Native Gap Property

Modern React Native (≥0.71) supports Flexbox `gap`:

```javascript
// Old way (still works)
<View>
  <View style={{ marginBottom: spacing.md }}>
    <Text>Item 1</Text>
  </View>
  <View>
    <Text>Item 2</Text>
  </View>
</View>

// New way (preferred)
<View style={{ gap: spacing.md }}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>

// Row with gap
<View style={{ flexDirection: 'row', gap: spacing.sm }}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

---

**Next:** See [04-Components.md](./04-Components.md) for component specifications.
