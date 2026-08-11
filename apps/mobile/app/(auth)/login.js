import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Navigate into main app
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBox}>
          <View style={styles.logoBadge}>
            <Icon name="sparkles" size={28} color="#000" />
          </View>
          <Text style={styles.appName}>UniFlow X</Text>
          <Text style={styles.tagline}>Mobile Campus Operating System</Text>
        </View>

        {/* Role Picker Tabs */}
        <View style={styles.roleTabs}>
          {['student', 'faculty', 'admin'].map((role) => (
            <TouchableOpacity
              key={role}
              onPress={() => setSelectedRole(role)}
              style={[
                styles.roleTab,
                selectedRole === role && styles.roleTabActive,
              ]}
            >
              <Text
                style={[
                  styles.roleTabText,
                  selectedRole === role && styles.roleTabTextActive,
                ]}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>
          <Text style={styles.cardSubtitle}>
            Enter your university credentials to access {selectedRole} portal
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>University Email / NetID</Text>
            <View style={styles.inputWrap}>
              <Icon name="profile" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="student@university.edu"
                placeholderTextColor={COLORS.textDim}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Security Password</Text>
              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text style={styles.forgotLink}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrap}>
              <Icon name="lock" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor={COLORS.textDim}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <Button
            title={`Sign In to ${selectedRole.toUpperCase()}`}
            icon="arrowRight"
            variant="primary"
            onPress={handleLogin}
            style={{ marginTop: 24 }}
          />

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have a campus account?</Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.demoFastBtn}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.skipText}>Skip Login (Demo Mode)</Text>
          <Icon name="chevronRight" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    padding: SPACING.md,
    justifyContent: 'center',
    minHeight: '100%',
  },
  brandBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: RADII.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
    marginBottom: 16,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: RADII.sm,
  },
  roleTabActive: {
    backgroundColor: COLORS.bgCardHover,
    borderWidth: 1,
    borderColor: COLORS.borderActive,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  roleTabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
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
  footerLinkWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  linkHighlight: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
