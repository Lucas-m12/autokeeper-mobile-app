import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LogOut } from 'lucide-react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

/**
 * Home Screen - Placeholder for authenticated users
 *
 * TODO: Replace this with your actual home/dashboard screen
 * This is a temporary screen to demonstrate successful authentication
 */
export default function HomeScreen() {
  const { session, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.replace('/welcome');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Bem-vindo ao AutoKeeper!</Text>
            <Text style={styles.subtitle}>
              Você está autenticado como:
            </Text>
            <View style={styles.userCard}>
              <Text style={styles.userEmail}>
                {session?.user?.email || 'Usuário'}
              </Text>
              {session?.user?.name && (
                <Text style={styles.userName}>{session.user.name}</Text>
              )}
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.infoText}>
              Esta é uma tela temporária para demonstrar que a autenticação
              está funcionando corretamente.
            </Text>
            <Text style={styles.infoText}>
              A integração com o better-auth foi concluída com sucesso!
            </Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton
              title="Sair"
              onPress={handleSignOut}
              loading={isLoggingOut}
              icon={<LogOut size={20} color="white" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing['4xl'],
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  title: {
    fontSize: Typography.h1.fontSize,
    fontWeight: Typography.h1.fontWeight,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.textGrayLight,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: Colors.surfaceDark,
    borderRadius: 16,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    minWidth: '100%',
  },
  userEmail: {
    fontSize: Typography.body.fontSize,
    fontWeight: '600',
    color: Colors.primaryLight,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textGrayLight,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  infoText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.body.lineHeight,
  },
  actions: {
    marginTop: Spacing['4xl'],
  },
});
