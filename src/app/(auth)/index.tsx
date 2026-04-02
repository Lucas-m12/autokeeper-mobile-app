import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';

import { SplashGauge } from '@/features/auth/components/splash-gauge';

const BG_DEEP = '#060a14';
const AMBER = '#e8a838';
const TEXT_PRIMARY = '#e8ecf4';
const TEXT_MUTED = '#556677';
const TEAL = '#14b8a6';

const SPEED_LINES = [
  { top: 12, width: 80, duration: 2500, delay: 0 },
  { top: 32, width: 110, duration: 2000, delay: 400 },
  { top: 50, width: 55, duration: 3000, delay: 900 },
] as const;

function SpeedLine({ top, width, duration, delay }: (typeof SPEED_LINES)[number]) {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withRepeat(withTiming(500, { duration }), -1)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.speedLine,
        { top, width },
        animatedStyle,
      ]}
    />
  );
}

function ProgressBar() {
  const progress = useSharedValue(0);
  const containerOpacity = useSharedValue(0);

  useEffect(() => {
    containerOpacity.value = withDelay(1600, withTiming(1, { duration: 300 }));
    progress.value = withDelay(1800, withTiming(1, { duration: 1400 }));
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Animated.View style={[styles.progressContainer, containerStyle]}>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, fillStyle]}>
          <LinearGradient
            colors={['#14b8a6', '#e8a838']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function SpeedLinesContainer() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(1500, withTiming(1, { duration: 500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.speedLinesContainer, animatedStyle]}>
      {SPEED_LINES.map((line) => (
        <SpeedLine key={line.top} {...line} />
      ))}
    </Animated.View>
  );
}

export default function SplashScreen() {
  const router = useRouter();

  return (
    <Pressable
      style={styles.screen}
      onPress={() => router.replace('/welcome')}
    >
      <SpeedLinesContainer />

      <View style={styles.content}>
        <SplashGauge />

        <Animated.View
          entering={FadeInUp.delay(1100).duration(500)}
          style={styles.brandRow}
        >
          <Text style={styles.brandText}>
            Auto
            <Text style={styles.brandAmber}>Keeper</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(1400).duration(500)}>
          <Text style={styles.tagline}>CONTROLE VEICULAR</Text>
        </Animated.View>
      </View>

      <ProgressBar />

      <Animated.View
        entering={FadeInUp.delay(2600).duration(400)}
        style={styles.tapHintContainer}
      >
        <Text style={styles.tapHint}>Toque para continuar</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG_DEEP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  brandRow: {
    marginTop: 28,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  brandAmber: {
    color: AMBER,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_MUTED,
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  speedLinesContainer: {
    position: 'absolute',
    bottom: 125,
    left: 0,
    right: 0,
    height: 70,
    overflow: 'hidden',
  },
  speedLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(232,168,56,0.12)',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 98,
    alignItems: 'center',
  },
  progressTrack: {
    width: 48,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(136,153,174,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tapHintContainer: {
    position: 'absolute',
    bottom: 68,
  },
  tapHint: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
});
