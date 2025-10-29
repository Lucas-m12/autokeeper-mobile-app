import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors, Shadows } from '@/constants/theme';

interface LogoIconProps {
  size?: number;
}

export function LogoIcon({ size = 64 }: LogoIconProps) {
  const iconSize = size * 0.55; // 55% of container
  const borderRadius = size * 0.28; // ~28% for rounded feel

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.logoIcon,
        {
          width: size,
          height: size,
          borderRadius,
        },
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
        <Path d="M5 17h14v-5H5v5z" />
        <Path d="M5 17H3.5A2.5 2.5 0 0 1 1 14.5v-3A2.5 2.5 0 0 1 3.5 9H5" />
        <Path d="M19 17h1.5a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-2.5-2.5H19" />
        <Circle cx="8" cy="17" r="2" />
        <Circle cx="16" cy="17" r="2" />
        <Path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      </Svg>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logoIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 12,
  },
});
