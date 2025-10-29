import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AnimatedSplashScreen } from '@/components/animated-splash-screen';
import { AlertProvider } from '@/contexts/alert-context';
import { AuthProvider } from '@/contexts/auth-context';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // You can add custom fonts here if needed
        // await Font.loadAsync({
        //   'custom-font': require('../assets/fonts/custom-font.ttf'),
        // });

        // Artificially delay for demonstration purposes
        // Remove this in production or adjust timing
        await new Promise(resolve => setTimeout(resolve, 2500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <AnimatedSplashScreen isAppReady={appIsReady}>
      <AuthProvider>
        <AlertProvider>
          <ThemeProvider value={DarkTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
          </ThemeProvider>
        </AlertProvider>
      </AuthProvider>
    </AnimatedSplashScreen>
  );
}