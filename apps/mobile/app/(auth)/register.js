import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('1');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await register({ fullName, studentId, email, department, semester, password, confirmPassword });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Register Account" subtitle="Join UniFlow X Campus OS" showBack />
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Identity</Text>
            Register your university details to activate mobile features
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrap}>
              <Icon name="profile" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Alex Vance"
                placeholderTextColor={COLORS.textDim}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Student ID / Roll Number</Text>
            <View style={styles.inputWrap}>
              <Icon name="digitalId" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="CS2026-08492"
                placeholderTextColor={COLORS.textDim}
                value={studentId}
                onChangeText={setStudentId}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>University Email</Text>
            <View style={styles.inputWrap}>
              <Icon name="profile" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="alex.vance@university.edu"
                placeholderTextColor={COLORS.textDim}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Department</Text>
            <View style={styles.inputWrap}>
              <Icon name="academics" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Computer Science & Engineering"
                placeholderTextColor={COLORS.textDim}
                value={department}
                onChangeText={setDepartment}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Semester (1-8)</Text>
            <View style={styles.inputWrap}>
              <Icon name="academics" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="1"
                placeholderTextColor={COLORS.textDim}
                value={semester}
                onChangeText={setSemester}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Create Security Password</Text>
            <View style={styles.inputWrap}>
              <Icon name="lock" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Minimum 8 characters"
                placeholderTextColor={COLORS.textDim}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrap}>
              <Icon name="lock" size={18} color={COLORS.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor={COLORS.textDim}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          {isSubmitting ? (
            <View style={{ marginTop: 10, paddingVertical: 14, alignItems: 'center' }}>
              <ActivityIndicator color={COLORS.primary} />
            </View>
          ) : (
            <Button
              title="Complete Registration"
              icon="arrowRight"
              variant="primary"
              onPress={handleRegister}
              style={styles.submitBtn}
            />
          )}
        </View>

        <View style={styles.footerLinkWrap}>
          <Text style={styles.footerText}>Already registered? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkHighlight}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
});
