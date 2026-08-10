import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="University Events & Fests" subtitle="Campus Fests & Workshops" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="UniHack 2026 — 36hr AI Hackathon" subtitle="Sept 20 - 22 • Main Auditorium" badge="RSVP Open">
          <Text style={styles.detailText}>$25,000 cash prizes • Free meals, merch & mentorship</Text>
        </Card>

        <Card title="Robotics Expo & Drone Racing" subtitle="Aug 28 • University Ground 2" badge="Workshops">
          <Text style={styles.detailText}>Organized by IEEE Student Chapter • Live demonstrations</Text>
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
