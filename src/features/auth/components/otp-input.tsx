import { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';

type Props = {
  length?: number;
  value: string;
  onChangeText: (code: string) => void;
  error?: boolean;
};

export function OtpInput({ length = 6, value, onChangeText, error }: Props) {
  const refs = useRef<(TextInput | null)[]>([]);
  const valueRef = useRef(value);
  valueRef.current = value;

  const getDigits = useCallback(
    () => valueRef.current.padEnd(length, ' ').split('').slice(0, length),
    [length],
  );

  const handleChange = useCallback(
    (text: string, index: number) => {
      const currentDigits = getDigits();

      if (text.length > 1) {
        const pasted = text.replace(/\D/g, '').slice(0, length);
        onChangeText(pasted);
        refs.current[Math.min(pasted.length, length - 1)]?.focus();
        return;
      }

      const digit = text.replace(/\D/g, '');
      const next = currentDigits.map((d, i) => (i === index ? digit : d)).join('');
      onChangeText(next.replace(/\s/g, ''));

      if (digit && index < length - 1) {
        refs.current[index + 1]?.focus();
      }
    },
    [getDigits, length, onChangeText],
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      const currentDigits = getDigits();
      if (e.nativeEvent.key === 'Backspace' && !currentDigits[index]?.trim() && index > 0) {
        const next = currentDigits.map((d, i) => (i === index - 1 ? '' : d)).join('');
        onChangeText(next.replace(/\s/g, ''));
        refs.current[index - 1]?.focus();
      }
    },
    [getDigits, onChangeText],
  );

  const digits = getDigits();

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => {
        const isFilled = digit.trim().length > 0;
        return (
          <TextInput
            key={index}
            ref={(el) => { refs.current[index] = el; }}
            style={[
              styles.box,
              isFilled && styles.filled,
              error && styles.error,
            ]}
            value={digit.trim()}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  box: {
    width: 50,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#0f1a2e',
    borderWidth: 1.5,
    borderColor: 'rgba(136,153,174,0.15)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#e8ecf4',
  },
  filled: {
    borderColor: 'rgba(20,184,166,0.3)',
    backgroundColor: 'rgba(20,184,166,0.04)',
  },
  error: {
    borderColor: '#f43f5e',
  },
});
