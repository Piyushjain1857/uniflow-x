import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Icon from '../../../src/components/Icon';
import { getSubjectDetails } from '@uniflow-x/utils/academics';

export default function SubjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await getSubjectDetails(id);
        setSubject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadSubject();
  }, [id]);

  if (loading || !subject) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Subject Details" showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : <Text style={{ color: COLORS.textMain }}>Subject Not Found</Text>}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={subject.code} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.title}>{subject.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Icon name="profile" size={14} color={COLORS.textDim} />
            <Text style={styles.faculty}>{subject.faculty}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{subject.currentGrade}</Text>
            <Text style={styles.statLabel}>Current Grade</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: COLORS.accentEmerald }]}>{subject.attendance}</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{subject.credits}</Text>
            <Text style={styles.statLabel}>Credits</Text>
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Icon name="calendar" size={18} color={COLORS.primary} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.rowTitle}>Weekly Schedule</Text>
              <Text style={styles.rowSub}>{subject.schedule}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="calendar" size={18} color={COLORS.accentPurple} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.rowTitle}>Next Class</Text>
              <Text style={styles.rowSub}>{subject.nextClass}</Text>
            </View>
          </View>
        </View>

        {/* Assignments */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.cardTitle}>Assignments</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{subject.assignments.length}</Text>
            </View>
          </View>
          
          {subject.assignments.length === 0 ? (
            <Text style={styles.emptyText}>No assignments found.</Text>
          ) : (
            subject.assignments.map((a, idx) => (
              <TouchableOpacity key={a.id} style={styles.listItem} onPress={() => router.push('/assignments')}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{a.title}</Text>
                  <Text style={styles.listSub}>Due: {a.dueDate}</Text>
                </View>
                <View style={[styles.statusBadge, a.status === 'Pending' ? styles.statusWarning : styles.statusSuccess]}>
                  <Text style={[styles.statusText, a.status === 'Pending' ? styles.statusWarningText : styles.statusSuccessText]}>
                    {a.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Grades Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Grades Breakdown</Text>
          <View style={styles.divider} />
          
          {subject.grades.length === 0 ? (
            <Text style={styles.emptyText}>No grades published yet.</Text>
          ) : (
            subject.grades.map((g, idx) => (
              <View key={idx} style={[styles.row, { paddingVertical: 12, borderBottomWidth: idx === subject.grades.length - 1 ? 0 : 1, borderBottomColor: COLORS.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{g.title}</Text>
                  <Text style={styles.rowSub}>Weight: {g.weight}</Text>
                </View>
                <Text style={styles.gradeScore}>{g.score}</Text>
              </View>
            ))
          )}
        </View>

        {/* Course Materials */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Course Materials</Text>
          <View style={styles.divider} />
          
          {subject.materials.length === 0 ? (
            <Text style={styles.emptyText}>No materials uploaded.</Text>
          ) : (
            subject.materials.map((m, idx) => (
              <TouchableOpacity key={m.id} style={styles.listItem}>
                <View style={styles.iconBox}>
                  <Icon name="academics" size={16} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.listTitle}>{m.title}</Text>
                  <Text style={styles.listSub}>{m.type.toUpperCase()} • {m.date}</Text>
                </View>
                <Icon name="chevronRight" size={18} color={COLORS.textDim} />
              </TouchableOpacity>
            ))
          )}
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
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textMain,
    lineHeight: 34,
  },
  faculty: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface2,
    borderRadius: RADII.md,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '700',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  rowSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.surface2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADII.pill,
  },
  badgeText: {
    color: COLORS.textMain,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  listSub: {
    fontSize: 12,
    color: COLORS.textDim,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  statusSuccess: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
  },
  statusWarningText: {
    color: COLORS.accentAmber,
    fontSize: 11,
    fontWeight: '800',
  },
  statusSuccessText: {
    color: COLORS.accentEmerald,
    fontSize: 11,
    fontWeight: '800',
  },
  gradeScore: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textMain,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
