import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function AssignmentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Assignments" subtitle="3 Pending Tasks" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Pending Deadlines</Text>

        <Card title="Assignment #4 — MapReduce" subtitle="CS401 • Due Aug 12, 11:59 PM" badge="2 Days Left">
          <Text style={styles.detailText}>Max Score: 100 Pts • Submit GitHub repository URL</Text>
        </Card>

        <Card title="Project Milestone 2 — Model Training" subtitle="CS402 • Due Aug 15, 05:00 PM" badge="Team Task">
          <Text style={styles.detailText}>Submit PyTorch Jupyter notebook & accuracy logs</Text>
        </Card>

        <Card title="Cloud Infrastructure Lab #3" subtitle="CS405 • Due Aug 18, 11:59 PM" badge="Upcoming">
          <Text style={styles.detailText}>Kubernetes Helm Chart Deployment</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 12 },
  detailText: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});
