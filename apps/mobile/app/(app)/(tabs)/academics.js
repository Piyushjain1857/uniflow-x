import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Card';
import Icon from '../../../src/components/Icon';
import { getAcademicsSummary, getSubjects } from '@uniflow-x/utils/academics';

export default function AcademicsScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sumData, subData] = await Promise.all([
          getAcademicsSummary(),
          getSubjects()
        ]);
        setSummary(sumData);
        setSubjects(subData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !summary) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Academics" subtitle="Academic performance" showBack={false} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const gpaPercent = (summary.gpa.current / summary.gpa.max) * 100;
  const creditsPercent = (summary.credits.earned / summary.credits.total) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Academics" subtitle="Your academic performance at a glance." showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Summary Cards */}
        <View style={styles.statsGrid}>
          {/* Degree Info */}
          <View style={[styles.summaryCard, { minWidth: '100%', marginBottom: 0 }]}>
            <Text style={styles.summaryLabel}>{summary.term}</Text>
            <Text style={[styles.summaryVal, { fontSize: 20 }]}>{summary.degree}</Text>
            <Text style={{ color: COLORS.primary, fontWeight: '700', marginTop: 4 }}>{summary.semester}</Text>
          </View>
          
          {/* GPA */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Cumulative GPA</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={styles.summaryVal}>{summary.gpa.current.toFixed(2)}</Text>
              <Text style={styles.summaryMax}> / {summary.gpa.max.toFixed(1)}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${gpaPercent}%`, backgroundColor: COLORS.accentPurple }]} />
            </View>
          </View>

          {/* Credits */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Credits Earned</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={styles.summaryVal}>{summary.credits.earned}</Text>
              <Text style={styles.summaryMax}> / {summary.credits.total}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${creditsPercent}%`, backgroundColor: COLORS.accentEmerald }]} />
            </View>
          </View>
        </View>

        {/* Subjects List */}
        <Text style={styles.sectionTitle}>Enrolled Subjects</Text>

        <View style={styles.subjectsContainer}>
          {subjects.map((course) => (
            <TouchableOpacity 
              key={course.id} 
              activeOpacity={0.7}
              onPress={() => router.push(`/subject/${course.id}`)}
              style={styles.subjectCard}
            >
              <View style={styles.subjectHeader}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                    <Text style={styles.subjectCode}>{course.code}</Text>
                    <Text style={styles.subjectCredits}>{course.credits} Credits</Text>
                  </View>
                  <Text style={styles.subjectName}>{course.name}</Text>
                  <Text style={styles.subjectFaculty}>{course.faculty}</Text>
                </View>
                <View style={styles.gradeBox}>
                  <Text style={styles.gradeText}>{course.currentGrade}</Text>
                </View>
              </View>

              <View style={styles.subjectFooter}>
                <View style={styles.footerItem}>
                  <Icon name="attendance" size={14} color={COLORS.textDim} />
                  <Text style={styles.footerItemText}>{course.attendance} Att.</Text>
                </View>
                <View style={styles.footerItem}>
                  <Icon name="assignments" size={14} color={COLORS.textDim} />
                  <Text style={styles.footerItemText}>{course.assignmentCount} pending</Text>
                </View>
                <View style={styles.footerItem}>
                  <Icon name="calendar" size={14} color={COLORS.textDim} />
                  <Text style={styles.footerItemText} numberOfLines={1}>Next: {course.nextClass}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: SPACING.md,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  summaryVal: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textMain,
  },
  summaryMax: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  subjectsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  subjectCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  subjectHeader: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subjectCode: {
    fontSize: 11,
    color: '#000',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '800',
  },
  subjectCredits: {
    fontSize: 11,
    color: COLORS.textMain,
    backgroundColor: COLORS.surface2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '700',
    overflow: 'hidden',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  subjectFaculty: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  gradeBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
  },
  subjectFooter: {
    flexDirection: 'row',
    padding: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  footerItemText: {
    fontSize: 11,
    color: COLORS.textDim,
    fontWeight: '600',
  },
});
