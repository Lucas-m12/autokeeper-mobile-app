import { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type TextInput as RNTextInputType,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Divider } from '@/components/divider';
import { TextInput } from '@/components/text-input';
import { AmbientGlow, GaugeArc } from '@/features/auth/components/auth-decorations';
import { AuthIcon } from '@/features/auth/components/auth-icon';
import { AppleIcon, CarLockIcon, GoogleIcon, LockIcon } from '@/features/auth/components/icons';
import { PhoneInput } from '@/features/auth/components/phone-input';
import { useLogin } from '@/features/auth/hooks/use-login';

export default function LoginScreen() {
  const router = useRouter();
  const { form, rememberMe, toggleRemember, handleLogin, isLoading, error } =
    useLogin();

  const passwordRef = useRef<RNTextInputType>(null);

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="teal" />
      <AmbientGlow variant="amber" />
      <GaugeArc screen="login" />

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
          <AuthIcon variant="amber">
            <CarLockIcon />
          </AuthIcon>

          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>
            Entre com seu celular para acessar seus veículos e lembretes.
          </Text>

          <Controller
            control={form.control}
            name="phone"
            render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
              <PhoneInput
                label="CELULAR"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={fieldError?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
              <TextInput
                ref={passwordRef}
                label="SENHA"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholder="••••••••"
                icon={<LockIcon size={18} />}
                error={fieldError?.message}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            )}
          />

          <View style={styles.formExtras}>
            <Checkbox
              label="Lembrar de mim"
              checked={rememberMe}
              onToggle={toggleRemember}
            />
            <Pressable onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotLink}>Esqueceu a senha?</Text>
            </Pressable>
          </View>

          <Button
            variant="primary"
            label="Entrar"
            onPress={handleLogin}
            loading={isLoading}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Divider />

          <View style={styles.socialRow}>
            <View style={styles.socialButtonCell}>
              <Button
                variant="social"
                icon={<GoogleIcon size={18} />}
                label="Google"
                fullWidth
                onPress={() => {}}
              />
            </View>
            <View style={styles.socialButtonCell}>
              <Button
                variant="social"
                icon={<AppleIcon size={18} />}
                label="Apple"
                fullWidth
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem conta? </Text>
            <Pressable onPress={() => router.push('/register')}>
              <Text style={styles.footerLink}>Criar conta</Text>
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
    alignSelf: 'stretch',
  },
  socialButtonCell: {
    flex: 1,
    minWidth: 0,
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
