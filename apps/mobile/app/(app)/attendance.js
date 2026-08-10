import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function AttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Smart Attendance" subtitle="92.4% Overall Attendance" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Requirement Status</Text>
          <Text style={styles.statVal}>75% Minimum Threshold Exceeded</Text>
        </View>

        <Text style={styles.sectionTitle}>Subject-wise Log</Text>

        <Card title="CS401 — Distributed Systems" subtitle="28 of 30 Lectures Attended" badge="93.3% Safe">
          <Text style={styles.detailText}>Last marked: Today 09:00 AM (Present)</Text>
        </Card>

        <Card title="CS402 — Deep Learning" subtitle="26 of 28 Lectures Attended" badge="92.8% Safe">
          <Text style={styles.detailText}>Last marked: Aug 08 11:30 AM (Present)</Text>
        </Card>

        <Card title="CS405 — Cloud Infrastructure" subtitle="18 of 18 Lectures Attended" badge="100% Perfect">
          <Text style={styles.detailText}>Last marked: Aug 07 10:00 AM (Present)</Text>
        </Card>

        <Card title="Math301 — Advanced Calculus" subtitle="22 of 25 Lectures Attended" badge="88.0% Safe">
          <Text style={styles.detailText}>Last marked: Aug 05 02:00 PM (Medical Leave Approved)</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  statBox: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: 16,
  },
  statLabel: { fontSize: 11, color: COLORS.textMuted },
  statVal: { fontSize: 15, fontWeight: '800', color: COLORS.accentEmerald, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 12 },
  detailText: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});
