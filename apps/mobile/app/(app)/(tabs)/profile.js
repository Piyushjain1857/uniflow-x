import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Card';
import Icon from '../../../src/components/Icon';
import Button from '../../../src/components/Button';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Student Profile" subtitle="Identity & Settings" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>AV</Text>
          </View>
          <Text style={styles.name}>Alex Vance</Text>
          <Text style={styles.dept}>B.Tech Computer Science & Eng.</Text>
          <Text style={styles.roll}>ID: CS2026-08492 • Batch of 2026</Text>

          <TouchableOpacity
            style={styles.digitalIdBtn}
            onPress={() => router.push('/(app)/digital-id')}
          >
            <Icon name="digitalId" size={18} color="#000" />
            <Text style={styles.digitalIdBtnText}>Open Digital Student ID</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Menu Options */}
        <Text style={styles.sectionTitle}>Account & Preferences</Text>

        <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/(app)/digital-id')}>
          <Icon name="digitalId" size={20} color={COLORS.primary} />
          <Text style={styles.menuLabel}>Digital ID Card & NFC Pass</Text>
          <Icon name="chevronRight" size={18} color={COLORS.textDim} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/(app)/notifications')}>
          <Icon name="notifications" size={20} color={COLORS.accentPurple} />
          <Text style={styles.menuLabel}>Push Notification Center</Text>
          <Icon name="chevronRight" size={18} color={COLORS.textDim} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/(app)/settings')}>
          <Icon name="settings" size={20} color={COLORS.accentIndigo} />
          <Text style={styles.menuLabel}>App Settings & Security</Text>
          <Icon name="chevronRight" size={18} color={COLORS.textDim} />
        </TouchableOpacity>

        {/* Sign Out */}
        <Button
          title="Sign Out of Session"
          variant="secondary"
          onPress={() => router.replace('/(auth)/login')}
          style={{ marginTop: 24 }}
        />
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
  profileCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accentIndigo,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  dept: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  roll: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  digitalIdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADII.pill,
  },
  digitalIdBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: 14,
    marginBottom: 8,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },
});
