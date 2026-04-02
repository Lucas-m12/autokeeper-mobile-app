import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, radius } from '@/constants/theme';
import { Button } from '@/components/button';
import { TextInput } from '@/components/text-input';
import { PhoneInput } from '@/features/auth/components/phone-input';
import { PasswordStrength } from '@/features/auth/components/password-strength';
import { AmbientGlow, GaugeArc } from '@/features/auth/components/auth-decorations';
import { AuthIcon } from '@/features/auth/components/auth-icon';
import { UserPlusIcon, PersonIcon, LockIcon } from '@/features/auth/components/icons';
import { useRegister } from '@/features/auth/hooks/use-register';

export default function RegisterScreen() {
  const router = useRouter();
  const {
    name,
    phone,
    password,
    confirmPassword,
    isLoading,
    fieldErrors,
    handleNameChange,
    handlePhoneChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
  } = useRegister();

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="teal" />
      <AmbientGlow variant="amber" />
      <GaugeArc screen="register" />

      <View style={styles.header}>
        <Button variant="back" onPress={router.back} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <AuthIcon variant="teal">
          <UserPlusIcon />
        </AuthIcon>

        <Text style={styles.title}>Criar sua conta</Text>
        <Text style={styles.subtitle}>
          É rápido e gratuito. Vamos verificar seu celular para começar.
        </Text>

        <TextInput
          label="NOME COMPLETO"
          value={name}
          onChangeText={handleNameChange}
          placeholder="Seu nome"
          icon={<PersonIcon size={18} />}
          error={fieldErrors.name}
        />

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
          placeholder="Mínimo 8 caracteres"
          icon={<LockIcon size={18} />}
          error={fieldErrors.password}
        />
        <PasswordStrength password={password} />

        <TextInput
          label="CONFIRMAR SENHA"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
          placeholder="Repita a senha"
          icon={<LockIcon size={18} />}
          error={fieldErrors.confirmPassword}
        />

        <Button
          label="Criar conta"
          onPress={handleRegister}
          isLoading={isLoading}
          style={styles.submitButton}
        />

        <Text style={styles.termsText}>
          Ao criar uma conta, você concorda com os{'\n'}
          <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
          <Text style={styles.termsLink}>Política de Privacidade</Text>
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem conta? </Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={styles.footerLink}>Entrar</Text>
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
  submitButton: {
    marginTop: 6,
  },
  termsText: {
    fontSize: 12,
    color: '#556677',
    textAlign: 'center',
    lineHeight: 12 * 1.6,
    marginTop: 14,
  },
  termsLink: {
    color: '#14b8a6',
    fontWeight: '500',
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
