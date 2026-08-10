import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function ExamsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Exams & Hall Tickets" subtitle="Fall 2026 Midterms" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.ticketBox}>
          <Text style={styles.ticketTitle}>Hall Ticket Issued</Text>
          <Text style={styles.ticketDesc}>Seating Hall: Block B-201 • Desk #42 • Digital Pass QR Verified</Text>
        </View>

        <Text style={styles.sectionTitle}>Midterm Exam Schedule</Text>

        <Card title="CS401 Distributed Systems" subtitle="Sept 02, 2026 • 10:00 AM - 12:00 PM" badge="Hall B">
          <Text style={styles.detailText}>Syllabus: Modules 1 to 4 • 100 Marks Written Exam</Text>
        </Card>

        <Card title="CS402 AI & Neural Networks" subtitle="Sept 04, 2026 • 02:00 PM - 04:00 PM" badge="Lab 3">
          <Text style={styles.detailText}>Practical Coding Exam + Theoretical VIVA</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  ticketBox: {
    backgroundColor: 'rgba(192, 132, 252, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.3)',
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: 16,
  },
  ticketTitle: { fontSize: 14, fontWeight: '800', color: COLORS.accentPurple },
  ticketDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 12 },
  detailText: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});
