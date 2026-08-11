import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';
import { useAuth } from '../../src/context/AuthContext';
import { mockGetProfile, mockUpdateProfile } from '@uniflow-x/utils/profile';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    semester: '',
  });

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const data = await mockGetProfile(user.id);
      setForm({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        department: data.department || '',
        semester: data.semester || '',
      });
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await mockUpdateProfile(user.id, form);
      setSuccess(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Edit Profile" showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Profile" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {success ? (
          <View style={styles.successWrap}>
            <View style={styles.successBadge}>
              <Icon name="checkCircle" size={32} color={COLORS.accentEmerald} />
            </View>
            <Text style={styles.successTitle}>Profile Updated</Text>
            <Text style={styles.successDesc}>Your changes have been saved.</Text>
          </View>
        ) : (
          <View style={styles.card}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={COLORS.textDim}
                  value={form.fullName}
                  onChangeText={(val) => setForm({ ...form, fullName: val })}
                  editable={!saving}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.textDim}
                  value={form.email}
                  onChangeText={(val) => setForm({ ...form, email: val })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!saving}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor={COLORS.textDim}
                  value={form.phone}
                  onChangeText={(val) => setForm({ ...form, phone: val })}
                  keyboardType="phone-pad"
                  editable={!saving}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Department</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Department"
                  placeholderTextColor={COLORS.textDim}
                  value={form.department}
                  onChangeText={(val) => setForm({ ...form, department: val })}
                  editable={!saving}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Semester (1-8)</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Semester"
                  placeholderTextColor={COLORS.textDim}
                  value={form.semester}
                  onChangeText={(val) => setForm({ ...form, semester: val })}
                  keyboardType="numeric"
                  editable={!saving}
                />
              </View>
            </View>

            {saving ? (
              <View style={{ marginTop: 20, paddingVertical: 14, alignItems: 'center' }}>
                <ActivityIndicator color={COLORS.primary} />
              </View>
            ) : (
              <Button
                title="Save Changes"
                variant="primary"
                onPress={handleSave}
                style={{ marginTop: 20 }}
              />
            )}
          </View>
        )}
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
  successWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  successDesc: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
