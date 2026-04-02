import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors, shadows } from '@/constants/theme';

type LogoSize = 'splash' | 'nav';

interface BrandLogoProps {
  size: LogoSize;
  showText?: boolean;
}

const sizeConfig = {
  nav: { icon: 34, borderRadius: 9, fontSize: 20 },
  splash: { icon: 46, borderRadius: 12, fontSize: 30 },
} as const;

function CarIcon({ size }: { size: number }) {
  const iconSize = size * 0.55;
  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Rect
        x={3}
        y={11}
        width={18}
        height={7}
        rx={2}
        stroke="#ffffff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 11L7 6h10l2 5"
        stroke="#ffffff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={7.5}
        cy={18}
        r={1.5}
        stroke="#ffffff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={16.5}
        cy={18}
        r={1.5}
        stroke="#ffffff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BrandLogo({ size, showText = true }: BrandLogoProps) {
  const config = sizeConfig[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconBox,
          {
            width: config.icon,
            height: config.icon,
            borderRadius: config.borderRadius,
          },
          shadows.logoIcon,
        ]}
      >
        <CarIcon size={config.icon} />
      </View>
      {showText && (
        <Text style={[styles.brandText, { fontSize: config.fontSize }]}>
          <Text style={styles.auto}>Auto</Text>
          <Text style={styles.keeper}>Keeper</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  iconBox: {
    backgroundColor: colors.accent.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontWeight: '700',
  },
  auto: {
    color: colors.text.primary,
  },
  keeper: {
    color: colors.brand.amber,
  },
});
