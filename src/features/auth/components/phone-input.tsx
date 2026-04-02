import { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { maskPhone, unmaskPhone } from '../utils/phone-mask';

type Props = {
  value: string;
  onChangeText: (unmasked: string) => void;
  error?: string;
  label?: string;
};

export function PhoneInput({
  value,
  onChangeText,
  error,
  label = 'CELULAR',
}: Props) {
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (text: string) => {
      const digits = unmaskPhone(text).slice(0, 11);
      onChangeText(digits);
    },
    [onChangeText],
  );

  const borderStyle = error
    ? styles.errorBorder
    : focused
      ? styles.focusBorder
      : undefined;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <View style={[styles.countryCode, borderStyle]}>
          <Text style={styles.flag}>🇧🇷</Text>
          <Text style={styles.code}>+55</Text>
        </View>
        <TextInput
          style={[styles.input, borderStyle]}
          value={maskPhone(value)}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="(11) 98765-4321"
          placeholderTextColor="#3d5068"
          keyboardType="phone-pad"
          maxLength={16}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8899ae',
    marginBottom: 7,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
  },
  countryCode: {
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: '#0f1a2e',
    borderWidth: 1.5,
    borderColor: 'rgba(136,153,174,0.15)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },
  code: {
    fontSize: 14,
    color: '#8899ae',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: '#0f1a2e',
    borderWidth: 1.5,
    borderColor: 'rgba(136,153,174,0.15)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
    color: '#e8ecf4',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  focusBorder: {
    borderColor: '#14b8a6',
  },
  errorBorder: {
    borderColor: '#f43f5e',
  },
  error: {
    fontSize: 12,
    color: '#f43f5e',
    marginTop: 4,
  },
});
