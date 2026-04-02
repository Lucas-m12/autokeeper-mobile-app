import { View, Text } from 'react-native';

import { colors, typography } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.deep, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ ...typography.h2, color: colors.text.primary }}>Início</Text>
      <Text style={{ ...typography.body, color: colors.text.secondary, marginTop: 8 }}>
        Em breve
      </Text>
    </View>
  );
}
