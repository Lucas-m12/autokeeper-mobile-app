# 06 — Icons

**AutoKeeper Design System v1.0**

---

## 🎯 Icon Philosophy

AutoKeeper uses a consistent icon system that:
- **Communicates clearly** — Icons are instantly recognizable
- **Matches the brand** — Automotive and modern aesthetic
- **Scales properly** — Works at all sizes
- **Accessible** — Paired with text when needed

---

## 📦 Icon Library

**Recommended:** [Lucide React Native](https://lucide.dev/)

```bash
npm install lucide-react-native
```

**Why Lucide?**
- ✅ Modern, clean design
- ✅ Consistent stroke width (2px default)
- ✅ Extensive automotive icons
- ✅ React Native compatible
- ✅ Tree-shakeable (small bundle)
- ✅ MIT licensed

**Alternative:** [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

---

## 📏 Icon Sizes

| Token | Size | Usage | Stroke Width |
|-------|------|-------|--------------|
| `xs` | 16px | Inline text, badges | 2px |
| `sm` | 20px | Small buttons, list items | 2px |
| `md` | 24px | Standard buttons, inputs | 2px |
| `lg` | 32px | Card headers, nav bar | 2.5px |
| `xl` | 40px | Logo (small), features | 2.5px |
| `2xl` | 48px | Vehicle type, main features | 2.5px |
| `3xl` | 64px | Logo (large), empty states | 3px |

```javascript
// constants/iconSizes.js
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
};

export const iconStrokeWidths = {
  xs: 2,
  sm: 2,
  md: 2,
  lg: 2.5,
  xl: 2.5,
  '2xl': 2.5,
  '3xl': 3,
};
```

---

## 🎨 Icon Colors

### Standard Colors

```javascript
export const iconColors = {
  // Primary
  white: '#ffffff',
  light: '#f1f5f9',
  gray: '#9ca3af',
  muted: '#6b7280',
  
  // Brand
  primary: '#06b6d4',
  primaryLight: '#22d3ee',
  
  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};
```

### Usage Guidelines

- **On dark backgrounds:** Use white (`#ffffff`) or light gray (`#f1f5f9`)
- **Interactive elements:** Use primary cyan (`#06b6d4`)
- **Status indicators:** Use semantic colors
- **Disabled:** Use muted gray (`#6b7280`) at 40% opacity

---

## 🚗 Core Icon Set

### Navigation Icons

```javascript
import { 
  Home,
  Car,
  Plus,
  User,
  Settings,
  Search,
  Bell,
  Menu,
} from 'lucide-react-native';

// Usage
<Home color="#ffffff" size={24} strokeWidth={2} />
```

### Vehicle Type Icons

```javascript
import { 
  Car,          // Carro
  Bike,         // Moto
  Bus,          // Ônibus
  Truck,        // Caminhão
  Van,          // Van / Utilitário
} from 'lucide-react-native';

// Usage in vehicle selector
<Car color="#06b6d4" size={32} strokeWidth={2.5} />
```

### Reminder Type Icons

```javascript
import {
  FileText,     // IPVA, Licenciamento, Documentos
  Shield,       // Seguro
  Wrench,       // Manutenção
  AlertCircle,  // Lembrete personalizado
  Calendar,     // Data / Agendamento
} from 'lucide-react-native';
```

### Action Icons

```javascript
import {
  Check,        // Concluir, Success
  X,            // Fechar, Cancelar
  Plus,         // Adicionar
  Edit,         // Editar
  Trash,        // Excluir
  Clock,        // Adiar
  ArrowRight,   // Avançar, Próximo
  ArrowLeft,    // Voltar
  ChevronRight, // Navigate forward
  ChevronDown,  // Dropdown
  MoreVertical, // Menu (3 dots)
} from 'lucide-react-native';
```

### Status Icons

```javascript
import {
  CheckCircle,  // Concluído (success)
  AlertCircle,  // Vencendo (warning)
  XCircle,      // Em atraso (error)
  Clock,        // Agendado (info)
  Calendar,     // Data
} from 'lucide-react-native';
```

### Form Icons

```javascript
import {
  Mail,         // E-mail
  Lock,         // Senha
  Eye,          // Mostrar senha
  EyeOff,       // Ocultar senha
  User,         // Usuário
} from 'lucide-react-native';
```

### Social Icons

For social login buttons, use custom SVGs or platform-specific icons:

```javascript
// Google, Apple - use custom SVGs (provided in design)
// These don't have good equivalents in Lucide
```

---

## 🎨 Icon Components

### Basic Icon Wrapper

```javascript
import { iconSizes, iconColors } from '../constants';

const Icon = ({ 
  IconComponent, 
  size = 'md', 
  color = 'white',
  strokeWidth,
  ...props 
}) => {
  const iconSize = iconSizes[size] || iconSizes.md;
  const iconColor = iconColors[color] || iconColors.white;
  const defaultStrokeWidth = strokeWidth || (iconSize >= 32 ? 2.5 : 2);

  return (
    <IconComponent
      size={iconSize}
      color={iconColor}
      strokeWidth={defaultStrokeWidth}
      {...props}
    />
  );
};

// Usage
import { Home } from 'lucide-react-native';
<Icon IconComponent={Home} size="md" color="primary" />
```

---

### Icon Button

```javascript
const IconButton = ({ 
  IconComponent, 
  onPress, 
  size = 'md',
  color = 'white',
  variant = 'ghost', // 'ghost', 'filled', 'outlined'
  disabled,
}) => {
  const iconSize = iconSizes[size];
  const touchableSize = Math.max(iconSize + 16, 44); // Min 44px for accessibility

  const getBackgroundColor = () => {
    if (disabled) return 'transparent';
    switch (variant) {
      case 'filled':
        return 'rgba(6, 182, 212, 0.15)';
      case 'outlined':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const getBorderStyle = () => {
    if (variant === 'outlined') {
      return {
        borderWidth: 1,
        borderColor: 'rgba(34, 211, 238, 0.3)',
      };
    }
    return {};
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          width: touchableSize,
          height: touchableSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: touchableSize / 2,
          backgroundColor: getBackgroundColor(),
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
        getBorderStyle(),
      ]}
    >
      <Icon 
        IconComponent={IconComponent}
        size={size}
        color={color}
      />
    </Pressable>
  );
};

// Usage
import { Settings } from 'lucide-react-native';
<IconButton 
  IconComponent={Settings}
  onPress={() => {}}
  variant="filled"
  size="md"
/>
```

---

### Status Icon with Badge

```javascript
const StatusIcon = ({ status, size = 24 }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'vencendo':
        return {
          Icon: AlertCircle,
          color: iconColors.warning,
          bg: 'rgba(245, 158, 11, 0.15)',
        };
      case 'em-atraso':
        return {
          Icon: XCircle,
          color: iconColors.error,
          bg: 'rgba(239, 68, 68, 0.15)',
        };
      case 'concluido':
        return {
          Icon: CheckCircle,
          color: iconColors.success,
          bg: 'rgba(16, 185, 129, 0.15)',
        };
      default:
        return {
          Icon: Clock,
          color: iconColors.info,
          bg: 'rgba(59, 130, 246, 0.15)',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={{
      width: size * 1.5,
      height: size * 1.5,
      borderRadius: (size * 1.5) / 2,
      backgroundColor: config.bg,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <config.Icon
        size={size}
        color={config.color}
        strokeWidth={2}
      />
    </View>
  );
};
```

---

## 🎨 Vehicle Type Icons (Custom)

For vehicle types, create custom icon components with proper styling:

```javascript
import { Car, Bike, Bus, Truck } from 'lucide-react-native';

const VehicleTypeIcon = ({ type, size = 48 }) => {
  const getIcon = () => {
    switch (type) {
      case 'carro':
        return Car;
      case 'moto':
        return Bike;
      case 'van':
      case 'utilitario':
        return Van;
      case 'caminhao':
        return Truck;
      case 'onibus':
        return Bus;
      default:
        return Car;
    }
  };

  const IconComponent = getIcon();

  return (
    <View style={{
      width: size,
      height: size,
      borderRadius: size * 0.2, // 20% of size
      backgroundColor: 'rgba(6, 182, 212, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(34, 211, 238, 0.3)',
    }}>
      <IconComponent
        size={size * 0.55} // 55% of container
        color="#06b6d4"
        strokeWidth={2.5}
      />
    </View>
  );
};

// Usage
<VehicleTypeIcon type="carro" size={48} />
```

---

## 🎨 Empty State Icons

For empty states, use larger, softer icons:

```javascript
const EmptyStateIcon = ({ IconComponent, size = 64 }) => (
  <View style={{
    width: size * 1.5,
    height: size * 1.5,
    borderRadius: (size * 1.5) / 2,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <IconComponent
      size={size}
      color="rgba(6, 182, 212, 0.5)"
      strokeWidth={2}
    />
  </View>
);

// Usage
import { FileX } from 'lucide-react-native';
<EmptyStateIcon IconComponent={FileX} size={64} />
```

---

## ♿ Accessibility

### Touch Targets

Always ensure icons in buttons have minimum 44×44px touch target:

```javascript
<Pressable
  style={{
    padding: 12, // Makes 24px icon = 48px touch target
    // Or use minWidth/minHeight
    minWidth: 44,
    minHeight: 44,
  }}
>
  <Icon size={24} />
</Pressable>
```

### Screen Reader Labels

Always provide accessible labels:

```javascript
<Pressable
  accessible={true}
  accessibilityLabel="Configurações"
  accessibilityHint="Abre o menu de configurações"
  accessibilityRole="button"
>
  <Settings size={24} color="#ffffff" />
</Pressable>
```

### Don't Rely on Color Alone

Always pair status icons with text or shape:

```javascript
// ✅ Good: Icon + Text
<View style={{ flexDirection: 'row', gap: 8 }}>
  <CheckCircle size={20} color="#10b981" />
  <Text>Concluído</Text>
</View>

// ❌ Bad: Icon only, color is sole indicator
<CheckCircle size={20} color="#10b981" />
```

---

## 🎨 Custom SVG Icons

For brand-specific icons (Google, Apple logos), use `react-native-svg`:

```bash
npm install react-native-svg
```

### Google Icon (Custom)

```javascript
import Svg, { Path } from 'react-native-svg';

const GoogleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);
```

### Apple Icon (Custom)

```javascript
const AppleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </Svg>
);
```

---

## ✅ Icon Checklist

- [ ] Use consistent library (Lucide recommended)
- [ ] Follow size scale (16, 20, 24, 32, 40, 48, 64)
- [ ] Adjust stroke width for larger icons (2.5-3px)
- [ ] Ensure minimum 44×44px touch targets
- [ ] Provide accessibility labels
- [ ] Pair status colors with text
- [ ] Use semantic colors (success, warning, error)
- [ ] Test icon clarity at smallest size (16px)
- [ ] Maintain consistent visual weight

---

## 🚫 Don't Use

- ❌ Icons smaller than 16px (not readable)
- ❌ Mixing icon styles (filled + outlined)
- ❌ Too many colors in one icon
- ❌ Touch targets smaller than 44×44px
- ❌ Icons without text for critical actions
- ❌ Inconsistent stroke widths
- ❌ Too-complex icons (should be simple at small sizes)

---

## 📚 Icon Categories

### By Usage

**Navigation (Bottom Tab Bar)**
- Home, Car (Vehicles), Plus (Create), User (Profile)

**Actions (Buttons)**
- Plus, Edit, Trash, Check, X, Clock

**Status (Badges)**
- CheckCircle, AlertCircle, XCircle, Clock

**Forms (Inputs)**
- Mail, Lock, Eye, EyeOff, User, Search

**Vehicle Types (Cards)**
- Car, Bike, Truck, Bus, Van

**Reminder Types (Cards)**
- FileText (Documents), Shield (Insurance), Wrench (Maintenance), Calendar

---

**Complete!** You now have a comprehensive design system for AutoKeeper. Reference these files when creating new screens or components to maintain consistency.
