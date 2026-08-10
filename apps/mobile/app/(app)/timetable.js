import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';

export default function TimetableScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Weekly Timetable" subtitle="Fall 2026 Schedule" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Monday</Text>
        <Card title="CS401 Distributed Systems" subtitle="09:00 AM - 10:30 AM" badge="Room 304B" />
        <Card title="CS402 AI & Neural Networks" subtitle="11:30 AM - 01:00 PM" badge="Lab 2" />

        <Text style={styles.sectionTitle}>Tuesday</Text>
        <Card title="CS405 Cloud Infrastructure" subtitle="10:00 AM - 11:30 AM" badge="Room 102" />
        <Card title="Math301 Advanced Calculus" subtitle="02:00 PM - 03:30 PM" badge="Auditorium C" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginTop: 10, marginBottom: 8 },
});
