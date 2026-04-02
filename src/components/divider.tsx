import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

interface DividerProps {
  text?: string;
}

export function Divider({ text = 'ou' }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.subtle,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
