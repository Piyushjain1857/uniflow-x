import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" subtitle="Push Alerts & Updates" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="Assignment Due in 48 Hours" subtitle="Academic Alert • 2 hrs ago" badge="Urgent">
          <Text style={styles.detailText}>CS401 MapReduce Implementation due on Aug 12, 11:59 PM.</Text>
        </Card>

        <Card title="Attendance Logged (Present)" subtitle="System Sync • 5 hrs ago" badge="Course CS402">
          <Text style={styles.detailText}>Dr. Sarah Jenkins marked your lecture attendance.</Text>
        </Card>

        <Card title="UniHack 2026 Registration Open" subtitle="Campus Fest • 1 day ago" badge="Event">
          <Text style={styles.detailText}>Register your team before seats close.</Text>
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
