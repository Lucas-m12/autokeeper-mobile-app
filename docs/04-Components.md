# 04 — Components

**AutoKeeper Design System v1.0**

---

## 🧩 Component Philosophy

AutoKeeper components are designed to be:
- **Reusable** — DRY principle, build once, use everywhere
- **Consistent** — Same look and feel across the app
- **Accessible** — Proper touch targets, contrast, feedback
- **Responsive** — Adapts to different screen sizes
- **Performant** — Optimized for React Native

---

## 🎨 Component Library

### 1. Buttons

#### Primary Button

**Appearance:**
- Background: Cyan gradient (`#06b6d4` → `#0891b2`)
- Text: White, 16px, semibold
- Height: 56px
- Padding: 16px vertical, 24px horizontal
- Border radius: 16px
- Shadow: Cyan glow (see `05-Effects.md`)
- Border: 1px solid `rgba(255, 255, 255, 0.1)` (inner)

**States:**
- **Default:** Gradient background, white text
- **Hover:** Translate up 2px, stronger shadow
- **Pressed:** Translate down 1px, reduced shadow, darker background
- **Disabled:** 40% opacity, no interaction

**React Native:**
```javascript
import { Pressable, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryButton = ({ onPress, title, disabled }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
      disabled && styles.buttonDisabled,
    ]}
  >
    <LinearGradient
      colors={['#06b6d4', '#0891b2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});
```

---

#### Secondary Button

**Appearance:**
- Background: `rgba(30, 30, 30, 0.6)`
- Text: `#f1f5f9`, 16px, semibold
- Height: 56px
- Padding: 16px vertical, 24px horizontal
- Border: 1px solid `rgba(34, 211, 238, 0.2)`
- Border radius: 16px

**States:**
- **Default:** Dark background, cyan border
- **Hover:** Lighter background `rgba(40, 40, 40, 0.8)`, stronger border
- **Pressed:** Even lighter, translate down 1px
- **Disabled:** 40% opacity

**React Native:**
```javascript
const SecondaryButton = ({ onPress, title, icon, disabled }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.secondaryButton,
      pressed && styles.secondaryButtonPressed,
      disabled && styles.buttonDisabled,
    ]}
  >
    {icon && <View style={styles.icon}>{icon}</View>}
    <Text style={styles.secondaryButtonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    borderRadius: 16,
  },
  secondaryButtonText: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  secondaryButtonPressed: {
    backgroundColor: 'rgba(40, 40, 40, 0.8)',
    borderColor: 'rgba(34, 211, 238, 0.4)',
    transform: [{ translateY: 1 }],
  },
  icon: {
    width: 24,
    height: 24,
  },
});
```

---

### 2. Text Inputs

#### Standard Input

**Appearance:**
- Background: `rgba(30, 30, 30, 0.6)`
- Text: `#f1f5f9`, 16px, regular
- Placeholder: `#6b7280`, 16px
- Height: 52px (auto with padding)
- Padding: 14px vertical, 16px horizontal
- Border: 1px solid `rgba(34, 211, 238, 0.2)`
- Border radius: 12px

**States:**
- **Default:** Dark background, subtle cyan border
- **Focus:** Lighter background, stronger border, cyan shadow
- **Error:** Red border `#ef4444`
- **Disabled:** 50% opacity

**React Native:**
```javascript
const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  error,
  secureTextEntry,
  ...props 
}) => (
  <View style={styles.formGroup}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[
        styles.input,
        error && styles.inputError,
      ]}
      placeholder={placeholder}
      placeholderTextColor="#6b7280"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
    lineHeight: 21,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    borderRadius: 12,
    color: '#f1f5f9',
    fontSize: 16,
    lineHeight: 24,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontSize: 13,
    color: '#ef4444',
    marginTop: 4,
  },
});
```

---

### 3. Cards

#### Standard Card (Glassmorphic)

**Appearance:**
- Background: `rgba(18, 18, 18, 0.9)` with backdrop blur (20px)
- Border: 1px solid `rgba(34, 211, 238, 0.2)`
- Border radius: 32px (mobile), 24px (compact)
- Padding: 24px (mobile), 32px (desktop)
- Shadow: Multi-layered (see `05-Effects.md`)

**React Native:**
```javascript
import { BlurView } from '@react-native-community/blur';

const Card = ({ children, compact }) => (
  <View style={[styles.card, compact && styles.cardCompact]}>
    <BlurView
      style={styles.blur}
      blurType="dark"
      blurAmount={20}
      reducedTransparencyFallbackColor="#121212"
    >
      {children}
    </BlurView>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    overflow: 'hidden',
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 60,
    elevation: 20,
  },
  cardCompact: {
    borderRadius: 24,
  },
  blur: {
    padding: 24,
  },
});
```

---

#### Reminder Card

**Appearance:**
- Background: `rgba(30, 30, 30, 0.6)`
- Border: 1px solid `rgba(34, 211, 238, 0.15)`
- Border radius: 16px
- Padding: 16px
- Min height: 80px

**Structure:**
```
┌─────────────────────────────┐
│ [Icon] Title          Badge │
│        Subtitle             │
│        Meta (vehicle/date)  │
└─────────────────────────────┘
```

**React Native:**
```javascript
const ReminderCard = ({ 
  title, 
  subtitle, 
  vehicle, 
  daysRemaining, 
  status,
  onPress 
}) => (
  <Pressable 
    style={styles.reminderCard}
    onPress={onPress}
  >
    <View style={styles.reminderHeader}>
      <View style={styles.reminderIconTitle}>
        {/* Icon */}
        <View style={styles.reminderIcon}>
          {/* Vehicle/reminder icon */}
        </View>
        <View style={styles.reminderTitleContainer}>
          <Text style={styles.reminderTitle}>{title}</Text>
          <Text style={styles.reminderSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <StatusBadge status={status} days={daysRemaining} />
    </View>
    
    <View style={styles.reminderMeta}>
      <Text style={styles.reminderMetaText}>{vehicle}</Text>
      <Text style={styles.reminderMetaText}>•</Text>
      <Text style={styles.reminderMetaText}>
        {daysRemaining > 0 ? `${daysRemaining}d` : 'Vencido'}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  reminderCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.15)',
    borderRadius: 16,
    padding: 16,
    minHeight: 80,
    gap: 12,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reminderIconTitle: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTitleContainer: {
    flex: 1,
    gap: 4,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    lineHeight: 22,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  reminderMeta: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  reminderMetaText: {
    fontSize: 13,
    color: '#6b7280',
  },
});
```

---

### 4. Status Badges

#### Badge Component

**Variants:**
- **Vencendo** (Warning): Amber background with amber text
- **Em atraso** (Error): Red background with red text
- **Concluído** (Success): Green background with green text
- **Agendado** (Info): Blue background with blue text

**Appearance:**
- Height: 24px
- Padding: 6px vertical, 12px horizontal
- Border radius: 12px (full pill)
- Font: 13px, medium weight

**React Native:**
```javascript
const StatusBadge = ({ status, days }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'vencendo':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          text: '#f59e0b',
          label: `${days}d`,
        };
      case 'em-atraso':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          text: '#ef4444',
          label: 'Atrasado',
        };
      case 'concluido':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          text: '#10b981',
          label: 'Feito',
        };
      default:
        return {
          bg: 'rgba(59, 130, 246, 0.15)',
          text: '#3b82f6',
          label: 'Agendado',
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[
      styles.badge,
      { backgroundColor: badgeStyle.bg }
    ]}>
      <Text style={[
        styles.badgeText,
        { color: badgeStyle.text }
      ]}>
        {badgeStyle.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
```

---

### 5. Logo Icon

**Appearance:**
- Size: 64×64px (login), 72×72px (welcome)
- Background: Cyan → Blue gradient
- Border radius: 18-20px
- Shadow: Cyan glow
- Icon: Car SVG, 36-40px, white

**React Native:**
```javascript
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const LogoIcon = ({ size = 64 }) => {
  const iconSize = size * 0.55; // 55% of container
  
  return (
    <LinearGradient
      colors={['#06b6d4', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.logoIcon,
        { 
          width: size, 
          height: size,
          borderRadius: size * 0.28, // ~28% for 18-20px feel
        }
      ]}
    >
      <Svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Car icon paths */}
        <Path d="M5 17h14v-5H5v5z"/>
        <Path d="M5 17H3.5A2.5 2.5 0 0 1 1 14.5v-3A2.5 2.5 0 0 1 3.5 9H5"/>
        <Path d="M19 17h1.5a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-2.5-2.5H19"/>
        <Circle cx="8" cy="17" r="2"/>
        <Circle cx="16" cy="17" r="2"/>
        <Path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>
      </Svg>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 12,
  },
});
```

---

### 6. Divider

**Appearance:**
- Height: 1px
- Gradient: Transparent → Cyan (20% opacity) → Transparent
- Label: Optional center text, 14px, gray

**React Native:**
```javascript
const Divider = ({ label }) => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    {label && <Text style={styles.dividerLabel}>{label}</Text>}
    <View style={styles.dividerLine} />
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
  },
  dividerLabel: {
    fontSize: 14,
    color: '#475569',
  },
});
```

---

### 7. Empty State

**Structure:**
- Illustration (optional)
- Heading (20px, semibold)
- Description (16px, regular, gray)
- Primary CTA button

**React Native:**
```javascript
const EmptyState = ({ 
  illustration, 
  title, 
  description, 
  actionLabel,
  onAction 
}) => (
  <View style={styles.emptyState}>
    {illustration && (
      <View style={styles.emptyIllustration}>
        {illustration}
      </View>
    )}
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDescription}>{description}</Text>
    {actionLabel && (
      <PrimaryButton title={actionLabel} onPress={onAction} />
    )}
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
    gap: 16,
  },
  emptyIllustration: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
    lineHeight: 28,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
});
```

---

## ✅ Component Checklist

When building a component:

- [ ] Matches design system colors
- [ ] Uses spacing tokens
- [ ] Follows typography scale
- [ ] Has all interactive states (default, hover, pressed, disabled)
- [ ] Meets accessibility standards (touch target 44×44px minimum)
- [ ] Includes prop types / TypeScript types
- [ ] Handles edge cases (long text, empty data)
- [ ] Responsive (works on 360px and 390px)
- [ ] Performant (no unnecessary re-renders)
- [ ] Reusable (generic, not screen-specific)

---

**Next:** See [05-Effects.md](./05-Effects.md) for shadows, glows, and animations.
