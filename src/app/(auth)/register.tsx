import { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  type TextInput as RNTextInputType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
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
  const { form, handleRegister, isLoading } = useRegister();

  const phoneRef = useRef<RNTextInputType>(null);
  const passwordRef = useRef<RNTextInputType>(null);
  const confirmPasswordRef = useRef<RNTextInputType>(null);

  const password = form.watch('password');

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="teal" />
      <AmbientGlow variant="amber" />
      <GaugeArc screen="register" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Button variant="back" onPress={router.back} />
        </View>

        <ScrollView
          style={styles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.bodyContent}
        >
          <AuthIcon variant="teal">
            <UserPlusIcon />
          </AuthIcon>

          <Text style={styles.title}>Criar sua conta</Text>
          <Text style={styles.subtitle}>
            É rápido e gratuito. Vamos verificar seu celular para começar.
          </Text>

          <Controller
            control={form.control}
            name="name"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextInput
                label="NOME COMPLETO"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Seu nome"
                icon={<PersonIcon size={18} />}
                error={error?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
            )}
          />

          <Controller
            control={form.control}
            name="phone"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <PhoneInput
                ref={phoneRef}
                label="CELULAR"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextInput
                ref={passwordRef}
                label="SENHA"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholder="Mínimo 8 caracteres"
                icon={<LockIcon size={18} />}
                error={error?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
            )}
          />
          <PasswordStrength password={password} />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextInput
                ref={confirmPasswordRef}
                label="CONFIRMAR SENHA"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholder="Repita a senha"
                icon={<LockIcon size={18} />}
                error={error?.message}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
            )}
          />

          <View style={styles.submitButton}>
            <Button
              variant="primary"
              label="Criar conta"
              onPress={handleRegister}
              loading={isLoading}
            />
          </View>

          <Text style={styles.termsText}>
            Ao criar uma conta, você concorda com os{'\n'}
            <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
            <Text style={styles.termsLink}>Política de Privacidade</Text>
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta? </Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.footerLink}>Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060a14',
  },
  flex: {
    flex: 1,
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
  bodyContent: {
    paddingBottom: 20,
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
    paddingTop: 20,
    paddingBottom: 14,
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
