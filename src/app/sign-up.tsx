import React from 'react';
import { Controller } from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppleIcon } from '@/assets/icons/apple';
import { GoogleIcon } from '@/assets/icons/google';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useSignupPage } from '@/hooks/pages/use-signup-page';

export default function SignupScreen() {
  const {
    control,
    errors,
    isLoading,
    handleSignup,
    handleGoogleSignup,
    handleAppleSignup,
    handleBackPress,
    handleLoginPress,
    handleTermsPress,
    handlePrivacyPress,
  } = useSignupPage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.containerContent}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoGlow}>
                <LogoIcon size={64} />
              </View>
              <Text style={styles.title}>Criar conta</Text>
              <Text style={styles.subtitle}>
                Comece a organizar seus veículos hoje
              </Text>
            </View>

            {/* Sign Up Form */}
            <View style={styles.form}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Nome"
                    placeholder="Como podemos te chamar?"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="E-mail"
                    placeholder="seu@email.com.br"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Senha"
                    placeholder="Mínimo 8 caracteres"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoComplete="password"
                    error={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Confirmar senha"
                    placeholder="Digite a senha novamente"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoComplete="password"
                    error={errors.confirmPassword?.message}
                  />
                )}
              />

              {/* Terms Checkbox */}
              <View style={styles.checkboxContainer}>
                <Controller
                  control={control}
                  name="termsAccepted"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      label={
                        <Text style={styles.checkboxLabel}>
                          Concordo com os{' '}  
                          <Text onPress={handleTermsPress} style={styles.checkboxLink}>Termos de Uso</Text>
                          {' e a '}
                          <Text onPress={handlePrivacyPress} style={styles.checkboxLink}>Política de Privacidade</Text>
                          {' da AutoKeeper.'}
                        </Text>
                      }
                    />
                  )}
                />
                {errors.termsAccepted && (
                  <Text style={styles.errorText}>{errors.termsAccepted.message}</Text>
                )}
              </View>

              <PrimaryButton
                title="Criar conta grátis"
                onPress={handleSignup}
                loading={isLoading}
                style={styles.signupButton}
              />
            </View>

            <Divider label="ou cadastre-se com" />

            {/* Social Sign Up Buttons */}
            <View style={styles.socialButtons}>
              <SecondaryButton
                title="Google"
                onPress={handleGoogleSignup}
                icon={<GoogleIcon />}
              />
              <SecondaryButton
                title="Apple"
                onPress={handleAppleSignup}
                icon={<AppleIcon />}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Já tem uma conta?{' '}
                  <Text 
                    style={styles.footerLink} 
                    onPress={handleLoginPress}
                  >
                    Entrar
                  </Text>
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
    position: 'relative',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceDark,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderStyle: 'solid',
  },
  backButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: '500' as const,
    color: Colors.primaryLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
    paddingBottom: Spacing['4xl'],
    paddingTop: Spacing['4xl'],
  },
  containerContent: {
    paddingHorizontal: Spacing['2xl'],
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  logoGlow: {
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 20,
  },
  title: {
    fontSize: Typography.h2.fontSize,
    fontWeight: Typography.h2.fontWeight,
    color: Colors.textWhite,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xs,
    letterSpacing: Typography.h2.letterSpacing,
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: '500' as const,
    color: Colors.textGrayLight,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  checkboxContainer: {
    marginTop: -Spacing.xs,
  },
  checkboxLabel: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textGrayLight,
    lineHeight: 20,
  },
  checkboxLink: {
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: '600' as const,
    color: Colors.primaryLight,
  },
  errorText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.error,
    marginTop: Spacing.xss,
    marginLeft: 34, // Align with checkbox label
  },
  signupButton: {
    marginTop: Spacing.sm,
  },
  socialButtons: {
    gap: Spacing.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing['3xl'],
    gap: Spacing.sm,
    textAlign: 'center',
  },
  footerText: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textMuted,
  },
  footerLink: {
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: '600' as const,
    color: Colors.primaryLight,
  },
});
