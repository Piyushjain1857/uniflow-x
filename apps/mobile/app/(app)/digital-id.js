import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';

export default function DigitalIdScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Digital Student ID" subtitle="NFC & Gate Pass" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.idCard}>
          <View style={styles.idHeader}>
            <Icon name="sparkles" size={24} color="#000" />
            <Text style={styles.idHeaderTitle}>UniFlow X Pass</Text>
            <View style={styles.validBadge}>
              <Text style={styles.validText}>Active 2026</Text>
            </View>
          </View>

          <View style={styles.idBody}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AV</Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.studentName}>Alex Vance</Text>
              <Text style={styles.studentDept}>Computer Science & Eng.</Text>
              <Text style={styles.studentId}>Roll: CS2026-08492</Text>
            </View>
          </View>

          <View style={styles.qrArea}>
            <View style={styles.qrBox}>
              <Icon name="digitalId" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.qrText}>Encrypted NFC / QR Gate Pass Verified</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md, alignItems: 'center' },
  idCard: {
    width: '100%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.borderActive,
    padding: SPACING.lg,
  },
  idHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  idHeaderTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
  },
  validBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADII.pill,
  },
  validText: {
    color: COLORS.accentEmerald,
    fontSize: 10,
    fontWeight: '800',
  },
  idBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accentIndigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  infoWrap: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  studentDept: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  studentId: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  qrArea: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 20,
  },
  qrBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  qrText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
});
