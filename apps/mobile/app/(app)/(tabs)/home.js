import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Icon from '../../../src/components/Icon';
import Card from '../../../src/components/Card';

const quickGridItems = [
  { name: 'Attendance', route: '/attendance', icon: 'attendance', color: COLORS.accentEmerald },
  { name: 'Assignments', route: '/assignments', icon: 'assignments', color: COLORS.accentAmber },
  { name: 'Exams', route: '/exams', icon: 'exams', color: COLORS.accentRose },
  { name: 'Timetable', route: '/timetable', icon: 'timetable', color: COLORS.primary },
  { name: 'Events', route: '/events', icon: 'events', color: COLORS.accentPurple },
  { name: 'Clubs', route: '/clubs', icon: 'clubs', color: COLORS.accentIndigo },
  { name: 'Campus Map', route: '/campus-map', icon: 'campusMap', color: COLORS.primary },
  { name: 'Complaints', route: '/complaints', icon: 'complaints', color: COLORS.accentRose },
  { name: 'Digital ID', route: '/digital-id', icon: 'digitalId', color: COLORS.accentEmerald },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AV</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Good Morning 👋</Text>
              <Text style={styles.userName}>Alex Vance</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/notifications')}
            >
              <Icon name="notifications" size={20} color={COLORS.textMain} />
              <View style={styles.redDot} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/settings')}
            >
              <Icon name="settings" size={20} color={COLORS.textMain} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <View style={[styles.statCard, { borderColor: COLORS.accentEmerald }]}>
            <Text style={styles.statLabel}>Attendance</Text>
            <Text style={[styles.statValue, { color: COLORS.accentEmerald }]}>92.4%</Text>
            <Text style={styles.statSub}>Safe Threshold</Text>
          </View>

          <View style={[styles.statCard, { borderColor: COLORS.primary }]}>
            <Text style={styles.statLabel}>Current GPA</Text>
            <Text style={[styles.statValue, { color: COLORS.primary }]}>3.88</Text>
            <Text style={styles.statSub}>Top 5% Rank</Text>
          </View>

          <View style={[styles.statCard, { borderColor: COLORS.accentAmber }]}>
            <Text style={styles.statLabel}>Tasks Due</Text>
            <Text style={[styles.statValue, { color: COLORS.accentAmber }]}>3 Tasks</Text>
            <Text style={styles.statSub}>Next: CS402</Text>
          </View>
        </ScrollView>

        {/* UniAI Prompt Teaser */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.aiTeaserCard}
          onPress={() => router.push('/uni-ai')}
        >
          <View style={styles.aiIconBox}>
            <Icon name="sparkles" size={22} color="#000" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>UniAI Copilot</Text>
            <Text style={styles.aiDesc}>"What is my next class venue today?"</Text>
          </View>
          <Icon name="chevronRight" size={18} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Action Grid */}
        <Text style={styles.sectionTitle}>Campus Quick Actions</Text>
        <View style={styles.grid}>
          {quickGridItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.gridItem}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
            >
              <View style={[styles.gridIconWrap, { backgroundColor: `${item.color}15` }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.gridText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Schedule Card */}
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <Card title="CS401 — Distributed Systems" subtitle="09:00 AM • Room 304B" badge="Active Now">
          <Text style={styles.cardDetailText}>Prof. Mark Davis • Lecture & Lab Overview</Text>
        </Card>

        <Card title="CS402 — Deep Learning" subtitle="11:30 AM • Lab 2" badge="Next Up">
          <Text style={styles.cardDetailText}>Dr. Sarah Jenkins • Neural Net Architecture</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.accentIndigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  greeting: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accentRose,
  },
  statsScroll: {
    marginBottom: 16,
  },
  statCard: {
    width: 140,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    borderWidth: 1,
    padding: 14,
    marginRight: 10,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 4,
  },
  statSub: {
    fontSize: 10,
    color: COLORS.textDim,
  },
  aiTeaserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.md,
    padding: 14,
    gap: 12,
    marginBottom: 20,
  },
  aiIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  aiDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  gridItem: {
    width: '31%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  gridIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMain,
    textAlign: 'center',
  },
  cardDetailText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
