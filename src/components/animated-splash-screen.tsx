import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

// Keep the native splash screen visible while we prepare the app
SplashScreen.preventAutoHideAsync();

interface AnimatedSplashScreenProps {
  children: React.ReactNode;
  onAnimationEnd?: () => void;
  isAppReady?: boolean;
}

export function AnimatedSplashScreen({
  children,
  onAnimationEnd,
  isAppReady = false,
}: AnimatedSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const splashFadeOut = useRef(new Animated.Value(1)).current;

  // Floating orb animations
  const orb1TranslateX = useRef(new Animated.Value(0)).current;
  const orb1TranslateY = useRef(new Animated.Value(0)).current;
  const orb1Scale = useRef(new Animated.Value(1)).current;

  const orb2TranslateX = useRef(new Animated.Value(0)).current;
  const orb2TranslateY = useRef(new Animated.Value(0)).current;
  const orb2Scale = useRef(new Animated.Value(1)).current;

  const orb3TranslateX = useRef(new Animated.Value(0)).current;
  const orb3TranslateY = useRef(new Animated.Value(0)).current;
  const orb3Scale = useRef(new Animated.Value(1)).current;

  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  useEffect(() => {
    // Hide native splash screen immediately
    SplashScreen.hideAsync();

    // Floating orb animations
    const createOrbAnimation = (
      translateX: Animated.Value,
      translateY: Animated.Value,
      scale: Animated.Value,
      delay: number
    ) => {
      return Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 30,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateX, {
              toValue: -30,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -30,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateY, {
              toValue: 30,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.15,
              duration: 4000,
              delay,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(scale, {
              toValue: 0.9,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
        ])
      );
    };

    // Start orb animations
    createOrbAnimation(orb1TranslateX, orb1TranslateY, orb1Scale, 0).start();
    createOrbAnimation(orb2TranslateX, orb2TranslateY, orb2Scale, 1000).start();
    createOrbAnimation(orb3TranslateX, orb3TranslateY, orb3Scale, 2000).start();

    // Logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      // Fade out splash screen
      Animated.timing(splashFadeOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start(() => {
        setIsSplashVisible(false);
        onAnimationEnd?.();
      });
    }
  }, [isAppReady]);

  if (!isSplashVisible) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      {/* App content (hidden behind splash) */}
      <View style={styles.appContainer}>{children}</View>

      {/* Animated Splash Screen Overlay */}
      <Animated.View
        style={[
          styles.splashContainer,
          {
            opacity: splashFadeOut,
          },
        ]}
      >
        {/* Background Gradient */}
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a', '#121212']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Floating Orbs */}
        <Animated.View
          style={[
            styles.orb,
            styles.orb1,
            {
              transform: [
                { translateX: orb1TranslateX },
                { translateY: orb1TranslateY },
                { scale: orb1Scale },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.orb,
            styles.orb2,
            {
              transform: [
                { translateX: orb2TranslateX },
                { translateY: orb2TranslateY },
                { scale: orb2Scale },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.orb,
            styles.orb3,
            {
              transform: [
                { translateX: orb3TranslateX },
                { translateY: orb3TranslateY },
                { scale: orb3Scale },
              ],
            },
          ]}
        />

        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo Background with Gradient */}
          <LinearGradient
            colors={['#06b6d4', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBackground}
          >
            <View style={styles.logoIconContainer}>
              {/* Car Icon - Simple geometric shape */}
              <View style={styles.carIcon}>
                <View style={styles.carBody} />
                <View style={styles.carWindowLeft} />
                <View style={styles.carWindowRight} />
                <View style={styles.carWheelLeft} />
                <View style={styles.carWheelRight} />
              </View>
            </View>
          </LinearGradient>

          {/* Brand Name */}
          <View style={styles.brandContainer}>
            <Animated.Text
              style={[
                styles.brandText,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              AutoKeeper
            </Animated.Text>
            <Animated.Text
              style={[
                styles.tagline,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              Seu veículo em boas mãos
            </Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  // Floating Orbs
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    top: -100,
    right: -100,
  },
  orb2: {
    width: 400,
    height: 400,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    bottom: -150,
    left: -150,
  },
  orb3: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    top: height * 0.4,
    left: width * 0.6,
  },

  // Logo Container
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow/Glow
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
  },
  logoIconContainer: {
    width: 116,
    height: 116,
    borderRadius: 30,
    backgroundColor: 'rgba(18, 18, 18, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  // Car Icon (Simple geometric representation)
  carIcon: {
    width: 60,
    height: 40,
    position: 'relative',
  },
  carBody: {
    width: 60,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  carWindowLeft: {
    width: 15,
    height: 12,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 3,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  carWindowRight: {
    width: 20,
    height: 12,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 3,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  carWheelLeft: {
    width: 10,
    height: 10,
    backgroundColor: '#06b6d4',
    borderRadius: 5,
    position: 'absolute',
    bottom: -3,
    left: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  carWheelRight: {
    width: 10,
    height: 10,
    backgroundColor: '#06b6d4',
    borderRadius: 5,
    position: 'absolute',
    bottom: -3,
    right: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  // Brand Name
  brandContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  brandText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9ca3af',
    marginTop: 8,
    letterSpacing: 0.3,
  },
});
