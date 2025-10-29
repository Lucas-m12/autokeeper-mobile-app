import React, { ReactNode } from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
}

export function SecondaryButton({
  onPress,
  title,
  disabled = false,
  icon,
  style,
}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing['2xl'],
    backgroundColor: Colors.surfaceDark,
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: BorderRadius.lg,
    minHeight: 56,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
    lineHeight: Typography.button.lineHeight,
  },
  buttonPressed: {
    backgroundColor: Colors.surfaceMedium,
    borderColor: Colors.borderCyanActive,
    transform: [{ translateY: 1 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
