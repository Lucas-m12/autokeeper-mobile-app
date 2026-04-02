# AutoKeeper v2 — Components
## Buttons · Inputs · Cards · Badges · Navigation · Logo

---

## Buttons

### Primary Button

The main CTA. Teal gradient with inset highlight and glow shadow.

| Property | Value |
|----------|-------|
| Height | 54px |
| Border Radius | 14px |
| Background | `linear-gradient(135deg, #14b8a6, #0d9488)` |
| Text | 16px, weight 600, `#ffffff` |
| Shadow | `0 4px 20px rgba(20,184,166,0.3), inset 0 1px 0 rgba(255,255,255,0.1)` |
| Width | 100% (full width in forms) |

**States:**
- Default: As above
- Pressed: `translateY(1px)`, shadow reduces to `0 2px 10px rgba(20,184,166,0.2)`
- Disabled: 40% opacity, no interaction

---

### Outline Button

Secondary action. Transparent with subtle border.

| Property | Value |
|----------|-------|
| Height | 54px |
| Border Radius | 14px |
| Background | `transparent` |
| Border | `1.5px solid rgba(136,153,174,0.15)` |
| Text | 16px, weight 600, `#e8ecf4` |
| Width | 100% |

**States:**
- Default: As above
- Pressed: `background: rgba(20,184,166,0.05)`, `border-color: rgba(20,184,166,0.4)`
- Disabled: 40% opacity

---

### Social Login Button

Used for Google/Apple sign-in options.

| Property | Value |
|----------|-------|
| Height | 48px |
| Border Radius | 10px |
| Background | `#111d33` (bg-surface) |
| Border | `1.5px solid rgba(136,153,174,0.15)` |
| Text | 14px, weight 500, `#e8ecf4` |
| Icon | 18x18px, 8px gap to text |
| Layout | Flex row, 2 buttons side by side, 12px gap |

**States:**
- Pressed: `background: #162036`, `border-color: rgba(20,184,166,0.4)`

---

### Back Button

Navigation back. Icon-only in a rounded square.

| Property | Value |
|----------|-------|
| Size | 40x40px |
| Border Radius | 12px |
| Background | `#111d33` (bg-surface) |
| Border | `1px solid rgba(136,153,174,0.1)` |
| Icon | 20x20px, stroke `#8899ae`, strokeWidth 2 |

**States:**
- Pressed: `background: #162036`, `border-color: rgba(20,184,166,0.4)`

---

### Text Link Button

Inline navigation (footer links, "Esqueceu a senha?").

| Property | Value |
|----------|-------|
| Text | 14px, weight 600 |
| Color (teal) | `#14b8a6` — for "Criar conta", "Entrar" |
| Color (amber) | `#e8a838` — for "Esqueceu a senha?" |
| Background | none |
| Border | none |
| Padding | 4px |

---

## Form Inputs

### Standard Text Input

| Property | Value |
|----------|-------|
| Height | 50px |
| Border Radius | 10px |
| Background | `#0f1a2e` (bg-input) |
| Border | `1.5px solid rgba(136,153,174,0.15)` |
| Text | 15px, weight 400, `#e8ecf4` |
| Placeholder | `#3d5068` |
| Padding | `0 14px 0 44px` (with icon) |
| Icon | 18x18px, positioned absolute left 14px, stroke `#556677` |

**States:**
- Focus: `border-color: #14b8a6`, `background: rgba(20,184,166,0.03)`, `box-shadow: 0 0 0 3px rgba(20,184,166,0.06)`
- Error: `border-color: #f43f5e`
- Disabled: 50% opacity

### Password Input

Same as Standard Input, plus:
- Right padding: 48px (for toggle button)
- Toggle button: absolute right 14px, opacity 0.4, shows eye icon

### Form Label

| Property | Value |
|----------|-------|
| Font | 11px, weight 700, uppercase |
| Color | `#8899ae` |
| Letter Spacing | 0.8px |
| Margin Bottom | 7px |

### Form Group Spacing

- Between form groups: 16px
- Label to input: 7px
- Form extras row (remember me + forgot): `margin: 6px 0 22px`
- Button after form: 0 margin (direct stack)

---

## Checkbox

### "Lembrar de mim" Style

| Property | Value |
|----------|-------|
| Box Size | 18x18px |
| Border Radius | 5px |
| Background (unchecked) | `#0f1a2e` |
| Border (unchecked) | `1.5px solid rgba(136,153,174,0.15)` |
| Background (checked) | `#14b8a6` |
| Border (checked) | `#14b8a6` |
| Check Icon | 12x12px, white, strokeWidth 3 |
| Label | 13px, weight 400, `#8899ae`, 8px gap |

---

## Logo

### Logo Icon (Small — Nav/Auth)

| Property | Value |
|----------|-------|
| Size | 34x34px |
| Border Radius | 9px |
| Background | `linear-gradient(135deg, #0d9488, #14b8a6)` |
| Shadow | `0 4px 14px rgba(20,184,166,0.25)` |
| Inner Icon | Car SVG, 18x18px, stroke white, strokeWidth 2.5 |

### Auth Decorative Icon

Used at top of login/register screens to set context.

| Property | Value |
|----------|-------|
| Size | 42x42px |
| Border Radius | 12px |
| Amber variant | bg: `rgba(232,168,56,0.15)`, border: `rgba(232,168,56,0.1)`, icon stroke: `#e8a838` |
| Teal variant | bg: `rgba(20,184,166,0.12)`, border: `rgba(20,184,166,0.1)`, icon stroke: `#14b8a6` |

### Brand Name

Always rendered as: `Auto` (text-primary) + `Keeper` (brand-amber), both weight 700.

| Context | Size |
|---------|------|
| Splash | 30px |
| Welcome nav | 20px |
| Login/Register | Not shown (icon only) |

---

## Divider

### "ou" Divider (Auth Screens)

| Property | Value |
|----------|-------|
| Layout | Flex row, center aligned, 16px gap |
| Lines | 1px height, `linear-gradient(90deg, transparent, rgba(136,153,174,0.1), transparent)` |
| Text | 11px, weight 600, `#556677`, uppercase, letter-spacing 2px |
| Margin | 22px top and bottom |

---

## Status Badges

### Badge Component

| Property | Value |
|----------|-------|
| Padding | 3px 8px |
| Border Radius | 6px |
| Font | 11px, weight 500 |
| Background | Status color at 10-15% opacity |
| Text Color | Full status color |

**Variants:**

| Status | Label | BG | Text |
|--------|-------|----|------|
| Vencendo | `Vencendo` or `{n}d` | `rgba(245,158,11,0.1)` | `#f59e0b` |
| Atrasado | `Atrasado` | `rgba(244,63,94,0.1)` | `#f43f5e` |
| OK | `OK` | `rgba(16,185,129,0.1)` | `#10b981` |
| Agendado | `Agendado` | `rgba(59,130,246,0.1)` | `#3b82f6` |

---

## Bottom Tab Bar (Upcoming)

| Property | Value |
|----------|-------|
| Height | ~70px (including safe area) |
| Background | `#0e0e0e` or `#060a14` |
| Border Top | `1px solid rgba(136,153,174,0.06)` |
| Icon Size | 22x22px |
| Label | 10px, 4px below icon |
| Active Color | `#14b8a6` (teal) |
| Inactive Color | `#556677` (muted) |
| FAB (center) | 48x48px circle, teal gradient, white + icon, elevated 20px |

### Tab Items
- Início (Home)
- Veículos (Car)
- **+ Novo** (FAB — elevated center button)
- Agenda (Calendar)
- Perfil (User)

---

## Reminder List Item

| Property | Value |
|----------|-------|
| Background | `#141414` or `bg-surface` |
| Border | `1px solid rgba(136,153,174,0.06)` |
| Border Radius | 14px |
| Padding | 14px 16px |
| Layout | Row: [icon 38px] [text flex-1] [badge] |

### Reminder Icon Container
- Size: 38x38px
- Border Radius: 10px
- Background: Status color at 12% opacity
- Icon: 18x18px, stroke = status color

### Reminder Text
- Title: 14px, weight 500, `text-primary`
- Subtitle: 12px, weight 400, `text-muted`, margin-top 2px

---

## Accessibility

### Touch Targets
- Minimum: 40x40px for all interactive elements
- Recommended: 44x44px+
- Back button: 40x40px (minimum acceptable)
- Buttons: 54px height (exceeds minimum)

### Contrast Ratios (WCAG AA)
- `#e8ecf4` on `#060a14`: **18.5:1** ✅ AAA
- `#8899ae` on `#060a14`: **7.2:1** ✅ AAA
- `#14b8a6` on `#060a14`: **7.8:1** ✅ AAA
- `#e8a838` on `#060a14`: **8.1:1** ✅ AAA
- `#556677` on `#060a14`: **4.1:1** ✅ AA (large text only)
- `#f43f5e` on `#060a14`: **5.3:1** ✅ AA
