import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Path,
  Line,
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  onAnimationComplete?: () => void;
};

export function SplashGauge({ onAnimationComplete }: Props) {
  const dashOffset = useSharedValue(345);
  const carOpacity = useSharedValue(0);
  const carScale = useSharedValue(0.6);

  useEffect(() => {
    dashOffset.value = withDelay(
      300,
      withTiming(0, {
        duration: 1800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    );

    carOpacity.value = withDelay(
      700,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    carScale.value = withDelay(
      700,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      }),
    );
  }, []);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  const carStyle = useAnimatedStyle(() => ({
    opacity: carOpacity.value,
    transform: [{ scale: carScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Svg
        width={150}
        height={150}
        viewBox="0 0 140 140"
        style={styles.gauge}
      >
        <Defs>
          <LinearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#14b8a6" />
            <Stop offset="50%" stopColor="#e8a838" />
            <Stop offset="100%" stopColor="#f43f5e" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={70}
          cy={70}
          r={55}
          fill="none"
          stroke="rgba(136,153,174,0.06)"
          strokeWidth={4}
        />
        <AnimatedCircle
          cx={70}
          cy={70}
          r={55}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={345}
          animatedProps={animatedCircleProps}
        />
      </Svg>
      <Animated.View style={[styles.carIcon, carStyle]}>
        <Svg width={45} height={45} viewBox="0 0 48 48" fill="none">
          <Rect
            x={8}
            y={20}
            width={32}
            height={14}
            rx={4}
            stroke="#e8a838"
            strokeWidth={2.5}
          />
          <Path
            d="M12 20L16 12h16l4 8"
            stroke="#e8a838"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <Circle cx={16} cy={34} r={3.5} stroke="#14b8a6" strokeWidth={2} />
          <Circle cx={32} cy={34} r={3.5} stroke="#14b8a6" strokeWidth={2} />
          <Line
            x1={20}
            y1={26}
            x2={28}
            y2={26}
            stroke="#e8a838"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.4}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gauge: {
    transform: [{ rotate: '-90deg' }],
  },
  carIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
