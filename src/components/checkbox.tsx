import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { colors } from '@/constants/theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

export function Checkbox({ checked, onToggle, label }: CheckboxProps) {
  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="20 6 9 17 4 12"
              stroke="#ffffff"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: colors.bg.input,
    borderWidth: 1.5,
    borderColor: colors.border.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.accent.teal,
    borderColor: colors.accent.teal,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.text.secondary,
  },
});
