import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, radius } from '@/constants/theme';
import { Button } from '@/components/button';
import { TextInput } from '@/components/text-input';
import { Checkbox } from '@/components/checkbox';
import { Divider } from '@/components/divider';
import { PhoneInput } from '@/features/auth/components/phone-input';
import { AmbientGlow, GaugeArc } from '@/features/auth/components/auth-decorations';
import { AuthIcon } from '@/features/auth/components/auth-icon';
import { CarLockIcon, LockIcon, GoogleIcon, AppleIcon } from '@/features/auth/components/icons';
import { useLogin } from '@/features/auth/hooks/use-login';

export default function LoginScreen() {
  const router = useRouter();
  const {
    phone,
    password,
    rememberMe,
    isLoading,
    error,
    fieldErrors,
    handlePhoneChange,
    handlePasswordChange,
    toggleRemember,
    handleLogin,
  } = useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="teal" />
      <AmbientGlow variant="amber" />
      <GaugeArc screen="login" />

      <View style={styles.header}>
        <Button variant="back" onPress={router.back} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <AuthIcon variant="amber">
          <CarLockIcon />
        </AuthIcon>

        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>
          Entre com seu celular para acessar seus veículos e lembretes.
        </Text>

        <PhoneInput
          label="CELULAR"
          value={phone}
          onChangeText={handlePhoneChange}
          error={fieldErrors.phone}
        />

        <TextInput
          label="SENHA"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          placeholder="••••••••"
          icon={<LockIcon size={18} />}
          error={fieldErrors.password}
        />

        <View style={styles.formExtras}>
          <Checkbox
            label="Lembrar de mim"
            checked={rememberMe}
            onPress={toggleRemember}
          />
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotLink}>Esqueceu a senha?</Text>
          </Pressable>
        </View>

        <Button
          label="Entrar"
          onPress={handleLogin}
          isLoading={isLoading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Divider label="ou" />

        <View style={styles.socialRow}>
          <Button variant="social" icon={<GoogleIcon size={18} />} label="Google" />
          <Button variant="social" icon={<AppleIcon size={18} />} label="Apple" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem conta? </Text>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.footerLink}>Criar conta</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060a14',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    zIndex: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#e8ecf4',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8899ae',
    lineHeight: 14 * 1.55,
    marginBottom: 26,
  },
  formExtras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  forgotLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e8a838',
  },
  errorText: {
    fontSize: 13,
    color: '#f43f5e',
    textAlign: 'center',
    marginTop: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    paddingBottom: 38,
    zIndex: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#556677',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14b8a6',
  },
});
