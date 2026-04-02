import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
  type ReturnKeyTypeOptions,
  type TextInput as RNTextInputType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { maskPhone, unmaskPhone } from '../utils/phone-mask';

type Props = {
  value: string;
  onChangeText: (unmasked: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  submitBehavior?: 'blurAndSubmit' | 'submit' | 'newline';
};

export const PhoneInput = forwardRef<RNTextInputType, Props>(
  function PhoneInput(
    {
      value,
      onChangeText,
      onBlur,
      error,
      label = 'CELULAR',
      returnKeyType,
      onSubmitEditing,
      submitBehavior,
    },
    ref,
  ) {
    const innerRef = useRef<RNTextInputType>(null);
    useImperativeHandle(ref, () => innerRef.current!);

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
        <Pressable style={styles.row} onPress={() => innerRef.current?.focus()}>
          <View style={[styles.countryCode, borderStyle]} pointerEvents="none">
            <Text style={styles.flag}>🇧🇷</Text>
            <Text style={styles.code}>+55</Text>
          </View>
          <TextInput
            ref={innerRef}
            style={[styles.input, borderStyle]}
            value={maskPhone(value)}
            onChangeText={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            placeholder="(11) 98765-4321"
            placeholderTextColor="#3d5068"
            keyboardType="phone-pad"
            maxLength={16}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            submitBehavior={submitBehavior}
          />
        </Pressable>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

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
