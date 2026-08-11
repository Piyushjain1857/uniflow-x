import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Card';
import Icon from '../../../src/components/Icon';

export default function CampusScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Campus Life" subtitle="News, Events & Facilities" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Nav Chips */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.chip} onPress={() => router.push('/events')}>
            <Icon name="events" size={16} color={COLORS.accentPurple} />
            <Text style={styles.chipText}>Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chip} onPress={() => router.push('/clubs')}>
            <Icon name="clubs" size={16} color={COLORS.accentIndigo} />
            <Text style={styles.chipText}>Clubs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chip} onPress={() => router.push('/campus-map')}>
            <Icon name="campusMap" size={16} color={COLORS.primary} />
            <Text style={styles.chipText}>Campus Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chip} onPress={() => router.push('/complaints')}>
            <Icon name="complaints" size={16} color={COLORS.accentRose} />
            <Text style={styles.chipText}>Helpdesk</Text>
          </TouchableOpacity>
        </View>

        {/* Live Shuttle Tracker Card */}
        <View style={styles.shuttleCard}>
          <View style={styles.shuttleHeader}>
            <Icon name="campus" size={20} color={COLORS.primary} />
            <Text style={styles.shuttleTitle}>Campus Express Shuttle</Text>
            <View style={styles.liveDot} />
          </View>
          <Text style={styles.shuttleDesc}>Next arrival at Student Union Stop in 4 minutes.</Text>
        </View>

        {/* Campus Feed */}
        <Text style={styles.sectionTitle}>Campus Announcements</Text>

        <Card title="Central Library 24/7 Extended Hours" subtitle="Posted 2 hrs ago" badge="Facility">
          <Text style={styles.cardDetail}>
            The 3rd floor quiet study zone will remain open 24 hours daily during the midterm preparation window.
          </Text>
        </Card>

        <Card title="UniHack 2026 Registration Open" subtitle="Posted 5 hrs ago" badge="Fest Alert">
          <Text style={styles.cardDetail}>
            36-hour flagship hackathon with $25,000 in cash prizes. RSVP now via Events tab.
          </Text>
        </Card>

        <Card title="Cafeteria Special Asian Street Food Corner" subtitle="Posted 1 day ago" badge="Dining">
          <Text style={styles.cardDetail}>
            Fresh ramen, dim sum, and organic smoothie bar now open in Student Union Block C.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADII.pill,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  shuttleCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: 20,
  },
  shuttleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  shuttleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    flex: 1,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentEmerald,
  },
  shuttleDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  cardDetail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
});
