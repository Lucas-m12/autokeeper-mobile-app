import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle, Easing } from 'react-native';

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
}

function LoadingSpinner() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotation animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 0.6,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, [spinValue, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.loadingContainer,
        {
          transform: [{ rotate: spin }],
          opacity: pulseValue,
        }
      ]}
    >
      <View style={styles.loadingRing}>
        <View style={styles.loadingDot} />
        <View style={[styles.loadingDot, styles.loadingDot2]} />
        <View style={[styles.loadingDot, styles.loadingDot3]} />
      </View>
    </Animated.View>
  );
}

export function PrimaryButton({
  onPress,
  title,
  disabled = false,
  loading = false,
  icon,
  style,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Text style={styles.buttonText}>{title}</Text>
            {icon && <View style={styles.icon}>{icon}</View>}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.glowSubtle,
  },
  gradient: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing['2xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    minHeight: 56,
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
    lineHeight: Typography.button.lineHeight,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  loadingContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingRing: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  loadingDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textWhite,
    top: 0,
    left: 9,
    shadowColor: Colors.textWhite,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingDot2: {
    top: 9,
    left: 18,
  },
  loadingDot3: {
    top: 18,
    left: 9,
  },
});
