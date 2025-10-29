import { router } from 'expo-router';

export function useWelcomePage() {
  const handleStartFree = () => {
    router.push('/sign-up');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    console.log('Google login pressed');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple Sign In
    console.log('Apple login pressed');
  };

  const handleEmailLogin = () => {
    // Navigate to email login screen
    router.push('/login');
  };

  const handleTermsPress = () => {
    // TODO: Navigate to terms screen or open web URL
    console.log('Terms of use pressed');
    // Linking.openURL('https://autokeeper.com/terms');
  };

  const handlePrivacyPress = () => {
    // TODO: Navigate to privacy policy screen or open web URL
    console.log('Privacy policy pressed');
    // Linking.openURL('https://autokeeper.com/privacy');
  };

  return {
    handleStartFree,
    handleGoogleLogin,
    handleAppleLogin,
    handleEmailLogin,
    handleTermsPress,
    handlePrivacyPress,
  };
}
