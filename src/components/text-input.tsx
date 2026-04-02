import { type ReactNode, useState } from 'react';
import {
  type KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/constants/theme';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: ReactNode;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke={colors.text.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 9a3 3 0 110 6 3 3 0 010-6z"
          stroke={colors.text.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 01-4.24-4.24"
        stroke={colors.text.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1l22 22"
        stroke={colors.text.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  error,
  keyboardType,
  autoCapitalize,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const hasIcon = !!icon;
  const hasError = !!error;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          hasError && styles.inputContainerError,
        ]}
      >
        {hasIcon && <View style={styles.iconContainer}>{icon}</View>}
        <RNTextInput
          style={[styles.input, hasIcon ? styles.inputWithIcon : styles.inputWithoutIcon]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !passwordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setPasswordVisible((prev) => !prev)}
            style={styles.eyeButton}
          >
            <View style={styles.eyeIconWrapper}>
              <EyeIcon visible={passwordVisible} />
            </View>
          </Pressable>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.text.secondary,
    marginBottom: 7,
  },
  inputContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.bg.input,
    borderWidth: 1.5,
    borderColor: colors.border.input,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFocused: {
    borderColor: colors.accent.teal,
    backgroundColor: 'rgba(20,184,166,0.03)',
  },
  inputContainerError: {
    borderColor: colors.status.error,
  },
  iconContainer: {
    position: 'absolute',
    left: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '400',
    color: colors.text.primary,
    paddingRight: 14,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputWithoutIcon: {
    paddingLeft: 14,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  eyeIconWrapper: {
    opacity: 0.4,
  },
  errorText: {
    fontSize: 12,
    color: colors.status.error,
    marginTop: 4,
  },
});
