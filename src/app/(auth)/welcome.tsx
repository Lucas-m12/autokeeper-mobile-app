import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { BrandLogo } from '@/components/brand-logo';
import { NightIllustration } from '@/features/auth/components/night-illustration';
import {
  AmbientGlow,
  FloatingParticles,
} from '@/features/auth/components/auth-decorations';

const BG_DEEP = '#060a14';
const AMBER = '#e8a838';
const TEXT_PRIMARY = '#e8ecf4';
const TEXT_SECONDARY = '#8899ae';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.decorations} pointerEvents="none">
        <AmbientGlow variant="teal" />
        <AmbientGlow variant="amber" />
        <FloatingParticles />
      </View>

      <View style={styles.illustrationArea}>
        <NightIllustration />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.logoRow}>
          <BrandLogo size="nav" />
        </View>

        <Text style={styles.heading}>
          {'Seu veículo,\n'}
          <Text style={styles.headingAmber}>sob controle.</Text>
        </Text>

        <Text style={styles.description}>
          IPVA, seguro, manutenção e mais. Lembretes inteligentes para nunca
          perder um prazo.
        </Text>

        <View style={styles.buttons}>
          <Button
            variant="primary"
            label="Entrar na conta"
            onPress={() => router.push('/login')}
          />
          <Button
            variant="outline"
            label="Criar conta gratuita"
            onPress={() => router.push('/register')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG_DEEP,
  },
  decorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 44,
  },
  logoRow: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.5,
    color: TEXT_PRIMARY,
    marginBottom: 10,
  },
  headingAmber: {
    color: AMBER,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
    color: TEXT_SECONDARY,
    marginBottom: 28,
  },
  buttons: {
    gap: 12,
  },
});
