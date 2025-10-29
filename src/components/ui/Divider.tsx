import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      {label && <Text style={styles.dividerLabel}>{label}</Text>}
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderCyan,
  },
  dividerLabel: {
    fontSize: Typography.label.fontSize,
    color: Colors.textGrayDark,
  },
});
