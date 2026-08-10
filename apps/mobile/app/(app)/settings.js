import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings & Preferences" subtitle="System Configuration" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>App Preferences</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Cyber Theme</Text>
          <Switch value={true} trackColor={{ true: COLORS.primary }} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Push Notifications</Text>
          <Switch value={true} trackColor={{ true: COLORS.primary }} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Biometric NFC Lock</Text>
          <Switch value={true} trackColor={{ true: COLORS.primary }} />
        </View>

        <Text style={styles.sectionTitle}>System Info</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>UniFlow X Mobile Kernel v1.0.0-EXPO</Text>
          <Text style={styles.infoSub}>Expo Router v3.5 • React Native 0.74.5</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  scrollContent: { padding: SPACING.md },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginTop: 10, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: 14,
    marginBottom: 8,
  },
  rowLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  infoBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: 14,
    marginTop: 6,
  },
  infoText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  infoSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
});
