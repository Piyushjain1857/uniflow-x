import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function ComplaintsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Grievance & Helpdesk" subtitle="Hostel & Academic Support" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="Ticket #4092 — Hostel Wi-Fi Latency" subtitle="Hostel B Room 304 • IT Infrastructure" badge="In Progress">
          <Text style={styles.detailText}>Assigned to IT Network Operations Team • Est Resolution: 4 hrs</Text>
        </Card>

        <Card title="Ticket #3812 — Library Air Condition Unit" subtitle="3rd Floor Quiet Zone" badge="Resolved">
          <Text style={styles.detailText}>Maintenance completed on Aug 05, 2026</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  detailText: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});
