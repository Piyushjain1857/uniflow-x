import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function ClubsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Societies & Clubs" subtitle="32 Active Societies" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="ACM Student Chapter" subtitle="Tech & Coding Club" badge="Active Member">
          <Text style={styles.detailText}>Weekly algorithmic challenges, hackathons, and mock interviews.</Text>
        </Card>

        <Card title="UX & Product Design Guild" subtitle="Creative Design Guild" badge="Open Membership">
          <Text style={styles.detailText}>Figma workshops, design teardowns, and portfolio reviews.</Text>
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
