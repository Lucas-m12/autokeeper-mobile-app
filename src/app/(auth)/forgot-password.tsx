import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { Button } from '@/components/button';
import { PhoneInput } from '@/features/auth/components/phone-input';
import { AmbientGlow, GaugeArc } from '@/features/auth/components/auth-decorations';
import { AuthIcon } from '@/features/auth/components/auth-icon';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { phone, setPhone, isLoading, error, handleSendCode } =
    useForgotPassword();

  const isPhoneError = error?.includes('Número');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AmbientGlow variant="amber" />
      <AmbientGlow variant="teal" />
      <GaugeArc screen="forgot" />

      <View style={styles.header}>
        <Button variant="back" onPress={() => router.back()} />
      </View>

      <View style={styles.body}>
        <AuthIcon variant="amber">
          <Svg width={22} height={22} viewBox="0 0 24 24">
            <Rect
              x={3}
              y={11}
              width={18}
              height={11}
              rx={2}
              stroke="#e8a838"
              strokeWidth={2}
              fill="none"
            />
            <Path
              d="M7 11V7a5 5 0 0110 0v4"
              stroke="#e8a838"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />
            <Circle
              cx={12}
              cy={15}
              r={1}
              stroke="#e8a838"
              strokeWidth={2}
              fill="none"
            />
          </Svg>
        </AuthIcon>

        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.subtitle}>
          Sem problemas! Digite seu número de celular e enviaremos um código para
          redefinir sua senha.
        </Text>

        <PhoneInput
          label="CELULAR CADASTRADO"
          value={phone}
          onChangeText={setPhone}
          error={isPhoneError ? error : undefined}
        />

        <View style={styles.button}>
          <Button
            variant="primary"
            label="Enviar código"
            onPress={handleSendCode}
            loading={isLoading}
          />
        </View>

        {error && !isPhoneError && (
          <Text style={styles.generalError}>{error}</Text>
        )}

        <View style={styles.helpRow}>
          <Text style={styles.helpText}>Lembrou a senha? </Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text style={styles.helpLink}>Voltar ao login</Text>
          </Pressable>
        </View>
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
  },
  body: {
    paddingHorizontal: 30,
    paddingTop: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#e8ecf4',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8899ae',
    lineHeight: 22,
    marginBottom: 26,
  },
  button: {
    marginTop: 10,
  },
  generalError: {
    fontSize: 13,
    color: '#f43f5e',
    textAlign: 'center',
    marginTop: 12,
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  helpText: {
    fontSize: 13,
    color: '#556677',
  },
  helpLink: {
    fontSize: 13,
    color: '#14b8a6',
    fontWeight: '600',
  },
});
