import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';
import Icon from '../../src/components/Icon';

export default function CampusMapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Interactive Campus Map" subtitle="GPS & Building Navigation" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mapBox}>
          <Icon name="campusMap" size={40} color={COLORS.primary} />
          <Text style={styles.mapTitle}>3D Campus Wayfinding Map</Text>
          <Text style={styles.mapDesc}>Building B3 • North Sector • Live Shuttle Tracker Active</Text>
        </View>

        <Card title="Central Library" subtitle="North Block • Open 24/7" badge="Wi-Fi Hotspot" />
        <Card title="Engineering Auditorium A" subtitle="West Block • Seats 500" badge="Event Hall" />
        <Card title="Student Union Cafeteria" subtitle="Central Block • Dining" badge="Open Now" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  mapBox: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginTop: 10 },
  mapDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 4, textAlign: 'center' },
});
