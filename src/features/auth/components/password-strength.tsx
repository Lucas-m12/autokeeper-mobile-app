import { StyleSheet, View, Text } from 'react-native';

import { usePasswordStrength } from '../hooks/use-password-strength';

type Props = {
  password: string;
  defaultLabel?: string;
};

export function PasswordStrength({ password, defaultLabel }: Props) {
  const { strength, label, color } = usePasswordStrength(password);

  return (
    <View>
      <View style={styles.bars}>
        {[1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={[
              styles.bar,
              level <= strength && { backgroundColor: color },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color }]}>
        {strength === 0
          ? defaultLabel || 'Use letras, números e símbolos'
          : label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(136,153,174,0.1)',
  },
  label: {
    fontSize: 11,
    marginTop: 4,
  },
});
