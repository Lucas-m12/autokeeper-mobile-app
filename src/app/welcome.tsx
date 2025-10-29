import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppleIcon } from '@/assets/icons/apple';
import { GoogleIcon } from '@/assets/icons/google';
import { Divider } from '@/components/ui/Divider';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useWelcomePage } from '@/hooks/pages/use-welcome-page';
import { ArrowRightIcon, MailIcon } from 'lucide-react-native';

export default function WelcomeScreen() {
  const {
    handleStartFree,
    handleGoogleLogin,
    handleAppleLogin,
    handleEmailLogin,
    handleTermsPress,
    handlePrivacyPress,
  } = useWelcomePage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.containerContent}>
            {/* Logo Section with Glow */}
            <View style={styles.logoSection}>
              <View style={styles.logoGlow}>
                <LogoIcon size={80} />
              </View>
              <Text style={styles.brandName}>
                Auto<Text style={styles.brandNameAccent}>Keeper</Text>
              </Text>
              <Text style={styles.tagline}>Mantenha seus veículos em dia</Text>
              <Text style={styles.description}>
                Crie lembretes para IPVA, licenciamento e manutenção. Acompanhe
                vencimentos no app e marque como concluído.
              </Text>
            </View>

            {/* Primary CTA */}
            <View style={styles.ctaSection}>
              <PrimaryButton
                title="Começar grátis"
                onPress={handleStartFree}
                icon={<ArrowRightIcon size={20} color="white" />}
                style={styles.startButton}
              />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtons}>
              <SecondaryButton
                title="Continuar com Google"
                onPress={handleGoogleLogin}
                icon={<GoogleIcon />}
              />
              <SecondaryButton
                title="Continuar com Apple"
                onPress={handleAppleLogin}
                icon={<AppleIcon />}
              />
            </View>

            <Divider label="ou" />

            {/* Email Login Button */}
            <View style={styles.emailButton}>
              <SecondaryButton
                title="Continuar com E-mail"
                onPress={handleEmailLogin}
                icon={<MailIcon size={24} color={Colors.textWhite} />}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Ao continuar, você concorda com nossos{' '}
                <Pressable onPress={handleTermsPress}>
                  <Text style={styles.footerLink}>Termos de Uso</Text>
                </Pressable>
                  <Text style={styles.footerText}>{' e '}</Text >
                <Pressable onPress={handlePrivacyPress}>
                  <Text style={styles.footerLink}>Política de Privacidade</Text>
                </Pressable>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  patternOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.03,
    backgroundColor: 'transparent',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
    paddingVertical: Spacing['sm'],
  },
  containerContent: {
    paddingHorizontal: Spacing['2xl'],
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  logoGlow: {
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 20,
  },
  brandName: {
    fontSize: Typography.h1.fontSize,
    fontWeight: Typography.h1.fontWeight,
    color: Colors.textWhite,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    letterSpacing: Typography.h1.letterSpacing,
  },
  brandNameAccent: {
    color: Colors.primaryLight,
  },
  tagline: {
    fontSize: Typography.h3.fontSize,
    fontWeight: '500' as const,
    color: Colors.textGrayLight,
    marginBottom: Spacing.lg,
  },
  description: {
    fontSize: Typography.body.fontSize,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.body.lineHeight,
    paddingHorizontal: Spacing.md,
  },
  ctaSection: {
    marginBottom: Spacing.xl,
  },
  startButton: {
    marginTop: 0,
  },
  socialButtons: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  emailButton: {
    marginTop: Spacing.lg,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textMuted,
    textAlign: 'center',
    // lineHeight: 20,
  },
  footerLink: {
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: '600' as const,
    color: Colors.primaryLight,
  },
});
