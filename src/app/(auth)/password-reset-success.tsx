import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/button';
import { SuccessCheck } from '@/features/auth/components/success-check';
import { AmbientGlow } from '@/features/auth/components/auth-decorations';
import { LoginArrowIcon } from '@/features/auth/components/icons';

export default function PasswordResetSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AmbientGlow variant="center" style={{ backgroundColor: 'rgba(16,185,129,0.04)' }} />

      <View style={styles.body}>
        <SuccessCheck variant="green" />

        <Text style={styles.title}>Senha redefinida!</Text>
        <Text style={styles.subtitle}>
          Sua senha foi alterada com sucesso. Agora você pode entrar com a nova
          senha.
        </Text>

        <View style={styles.button}>
          <Button
            variant="primary"
            label="Ir para o login"
            icon={<LoginArrowIcon size={18} />}
            onPress={() => router.replace('/login')}
          />
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#e8ecf4',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8899ae',
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 260,
    lineHeight: 22,
  },
  button: {
    maxWidth: 280,
    width: '100%',
  },
});
