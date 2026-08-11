import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Icon from '../../../src/components/Icon';
import Card from '../../../src/components/Card';

import { mockGetProfile } from '@uniflow-x/utils/profile.js';
import { getAcademicsSummary } from '@uniflow-x/utils/academics.js';
import { getAttendanceSummary } from '@uniflow-x/utils/attendance.js';
import { getAssignments } from '@uniflow-x/utils/assignments.js';
import { getDailyTimetable } from '@uniflow-x/utils/timetable.js';
import { getCampusEvents } from '@uniflow-x/utils/campus.js';
import { quickPrompts } from '@uniflow-x/utils/uniai.js';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    profile: null,
    academics: null,
    attendance: null,
    assignments: [],
    timetable: [],
    events: []
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [
          profileData,
          academicsData,
          attendanceData,
          assignmentsData,
          timetableData,
          eventsData
        ] = await Promise.all([
          mockGetProfile('12345'),
          getAcademicsSummary(),
          getAttendanceSummary(),
          getAssignments(),
          getDailyTimetable('Monday'),
          getCampusEvents()
        ]);
        setData({
          profile: profileData,
          academics: academicsData,
          attendance: attendanceData,
          assignments: assignmentsData,
          timetable: timetableData,
          events: eventsData
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  const { profile, academics, attendance, assignments, timetable, events } = data;
  const pendingTasksCount = assignments.filter(a => a.status === 'Upcoming').length;
  const nextClass = timetable.length > 0 ? timetable[0] : null;
  const upcomingAssignments = assignments.filter(a => a.status === 'Upcoming').slice(0, 3);
  const recentActivities = academics.recentActivity || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, {profile.fullName.split(' ')[0]} 👋</Text>
            <Text style={styles.dateText}>Monday · 10 August</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/notifications')}>
              <Icon name="notifications" size={20} color={COLORS.textMain} />
              <View style={styles.redDot} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitleText}>Here's what matters today.</Text>

        {/* Summary Grid */}
        <View style={styles.summaryGrid}>
          <TouchableOpacity style={[styles.statBox, { borderColor: COLORS.primary }]} onPress={() => router.push('/academics')}>
            <Text style={styles.statLabel}>GPA</Text>
            <Text style={[styles.statValue, { color: COLORS.primary }]}>{academics.gpa.current}</Text>
            <Text style={styles.statSub}>/ {academics.gpa.max}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.statBox, { borderColor: COLORS.accentEmerald }]} onPress={() => router.push('/attendance')}>
            <Text style={styles.statLabel}>Attendance</Text>
            <Text style={[styles.statValue, { color: COLORS.accentEmerald }]}>{attendance.overallPercentage}%</Text>
            <Text style={styles.statSub}>Overall</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statBox, { borderColor: COLORS.accentAmber }]} onPress={() => router.push('/assignments')}>
            <Text style={styles.statLabel}>Pending Tasks</Text>
            <Text style={[styles.statValue, { color: COLORS.accentAmber }]}>{pendingTasksCount}</Text>
            <Text style={styles.statSub}>Due Soon</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statBox, { borderColor: COLORS.accentPurple }]} onPress={() => router.push('/academics')}>
            <Text style={styles.statLabel}>Credits</Text>
            <Text style={[styles.statValue, { color: COLORS.accentPurple }]}>{academics.credits.earned}</Text>
            <Text style={styles.statSub}>/ {academics.credits.total}</Text>
          </TouchableOpacity>
        </View>

        {/* NEXT CLASS */}
        {nextClass && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NEXT CLASS</Text>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.nextClassCard}
              onPress={() => router.push('/timetable')}
            >
              <View style={styles.nextClassHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Starts in 24 minutes</Text>
                </View>
              </View>
              <Text style={styles.nextClassTitle}>{nextClass.subject}</Text>
              <Text style={styles.nextClassCode}>{nextClass.code}</Text>
              <View style={styles.nextClassMeta}>
                <View style={styles.metaItem}>
                  <Icon name="clock" size={14} color={COLORS.textMuted} />
                  <Text style={styles.metaText}>{nextClass.startTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="location" size={14} color={COLORS.textMuted} />
                  <Text style={styles.metaText}>{nextClass.room}</Text>
                </View>
              </View>
              <View style={[styles.metaItem, { marginTop: 8 }]}>
                <Icon name="profile" size={14} color={COLORS.textMuted} />
                <Text style={styles.metaText}>{nextClass.faculty}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* TODAY'S SCHEDULE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY'S SCHEDULE</Text>
            <TouchableOpacity onPress={() => router.push('/timetable')}>
              <Text style={styles.linkText}>See All</Text>
            </TouchableOpacity>
          </View>
          {timetable.map((item, index) => (
            <Card key={item.id + index} title={item.subject} subtitle={`${item.startTime} • ${item.room}`}>
              <Text style={styles.cardDetailText}>{item.faculty}</Text>
            </Card>
          ))}
        </View>

        {/* UPCOMING ASSIGNMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING ASSIGNMENTS</Text>
            <TouchableOpacity onPress={() => router.push('/assignments')}>
              <Text style={styles.linkText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAssignments.map((asg) => (
            <TouchableOpacity key={asg.id} style={styles.listItem} onPress={() => router.push('/assignments')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{asg.title}</Text>
                <Text style={styles.listSub}>{asg.subject}</Text>
              </View>
              <Text style={styles.dueText}>Due {asg.dueDate}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ATTENDANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ATTENDANCE</Text>
          <TouchableOpacity style={styles.attendanceCard} onPress={() => router.push('/attendance')}>
            <Text style={styles.attendanceBig}>{attendance.overallPercentage}%</Text>
            <Text style={styles.attendanceMsg}>"You can miss 2 more classes before reaching 75%."</Text>
          </TouchableOpacity>
        </View>

        {/* UPCOMING ON CAMPUS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING ON CAMPUS</Text>
            <TouchableOpacity onPress={() => router.push('/campus')}>
              <Text style={styles.linkText}>Campus Hub</Text>
            </TouchableOpacity>
          </View>
          {events.slice(0, 3).map((evt) => (
            <TouchableOpacity key={evt.id} style={styles.listItem} onPress={() => router.push('/campus')}>
              <View style={styles.iconWrap}>
                <Icon name="events" size={20} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{evt.title}</Text>
                <Text style={styles.listSub}>{evt.date} • {evt.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
          {recentActivities.map((act) => (
            <View key={act.id} style={styles.listItem}>
              <View style={[styles.iconWrap, { backgroundColor: COLORS.bgCard }]}>
                <Icon name={act.icon} size={16} color={COLORS.textMuted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{act.title}</Text>
                <Text style={styles.listSub}>{act.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* UNIAI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ASK UNIAI</Text>
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Icon name="sparkles" size={20} color={COLORS.primary} />
              <Text style={styles.aiTitle}>Quick Prompts</Text>
            </View>
            <View style={styles.chipRow}>
              {quickPrompts.slice(0, 3).map((prompt, idx) => (
                <TouchableOpacity key={idx} style={styles.chip} onPress={() => router.push({ pathname: '/uni-ai', params: { query: prompt } })}>
                  <Text style={styles.chipText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.aiInputFake} onPress={() => router.push('/uni-ai')}>
              <Text style={styles.aiInputPlaceholder}>Ask anything...</Text>
              <Icon name="chevronRight" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '600'
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.textMain,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderRadius: RADII.md,
    padding: 16,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '700',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  statSub: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 12,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  nextClassCard: {
    backgroundColor: COLORS.surface2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderRadius: RADII.md,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nextClassHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  nextClassTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  nextClassCode: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 16,
  },
  nextClassMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  cardDetailText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  listSub: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  dueText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accentRose,
  },
  attendanceCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  attendanceBig: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.accentEmerald,
  },
  attendanceMsg: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.md,
    padding: 20,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  aiInputFake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aiInputPlaceholder: {
    color: COLORS.textMuted,
    fontSize: 14,
  }
});
