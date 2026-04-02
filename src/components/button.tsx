import { type ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, shadows } from '@/constants/theme';

type ButtonVariant = 'primary' | 'outline' | 'social' | 'back' | 'textLink';
type TextLinkColor = 'teal' | 'amber';

interface ButtonProps {
  variant: ButtonVariant;
  label?: string;
  icon?: ReactNode;
  color?: TextLinkColor;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const TEXT_LINK_COLORS = {
  teal: colors.accent.teal,
  amber: colors.brand.amber,
} as const;

function BackArrowIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke={colors.text.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Button({
  variant,
  label,
  icon,
  color = 'teal',
  onPress,
  disabled = false,
  loading = false,
  fullWidth,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  const isDisabled = disabled || loading;

  if (variant === 'back') {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.back,
          pressed && styles.backPressed,
          isDisabled && styles.disabled,
        ]}
        disabled={isDisabled}
      >
        <BackArrowIcon />
      </Pressable>
    );
  }

  if (variant === 'textLink') {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={isDisabled}
        style={isDisabled && styles.disabled}
      >
        <Text
          style={[
            styles.textLinkLabel,
            { color: TEXT_LINK_COLORS[color] },
            pressed && styles.pressedOpacity,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  const resolvedFullWidth =
    fullWidth !== undefined ? fullWidth : variant === 'primary' || variant === 'outline';

  const containerStyle = [
    variant === 'primary' && styles.primary,
    variant === 'primary' && pressed && styles.primaryPressed,
    variant === 'outline' && styles.outline,
    variant === 'outline' && pressed && styles.outlinePressed,
    variant === 'social' && styles.social,
    variant === 'social' && pressed && styles.socialPressed,
    resolvedFullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
  ];

  const labelStyle = [
    variant === 'primary' && styles.primaryLabel,
    variant === 'outline' && styles.outlineLabel,
    variant === 'social' && styles.socialLabel,
  ];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={containerStyle}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#ffffff' : colors.text.secondary}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={variant === 'social' ? styles.socialIcon : undefined}>{icon}</View>}
          {label && <Text style={labelStyle}>{label}</Text>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
  pressedOpacity: {
    opacity: 0.7,
  },
  primary: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#0fa89a',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryButton,
  },
  primaryPressed: {
    transform: [{ translateY: 1 }],
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  outline: {
    height: 54,
    borderRadius: 14,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinePressed: {
    backgroundColor: 'rgba(20,184,166,0.05)',
    borderColor: colors.accent.teal,
  },
  outlineLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  social: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.bg.surface,
    borderWidth: 1.5,
    borderColor: colors.border.input,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  socialPressed: {
    backgroundColor: 'rgba(20,184,166,0.05)',
  },
  socialIcon: {
    marginRight: 8,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPressed: {
    backgroundColor: 'rgba(20,184,166,0.05)',
  },
  textLinkLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
