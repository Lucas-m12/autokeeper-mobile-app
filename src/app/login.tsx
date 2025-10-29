import React from 'react';
import { Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
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
import { Input } from '@/components/ui/Input';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useLoginPage } from '@/hooks/pages/use-login-page';

export default function LoginScreen() {
  const {
    control,
    errors,
    isLoading,
    handleLogin,
    handleGoogleLogin,
    handleAppleLogin,
    handleForgotPassword,
    handleCreateAccount
  } = useLoginPage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.containerContent}>
              <View style={styles.logoSection}>
                <LogoIcon size={64} />
                <Text style={styles.brandName}>
                  Auto<Text style={styles.brandNameAccent}>Keeper</Text>
                </Text>
                <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
              </View>
              <View style={styles.form}>
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
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      autoComplete="password"
                      error={errors.password?.message}
                    />
                  )}
                />

                <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </Pressable>

                <PrimaryButton
                  title="Entrar"
                  onPress={handleLogin}
                  loading={isLoading}
                  style={styles.loginButton}
                />
              </View>

              <Divider label="ou continuar com" />

              {/* Social Login Buttons */}
              <View style={styles.socialButtons}>
                <SecondaryButton
                  title="Google"
                  onPress={handleGoogleLogin}
                  icon={<GoogleIcon />}
                />
                <SecondaryButton
                  title="Apple"
                  onPress={handleAppleLogin}
                  icon={<AppleIcon />}
                  style={styles.appleButton}
                />
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Não tem uma conta?{' '}
                  <Text onPress={handleCreateAccount} style={styles.footerLink}>Criar conta</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
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
  },
  containerContent: {
    paddingHorizontal: Spacing['2xl'],
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['xl'],
  },
  brandName: {
    fontSize: Typography.h2.fontSize,
    fontWeight: Typography.h2.fontWeight,
    color: Colors.textWhite,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    letterSpacing: Typography.h2.letterSpacing,
  },
  brandNameAccent: {
    color: Colors.primaryLight,
  },
  welcomeText: {
    fontSize: Typography.body.fontSize,
    fontWeight: '500' as const,
    color: Colors.textGrayLight,
  },
  form: {
    gap: Spacing.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.link.fontSize,
    fontWeight: Typography.link.fontWeight,
    color: Colors.primaryLight,
  },
  loginButton: {
    marginTop: Spacing.sm,
  },
  socialButtons: {
    gap: Spacing.md,
  },
  appleButton: {
    marginTop: 0,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing['3xl'],
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
