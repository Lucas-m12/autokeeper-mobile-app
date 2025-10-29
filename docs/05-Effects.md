# 05 — Effects & Animations

**AutoKeeper Design System v1.0**

---

## ✨ Effects Philosophy

AutoKeeper uses subtle, premium effects to create depth and enhance the automotive aesthetic:
- **Shadows** — Create elevation and hierarchy
- **Glows** — Cyan accents for modern, electric feel
- **Blur** — Glassmorphism for premium cards
- **Animations** — Smooth, responsive micro-interactions

---

## 🌑 Shadows

### Shadow Levels

**Level 1 — Subtle (Inputs, Small Cards)**
```javascript
// React Native
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2, // Android
}
```

**Level 2 — Medium (Buttons, Cards)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 4,
}
```

**Level 3 — High (Elevated Cards)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 24,
  elevation: 8,
}
```

**Level 4 — Very High (Modals, Main Cards)**
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 60,
  elevation: 20,
}
```

---

## ✨ Glows (Colored Shadows)

### Cyan Glow (Primary Buttons, Logo)

**Subtle Glow**
```javascript
{
  shadowColor: '#06b6d4',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.4,
  shadowRadius: 20,
  elevation: 8,
}
```

**Medium Glow (Hover State)**
```javascript
{
  shadowColor: '#06b6d4',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.5,
  shadowRadius: 30,
  elevation: 12,
}
```

**Strong Glow (Focus State)**
```javascript
{
  shadowColor: '#06b6d4',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.6,
  shadowRadius: 40,
  elevation: 16,
}
```

### Multi-Layer Shadows

For premium depth (cards, logo):

```javascript
// Note: React Native doesn't support multiple shadows natively
// Use react-native-shadow-2 or layer views

// CSS equivalent for reference:
/*
box-shadow: 
  0 20px 60px rgba(0, 0, 0, 0.7),
  0 0 80px rgba(34, 211, 238, 0.08),
  0 0 0 1px rgba(34, 211, 238, 0.15) inset;
*/

// React Native workaround:
<View style={outerShadowStyle}>
  <View style={innerBorderStyle}>
    {/* Content */}
  </View>
</View>
```

---

## 🌫️ Blur Effects

### Backdrop Blur (Glassmorphism)

**Card Blur (20px)**
```javascript
import { BlurView } from '@react-native-community/blur';

<BlurView
  style={{ flex: 1 }}
  blurType="dark"
  blurAmount={20}
  reducedTransparencyFallbackColor="#121212"
>
  {/* Card content */}
</BlurView>
```

**Strong Blur (30px)** — For modals
```javascript
<BlurView
  style={{ flex: 1 }}
  blurType="dark"
  blurAmount={30}
  reducedTransparencyFallbackColor="#0a0a0a"
>
  {/* Modal content */}
</BlurView>
```

**Note:** iOS supports blur natively. For Android, use fallback solid color or `@react-native-community/blur`.

---

## 🎬 Animations

### Animation Principles

1. **Fast & Snappy** — 200-300ms for most interactions
2. **Smooth Easing** — Use ease-out for natural feel
3. **Purposeful** — Animations should communicate, not distract
4. **Reduced Motion** — Respect system preferences

### Timing Scale

| Duration | Usage |
|----------|-------|
| **100ms** | Very quick (icon changes, toggles) |
| **200ms** | Quick (button press, focus) |
| **300ms** | Standard (cards, panels) |
| **500ms** | Slow (page transitions) |
| **800ms** | Very slow (background animations) |

### Easing Functions

```javascript
import { Easing } from 'react-native';

// Preferred easings
const easings = {
  standard: Easing.bezier(0.4, 0.0, 0.2, 1), // Material standard
  decelerate: Easing.out(Easing.cubic), // Ease-out
  accelerate: Easing.in(Easing.cubic), // Ease-in
  sharp: Easing.bezier(0.4, 0.0, 0.6, 1), // Quick & snappy
};
```

---

### Button Press Animation

**Using Animated API:**
```javascript
import { Animated, Pressable } from 'react-native';

const AnimatedButton = ({ onPress, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};
```

---

### Fade In Animation

```javascript
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, duration = 300, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
```

---

### Slide In Animation

```javascript
const SlideInView = ({ 
  children, 
  direction = 'bottom', // 'top', 'bottom', 'left', 'right'
  duration = 300,
  delay = 0 
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'top':
        return [{ translateY: slideAnim.interpolate({
          inputRange: [0, 50],
          outputRange: [0, -50],
        }) }];
      case 'bottom':
        return [{ translateY: slideAnim }];
      case 'left':
        return [{ translateX: slideAnim.interpolate({
          inputRange: [0, 50],
          outputRange: [0, -50],
        }) }];
      case 'right':
        return [{ translateX: slideAnim }];
      default:
        return [{ translateY: slideAnim }];
    }
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: getTransform(),
      }}
    >
      {children}
    </Animated.View>
  );
};
```

---

### Background Glow Animation (Orbs)

For the floating background orbs on login/welcome screens:

```javascript
const FloatingOrb = ({ size, color, top, right, bottom, left, delay }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 30,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: 30,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.1,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
        ])
      ).start();
    };

    animate();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        top,
        right,
        bottom,
        left,
        transform: [
          { translateX },
          { translateY },
          { scale },
        ],
      }}
    />
  );
};

// Usage
<View style={{ position: 'relative', flex: 1 }}>
  <FloatingOrb
    size={300}
    color="rgba(34, 211, 238, 0.12)"
    top={-100}
    right={-100}
    delay={0}
  />
  <FloatingOrb
    size={400}
    color="rgba(59, 130, 246, 0.1)"
    bottom={-150}
    left={-150}
    delay={2000}
  />
</View>
```

---

### Loading Spinner

```javascript
const LoadingSpinner = ({ size = 40, color = '#06b6d4' }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 3,
        borderColor: 'transparent',
        borderTopColor: color,
        transform: [{ rotate: spin }],
      }}
    />
  );
};
```

---

## 🎨 Border Effects

### Inner Border (Inset)

Create the subtle white inner border effect:

```javascript
// Method 1: Using borderWidth with transparent color
<View style={{
  borderWidth: 1,
  borderColor: 'rgba(34, 211, 238, 0.2)', // Outer border
  borderRadius: 16,
}}>
  <View style={{
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Inner border
    borderRadius: 15, // Slightly smaller
    margin: -1, // Overlap outer border
  }}>
    {/* Content */}
  </View>
</View>

// Method 2: Using box-shadow inset (CSS only, for web)
/*
box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
*/
```

---

### Gradient Border

For special elements:

```javascript
import LinearGradient from 'react-native-linear-gradient';

const GradientBorder = ({ children, borderWidth = 1, borderRadius = 16 }) => (
  <LinearGradient
    colors={['#06b6d4', '#3b82f6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      padding: borderWidth,
      borderRadius,
    }}
  >
    <View style={{
      backgroundColor: '#121212',
      borderRadius: borderRadius - borderWidth,
    }}>
      {children}
    </View>
  </LinearGradient>
);
```

---

## 🌈 Color Transitions

For smooth color changes (e.g., button states):

```javascript
const ColorTransitionButton = ({ pressed }) => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundAnim, {
      toValue: pressed ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Color animations don't support native driver
    }).start();
  }, [pressed]);

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(30, 30, 30, 0.6)', 'rgba(40, 40, 40, 0.8)'],
  });

  return (
    <Animated.View style={{ backgroundColor }}>
      {/* Button content */}
    </Animated.View>
  );
};
```

---

## 📱 React Native Reanimated (Optional)

For more complex animations, consider `react-native-reanimated`:

```javascript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedButton = ({ onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        {/* Content */}
      </Animated.View>
    </Pressable>
  );
};
```

---

## ♿ Accessibility

### Reduced Motion

Always respect user preferences:

```javascript
import { AccessibilityInfo } from 'react-native';

const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
}, []);

// Skip animations if reduce motion is enabled
const duration = reduceMotion ? 0 : 300;

Animated.timing(fadeAnim, {
  toValue: 1,
  duration,
  useNativeDriver: true,
}).start();
```

---

## ✅ Effects Checklist

- [ ] Use native driver when possible (transform, opacity)
- [ ] Keep durations fast (200-300ms)
- [ ] Use ease-out for most animations
- [ ] Add shadows for elevation
- [ ] Use cyan glows for brand elements
- [ ] Apply backdrop blur to cards
- [ ] Respect reduced motion preferences
- [ ] Test on real devices (shadows differ iOS/Android)
- [ ] Avoid animating layout properties (use transform)
- [ ] Use springs for natural feel

---

## 🚫 Don't Use

- ❌ Animations longer than 500ms (unless intentional)
- ❌ Linear easing (feels robotic)
- ❌ Too many simultaneous animations (overwhelming)
- ❌ Animating width/height (use transform: scale)
- ❌ Heavy shadows on many elements (performance)
- ❌ Blur on Android without fallback (not well supported)

---

**Next:** See [06-Icons.md](./06-Icons.md) for icon system guidelines.
