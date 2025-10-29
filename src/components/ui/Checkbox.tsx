import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: CheckboxProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={styles.checkboxWrapper}>
        <View
          style={[
            styles.checkbox,
            checked && styles.checkboxChecked,
            disabled && styles.checkboxDisabled,
          ]}
        >
          {checked && (
            <Check
              size={16}
              color={disabled ? Colors.textMuted : Colors.bgBlack}
              strokeWidth={3}
            />
          )}
        </View>
      </View>
      {label && <View style={styles.labelContainer}>{label}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 44, // Minimum touch target
  },
  checkboxWrapper: {
    paddingVertical: 10, // Expands touch target vertically
    paddingRight: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.borderCyan,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryLight,
  },
  checkboxDisabled: {
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surfaceDark,
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
    paddingTop: 10, // Aligns with checkbox center
  },
});
