import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, radius } from '@/constants/theme';
import { Button } from '@/components/button';
import { OtpInput } from '@/features/auth/components/otp-input';
import { AmbientGlow, OtpDeco } from '@/features/auth/components/auth-decorations';
import { PhoneIcon } from '@/features/auth/components/icons';
import { useOtp } from '@/features/auth/hooks/use-otp';

export default function OtpScreen() {
  const router = useRouter();
  const {
    flow,
    phone,
    code,
    isLoading,
    error,
    timer,
    handleCodeChange,
    handleVerify,
    handleResend,
  } = useOtp();

  const isRegister = flow === 'register';

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="center" />
      <OtpDeco />

      <View style={styles.header}>
        <Button variant="back" onPress={router.back} />
      </View>

      <View style={styles.body}>
        <View
          style={[
            styles.iconContainer,
            isRegister ? styles.iconTeal : styles.iconAmber,
          ]}
        >
          <PhoneIcon
            size={30}
            color={isRegister ? '#14b8a6' : '#e8a838'}
          />
        </View>

        <Text style={styles.title}>
          {isRegister ? 'Verificar celular' : 'Código de verificação'}
        </Text>

        <Text style={styles.subtitle}>Enviamos um código SMS para</Text>

        <Text style={styles.phoneDisplay}>{phone}</Text>
        <Text style={styles.hint}>Digite o código de 6 dígitos</Text>

        <OtpInput value={code} onChange={handleCodeChange} />

        <Button
          label="Verificar"
          onPress={handleVerify}
          isLoading={isLoading}
          style={styles.verifyButton}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.timerContainer}>
          {timer.canResend ? (
            <Pressable onPress={handleResend}>
              <Text style={styles.resendLink}>Reenviar código</Text>
            </Pressable>
          ) : (
            <Text style={styles.timerText}>
              Reenviar código em <Text style={styles.timerBold}>{timer.formatted}</Text>
            </Text>
          )}
        </View>

        <Pressable onPress={router.back} style={styles.altAction}>
          <Text style={styles.altActionText}>Usar outro número</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
    zIndex: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconTeal: {
    backgroundColor: 'rgba(20,184,166,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(20,184,166,0.12)',
  },
  iconAmber: {
    backgroundColor: 'rgba(232,168,56,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.12)',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#e8ecf4',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8899ae',
    textAlign: 'center',
    marginBottom: 8,
  },
  phoneDisplay: {
    fontSize: 15,
    color: '#e8ecf4',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  hint: {
    fontSize: 13,
    color: '#556677',
    textAlign: 'center',
    marginBottom: 28,
  },
  verifyButton: {
    maxWidth: 280,
    width: '100%',
  },
  errorText: {
    fontSize: 13,
    color: '#f43f5e',
    textAlign: 'center',
    marginTop: 12,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#556677',
  },
  timerBold: {
    color: '#14b8a6',
    fontWeight: '600',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e8a838',
  },
  altAction: {
    marginTop: 16,
    padding: 8,
  },
  altActionText: {
    fontSize: 13,
    color: '#556677',
  },
});
