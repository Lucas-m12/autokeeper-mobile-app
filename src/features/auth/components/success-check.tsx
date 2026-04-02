import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Polyline } from 'react-native-svg';

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

type Props = {
  variant: 'teal' | 'green';
};

const VARIANTS = {
  teal: {
    circleBg: 'rgba(20,184,166,0.08)',
    circleBorder: 'rgba(20,184,166,0.2)',
    ringBorder: 'rgba(20,184,166,0.08)',
    checkColor: '#14b8a6',
  },
  green: {
    circleBg: 'rgba(16,185,129,0.1)',
    circleBorder: 'rgba(16,185,129,0.2)',
    ringBorder: 'rgba(16,185,129,0.08)',
    checkColor: '#10b981',
  },
} as const;

export function SuccessCheck({ variant }: Props) {
  const config = VARIANTS[variant];
  const checkOffset = useSharedValue(40);
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.5);

  useEffect(() => {
    checkOffset.value = withDelay(
      300,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const checkProps = useAnimatedProps(() => ({
    strokeDashoffset: checkOffset.value,
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: config.circleBg,
          borderColor: config.circleBorder,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.ring,
          { borderColor: config.ringBorder },
          ringStyle,
        ]}
      />
      <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
        <AnimatedPolyline
          points="20 6 9 17 4 12"
          stroke={config.checkColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={40}
          animatedProps={checkProps}
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 9999,
    borderWidth: 2,
  },
});
