import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleReset = () => {
    if (email) setSent(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Password Recovery" showBack />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reset Credentials</Text>
          <Text style={styles.cardSubtitle}>
            Enter your university email address to receive a secure recovery key.
          </Text>

          {sent ? (
            <View style={styles.successWrap}>
              <View style={styles.successBadge}>
                <Icon name="sparkles" size={24} color={COLORS.accentEmerald} />
              </View>
              <Text style={styles.successTitle}>Recovery Sent!</Text>
              <Text style={styles.successDesc}>
                Instructions sent to {email}. Check your inbox.
              </Text>
              <Button
                title="Back to Sign In"
                variant="primary"
                onPress={() => router.push('/(auth)/login')}
                style={{ width: '100%', marginTop: 14 }}
              />
            </View>
          ) : (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Registered Email</Text>
                <View style={styles.inputWrap}>
                  <Icon name="profile" size={18} color={COLORS.textDim} />
                  <TextInput
                    style={styles.input}
                    placeholder="student@university.edu"
                    placeholderTextColor={COLORS.textDim}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <Button
                title="Send Recovery Key"
                icon="arrowRight"
                variant="primary"
                onPress={handleReset}
                style={styles.submitBtn}
              />
            </>
          )}
        </View>

        <TouchableOpacity style={styles.backLink} onPress={() => router.push('/(auth)/login')}>
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
    marginTop: 10,
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
