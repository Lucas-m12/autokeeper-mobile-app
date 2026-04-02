import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Rect, Path } from 'react-native-svg';
import { Button } from '@/components/button';
import { TextInput } from '@/components/text-input';
import { PasswordStrength } from '@/features/auth/components/password-strength';
import { AmbientGlow, GaugeArc } from '@/features/auth/components/auth-decorations';
import { AuthIcon } from '@/features/auth/components/auth-icon';
import { useNewPassword } from '@/features/auth/hooks/use-new-password';

function LockIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Rect
        x={3}
        y={11}
        width={18}
        height={11}
        rx={2}
        stroke="#556677"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M7 11V7a5 5 0 0110 0v4"
        stroke="#556677"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export default function NewPasswordScreen() {
  const router = useRouter();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    fieldErrors,
    handleReset,
  } = useNewPassword();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AmbientGlow variant="teal" />
      <AmbientGlow variant="amber" />
      <GaugeArc screen="newPassword" />

      <View style={styles.header}>
        <Button variant="back" onPress={() => router.back()} />
      </View>

      <ScrollView style={styles.body}>
        <AuthIcon variant="teal">
          <Svg width={22} height={22} viewBox="0 0 24 24">
            <Path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />
          </Svg>
        </AuthIcon>

        <Text style={styles.title}>Nova senha</Text>
        <Text style={styles.subtitle}>
          Crie uma nova senha segura para sua conta. Use pelo menos 8 caracteres.
        </Text>

        <TextInput
          label="NOVA SENHA"
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={<LockIcon />}
          error={fieldErrors.password}
        />

        <PasswordStrength password={password} defaultLabel="Digite sua nova senha" />

        <TextInput
          label="CONFIRMAR NOVA SENHA"
          placeholder="Repita a nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          icon={<LockIcon />}
          error={fieldErrors.confirmPassword}
        />

        <View style={styles.button}>
          <Button
            variant="primary"
            label="Redefinir senha"
            onPress={handleReset}
            loading={isLoading}
          />
        </View>
      </ScrollView>
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
});
