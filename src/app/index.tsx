import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * Root index screen - handles authentication-based routing
 *
 * - If user is authenticated → redirect to /home
 * - If user is not authenticated → redirect to /welcome
 * - While checking auth state → show loading indicator
 */
export default function Index() {
  const { session, isPending } = useAuth();

  // Show loading spinner while checking authentication
  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Redirect based on authentication state
  if (session) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgBlack,
  },
});
