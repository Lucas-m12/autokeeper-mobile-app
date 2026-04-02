# Epic 1 — Shared UI Components

All components live in `src/components/`. Each component follows the design system specs from `docs/02-Components.md`.

---

## Button (`button.tsx`)

A single component with variant prop. Reference: `02-Components.md` lines 8-96.

### Variants

| Variant | Height | Radius | Background | Text Color | Border |
|---------|--------|--------|-----------|------------|--------|
| `primary` | 54px | 14px | `linear-gradient(135deg, #14b8a6, #0d9488)` | `#ffffff` | none |
| `outline` | 54px | 14px | `transparent` | `#e8ecf4` | `1.5px rgba(136,153,174,0.15)` |
| `social` | 48px | 10px | `#111d33` | `#e8ecf4` | `1.5px rgba(136,153,174,0.15)` |
| `back` | 40x40px | 12px | `#111d33` | — | `1px rgba(136,153,174,0.1)` |
| `textLink` | auto | 0 | `transparent` | teal or amber | none |

### Props

```
variant: 'primary' | 'outline' | 'social' | 'back' | 'textLink'
label?: string
icon?: ReactNode (leading icon)
color?: 'teal' | 'amber' (for textLink variant)
onPress: () => void
disabled?: boolean
loading?: boolean
fullWidth?: boolean (default true for primary/outline)
```

### States

- **Primary pressed**: `translateY(1px)`, shadow reduces
- **Outline pressed**: bg `rgba(20,184,166,0.05)`, border teal
- **Social pressed**: bg `#162036`, border teal
- **Back pressed**: bg `#162036`, border teal
- **Disabled**: 40% opacity, no interaction

### Primary Button Shadow (RN)

```
shadowColor: '#14b8a6'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.3
shadowRadius: 20
elevation: 8
```

### Primary Button Gradient

Use `react-native-svg` `LinearGradient` inside a `Defs` + `Rect`, or use two overlapping views with opacity. Alternative: `expo-linear-gradient` (already available through Expo).

---

## TextInput (`text-input.tsx`)

Standard form input with left icon slot. Reference: `02-Components.md` lines 99-140.

### Props

```
label: string
placeholder: string
value: string
onChangeText: (text: string) => void
icon?: ReactNode (left icon, 18x18px)
secureTextEntry?: boolean
error?: string
rightElement?: ReactNode (e.g., password toggle)
keyboardType?: KeyboardTypeOptions
autoCapitalize?: 'none' | 'sentences' | etc
```

### Measurements

| Property | Value |
|----------|-------|
| Height | 50px |
| Border Radius | 10px |
| Background | `#0f1a2e` |
| Border | `1.5px rgba(136,153,174,0.15)` |
| Text | 15px, weight 400, `#e8ecf4` |
| Placeholder | `#3d5068` |
| Padding Left | 44px (with icon), 14px (without) |
| Icon Position | absolute left 14px, 18x18px, stroke `#556677` |

### Focus State (animate with Reanimated or RN Animated)

```
borderColor: #14b8a6
backgroundColor: rgba(20,184,166,0.03)
shadowColor: rgba(20,184,166,0.06), radius: 3px (focus ring)
```

### Error State

```
borderColor: #f43f5e
```

### Form Label

Rendered above the input:
- Font: 11px, weight 700, uppercase, letter-spacing 0.8px
- Color: `#8899ae`
- Margin bottom: 7px

### Form Group Spacing

- Between form groups: 16px (`spacing.xl`)

---

## PhoneInput (`features/auth/components/phone-input.tsx`)

Dual-field: country code selector + masked phone input. Reference: `prototypes/auth.html` lines 88-94.

### Layout

```
[🇧🇷 +55] [  (11) 98765-4321  ]
```

- Country code box: 50px height, `#0f1a2e` bg, left-rounded (10px 0 0 10px)
- Phone input: flex 1, right-rounded (0 10px 10px 0), no left border
- Both share focus state (when either is focused, both highlight)

### Mask Format

- Display: `(DD) 9XXXX-XXXX`
- Stored: `+55XXXXXXXXXXX` (11 digits after country code)
- Only accept digits in the input

### Props

```
value: string (unmasked: just digits)
onChangeText: (unmasked: string) => void
error?: string
```

---

## Checkbox (`checkbox.tsx`)

"Lembrar de mim" toggle. Reference: `02-Components.md` lines 145-157.

### Props

```
checked: boolean
onToggle: () => void
label: string
```

### Measurements

| Property | Value |
|----------|-------|
| Box Size | 18x18px |
| Border Radius | 5px |
| Background (unchecked) | `#0f1a2e` |
| Border (unchecked) | `1.5px rgba(136,153,174,0.15)` |
| Background (checked) | `#14b8a6` |
| Border (checked) | `#14b8a6` |
| Check Icon | 12x12px, white, strokeWidth 3 |
| Label | 13px, weight 400, `#8899ae`, 8px gap |

---

## Divider (`divider.tsx`)

"ou" separator for auth screens. Reference: `02-Components.md` lines 197-205.

### Props

```
text?: string (default: "ou")
```

### Measurements

| Property | Value |
|----------|-------|
| Layout | flex-row, center-aligned, 16px gap |
| Lines | 1px height, gradient: `transparent → rgba(136,153,174,0.1) → transparent` |
| Text | 11px, weight 600, `#556677`, uppercase, letter-spacing 2px |
| Margin | 22px top and bottom |

---

## BrandLogo (`brand-logo.tsx`)

Logo icon + "Auto" + "Keeper" text. Reference: `02-Components.md` lines 162-192.

### Props

```
size: 'splash' | 'nav'
showText?: boolean (default true)
```

### Variants

| Size | Icon Size | Icon Radius | Text Size | Show Text |
|------|-----------|-------------|-----------|-----------|
| `splash` | 46x46px (inside 150px gauge) | — | 30px | yes |
| `nav` | 34x34px | 9px | 20px | yes |

### Logo Icon

- Background: `linear-gradient(135deg, #0d9488, #14b8a6)`
- Shadow: `0 4px 14px rgba(20,184,166,0.25)`
- Inner: Car SVG, stroke white, strokeWidth 2.5

### Brand Text

- "Auto" in `text.primary` (#e8ecf4), weight 700
- "Keeper" in `brand.amber` (#e8a838), weight 700

---

## Acceptance Criteria

- [ ] Button renders all 5 variants with correct styles
- [ ] Button press states animate correctly
- [ ] TextInput shows focus animation (border + bg change)
- [ ] TextInput displays error state with red border
- [ ] PhoneInput masks input as `(DD) 9XXXX-XXXX`
- [ ] PhoneInput returns unmasked value to parent
- [ ] Checkbox toggles between checked/unchecked with correct colors
- [ ] Divider renders gradient lines with centered text
- [ ] BrandLogo renders both size variants
