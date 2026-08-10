import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Card';
import Icon from '../../../src/components/Icon';

const courses = [
  { code: 'CS401', name: 'Distributed Systems', instructor: 'Prof. Mark Davis', credits: '4 Hrs', grade: 'A' },
  { code: 'CS402', name: 'Deep Learning Architectures', instructor: 'Dr. Sarah Jenkins', credits: '4 Hrs', grade: 'A-' },
  { code: 'CS405', name: 'Cloud Native Infrastructure', instructor: 'Prof. Alan Turing', credits: '3 Hrs', grade: 'A+' },
  { code: 'Math301', name: 'Advanced Calculus', instructor: 'Dr. Leonard Euler', credits: '4 Hrs', grade: 'B+' },
];

export default function AcademicsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Academics" subtitle="Fall 2026 Cohort" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Academic Nav Chips */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => router.push('/(app)/attendance')}
          >
            <Icon name="attendance" size={16} color={COLORS.accentEmerald} />
            <Text style={styles.chipText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => router.push('/(app)/assignments')}
          >
            <Icon name="assignments" size={16} color={COLORS.accentAmber} />
            <Text style={styles.chipText}>Assignments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => router.push('/(app)/exams')}
          >
            <Icon name="exams" size={16} color={COLORS.accentRose} />
            <Text style={styles.chipText}>Exams</Text>
          </TouchableOpacity>
        </View>

        {/* GPA Summary */}
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Cumulative GPA</Text>
            <Text style={styles.summaryVal}>3.88 / 4.0</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>Honors Track</Text>
          </View>
        </View>

        {/* Registered Courses */}
        <Text style={styles.sectionTitle}>Enrolled Courses (Fall 2026)</Text>

        {courses.map((course) => (
          <Card
            key={course.code}
            title={`${course.code} — ${course.name}`}
            subtitle={`${course.instructor} • ${course.credits}`}
            badge={`Grade: ${course.grade}`}
          >
            <Text style={styles.courseDetail}>Syllabus & Lecture Notes Ready</Text>
          </Card>
        ))}
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
  summaryCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.md,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  summaryVal: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 2,
  },
  summaryBadge: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADII.pill,
  },
  summaryBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  courseDetail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
