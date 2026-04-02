import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  variant: 'amber' | 'teal';
  children: ReactNode;
};

const VARIANTS = {
  amber: {
    backgroundColor: 'rgba(232,168,56,0.15)',
    borderColor: 'rgba(232,168,56,0.1)',
  },
  teal: {
    backgroundColor: 'rgba(20,184,166,0.12)',
    borderColor: 'rgba(20,184,166,0.1)',
  },
} as const;

export function AuthIcon({ variant, children }: Props) {
  return (
    <View style={[styles.container, VARIANTS[variant]]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
});
