import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';
import { useAuth } from '../../src/context/AuthContext';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) return;
    setIsSubmitting(true);
    setError('');
    try {
      const res = await resetPassword(newPassword, confirmPassword);
      setSuccess(res.message);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reset Password" showBack />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Set New Password</Text>
          <Text style={styles.cardSubtitle}>
            Enter your new secure password below
          </Text>

          {success ? (
            <View style={styles.successWrap}>
              <View style={styles.successBadge}>
                <Icon name="checkCircle" size={24} color={COLORS.accentEmerald} />
              </View>
              <Text style={styles.successTitle}>Password Reset!</Text>
              <Text style={styles.successDesc}>
                {success} Redirecting to login...
              </Text>
            </View>
          ) : (
            <View style={styles.formGroup}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrap}>
                <Icon name="lock" size={18} color={COLORS.textDim} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor={COLORS.textDim}
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                  editable={!isSubmitting}
                />
              </View>

              <Text style={[styles.label, { marginTop: 16 }]}>Confirm New Password</Text>
              <View style={styles.inputWrap}>
                <Icon name="lock" size={18} color={COLORS.textDim} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter new password"
                  placeholderTextColor={COLORS.textDim}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!isSubmitting}
                />
              </View>

              {isSubmitting ? (
                <View style={{ marginTop: 24, paddingVertical: 14, alignItems: 'center' }}>
                  <ActivityIndicator color={COLORS.primary} />
                </View>
              ) : (
                <Button
                  title="Reset Password"
                  icon="arrowRight"
                  variant="primary"
                  onPress={handleReset}
                  style={styles.submitBtn}
                />
              )}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.backLink} onPress={() => router.push('/login')}>
          <Text style={styles.backLinkText}>Return to Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 20,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 16,
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: COLORS.textMain,
    fontSize: 14,
  },
  submitBtn: {
    marginTop: 24,
  },
  successWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  successBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  successDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  backLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  backLinkText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
