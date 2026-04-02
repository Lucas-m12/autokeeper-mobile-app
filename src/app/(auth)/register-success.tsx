import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, radius } from '@/constants/theme';
import { Button } from '@/components/button';
import { SuccessCheck } from '@/features/auth/components/success-check';
import { AmbientGlow } from '@/features/auth/components/auth-decorations';
import { PlusIcon } from '@/features/auth/components/icons';

export default function RegisterSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <AmbientGlow variant="center" />

      <View style={styles.body}>
        <SuccessCheck variant="teal" />

        <Text style={styles.title}>Conta criada!</Text>

        <Text style={styles.subtitle}>
          Bem-vindo ao <Text style={styles.brandWhite}>Auto</Text>
          <Text style={styles.brandAmber}>Keeper</Text>. Seu celular foi verificado
          com sucesso.
        </Text>

        <Text style={styles.description}>
          Adicione seu primeiro veículo para começar a receber lembretes
          inteligentes.
        </Text>

        <View style={styles.primaryButton}>
          <Button
            variant="primary"
            label="Adicionar meu veículo"
            icon={<PlusIcon size={18} />}
            onPress={() => router.replace('/(tabs)')}
          />
        </View>

        <Pressable onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Fazer isso depois</Text>
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#e8ecf4',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8899ae',
    lineHeight: 14 * 1.55,
    textAlign: 'center',
    marginBottom: 12,
    maxWidth: 280,
  },
  brandWhite: {
    color: '#e8ecf4',
    fontWeight: '700',
  },
  brandAmber: {
    color: '#e8a838',
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: '#556677',
    lineHeight: 14 * 1.5,
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 260,
  },
  primaryButton: {
    maxWidth: 300,
    width: '100%',
    marginBottom: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#556677',
    padding: 8,
  },
});
