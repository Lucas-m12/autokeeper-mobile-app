import { Tabs } from 'expo-router';

import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bg.deep, borderTopColor: colors.border.subtle },
        tabBarActiveTintColor: colors.accent.teal,
        tabBarInactiveTintColor: colors.text.muted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
    </Tabs>
  );
}
