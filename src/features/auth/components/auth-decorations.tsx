import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

type AmbientGlowProps = {
  variant: 'teal' | 'amber' | 'center';
  style?: ViewStyle;
};

const GLOW_CONFIGS = {
  teal: {
    width: 280,
    height: 280,
    top: -70,
    right: -70,
    backgroundColor: 'rgba(20,184,166,0.05)',
  },
  amber: {
    width: 320,
    height: 320,
    bottom: -80,
    left: -80,
    backgroundColor: 'rgba(232,168,56,0.035)',
  },
  center: {
    width: 350,
    height: 350,
    alignSelf: 'center' as const,
    backgroundColor: 'rgba(20,184,166,0.04)',
  },
} as const;

export function AmbientGlow({ variant, style }: AmbientGlowProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const duration = variant === 'amber' ? 10000 : 8000;
    const dirX = variant === 'amber' ? -10 : 10;
    const dirY = variant === 'amber' ? 10 : -10;

    translateX.value = withRepeat(
      withSequence(
        withTiming(dirX, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(dirY, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const config = GLOW_CONFIGS[variant];

  return (
    <Animated.View
      style={[
        glowStyles.base,
        config,
        animatedStyle,
        style,
      ]}
      pointerEvents="none"
    />
  );
}

const glowStyles = StyleSheet.create({
  base: {
    position: 'absolute',
    borderRadius: 9999,
  },
});

type ParticleConfig = {
  left: `${number}%`;
  top: `${number}%`;
  delay: number;
};

const PARTICLES: readonly ParticleConfig[] = [
  { left: '15%', top: '25%', delay: 0 },
  { left: '72%', top: '20%', delay: 1800 },
  { left: '42%', top: '52%', delay: 3500 },
  { left: '88%', top: '42%', delay: 5000 },
];

function Particle({ left, top, delay }: ParticleConfig) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.22, { duration: 1050, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.22, { duration: 4900, easing: Easing.linear }),
          withTiming(0, { duration: 1050, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      ),
    );

    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-70, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        particleStyles.dot,
        { left, top },
        animatedStyle,
      ]}
      pointerEvents="none"
    />
  );
}

export function FloatingParticles() {
  return (
    <View style={particleStyles.container} pointerEvents="none">
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </View>
  );
}

const particleStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  dot: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#e8a838',
  },
});

type GaugeArcProps = {
  screen: 'login' | 'register' | 'forgot' | 'newPassword';
};

const GAUGE_ARC_CONFIGS = {
  login: {
    circleStroke: '#e8a838',
    arcPath: 'M30 6 A24 24 0 0 1 54 30',
    arcStroke: '#14b8a6',
  },
  register: {
    circleStroke: '#14b8a6',
    arcPath: 'M30 6 A24 24 0 0 1 54 30 A24 24 0 0 1 30 54',
    arcStroke: '#e8a838',
  },
  forgot: {
    circleStroke: '#e8a838',
    arcPath: 'M30 6 A24 24 0 0 1 54 30 A24 24 0 0 1 30 54 A24 24 0 0 1 6 30',
    arcStroke: '#14b8a6',
  },
  newPassword: {
    circleStroke: '#14b8a6',
    arcPath: 'M30 6 A24 24 0 0 1 54 30',
    arcStroke: '#e8a838',
  },
} as const;

export function GaugeArc({ screen }: GaugeArcProps) {
  const config = GAUGE_ARC_CONFIGS[screen];

  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 60 60"
      style={gaugeArcStyles.svg}
    >
      <Circle
        cx={30}
        cy={30}
        r={28}
        stroke={config.circleStroke}
        strokeWidth={1}
        fill="none"
      />
      <Path
        d={config.arcPath}
        stroke={config.arcStroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const gaugeArcStyles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 68,
    right: 22,
    opacity: 0.06,
  },
});

type OtpDecoProps = {
  variant: 'register' | 'forgot';
};

const OTP_DECO_CONFIGS = {
  register: {
    outerStroke: 'rgba(20,184,166,0.3)',
    middleStroke: 'rgba(232,168,56,0.2)',
    innerStroke: 'rgba(20,184,166,0.15)',
  },
  forgot: {
    outerStroke: 'rgba(232,168,56,0.2)',
    middleStroke: 'rgba(20,184,166,0.15)',
    innerStroke: 'rgba(232,168,56,0.1)',
  },
} as const;

export function OtpDeco({ variant }: OtpDecoProps) {
  const config = OTP_DECO_CONFIGS[variant];

  return (
    <Svg
      width={280}
      height={280}
      viewBox="0 0 280 280"
      style={otpDecoStyles.svg}
    >
      <Circle
        cx={140}
        cy={140}
        r={130}
        stroke={config.outerStroke}
        strokeWidth={1}
        fill="none"
      />
      <Circle
        cx={140}
        cy={140}
        r={110}
        stroke={config.middleStroke}
        strokeWidth={1}
        fill="none"
        strokeDasharray="8 12"
      />
      <Circle
        cx={140}
        cy={140}
        r={90}
        stroke={config.innerStroke}
        strokeWidth={1}
        fill="none"
      />
    </Svg>
  );
}

const otpDecoStyles = StyleSheet.create({
  svg: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.03,
  },
});
