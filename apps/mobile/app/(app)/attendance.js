import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';
import { getAttendanceSummary, getSubjectsAttendance, getRecentAttendanceRecords } from '@uniflow-x/utils/attendance';

export default function AttendanceScreen() {
  const [summary, setSummary] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [calcCurrentPresent, setCalcCurrentPresent] = useState('0');
  const [calcCurrentTotal, setCalcCurrentTotal] = useState('0');
  const [calcAddAttended, setCalcAddAttended] = useState('0');
  const [calcAddTotal, setCalcAddTotal] = useState('0');

  useEffect(() => {
    async function loadData() {
      try {
        const [sumData, subData, recData] = await Promise.all([
          getAttendanceSummary(),
          getSubjectsAttendance(),
          getRecentAttendanceRecords()
        ]);
        setSummary(sumData);
        setSubjects(subData);
        setRecords(recData);
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
        <Header title="Attendance" subtitle="Track your class attendance" showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Calculator Logic
  const projPresent = Number(calcCurrentPresent) + Number(calcAddAttended);
  const projTotal = Number(calcCurrentTotal) + Number(calcAddTotal);
  const projPercent = projTotal > 0 ? (projPresent / projTotal) * 100 : 0;
  const isProjWarning = projPercent < 75;

  const selectSubjectForCalc = (sub) => {
    setCalcCurrentPresent(sub.presentClasses.toString());
    setCalcCurrentTotal(sub.totalClasses.toString());
    setCalcAddAttended('0');
    setCalcAddTotal('0');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Attendance" subtitle="Track your class attendance in real time." showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Overall Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overall Attendance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={styles.heroPercent}>{summary.overallPercentage}%</Text>
            <View style={[styles.badge, summary.overallPercentage >= 75 ? styles.badgeSuccess : styles.badgeDanger]}>
              <Text style={[styles.badgeText, summary.overallPercentage >= 75 ? styles.badgeTextSuccess : styles.badgeTextDanger]}>Status: {summary.status}</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <View>
              <Text style={styles.statNumber}>{summary.present}</Text>
              <Text style={[styles.statLabel, { color: COLORS.accentEmerald }]}>Present</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>{summary.absent}</Text>
              <Text style={[styles.statLabel, { color: COLORS.accentRose }]}>Absent</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>{summary.late}</Text>
              <Text style={[styles.statLabel, { color: COLORS.accentAmber }]}>Late</Text>
            </View>
          </View>
        </View>

        {/* Trend Visualization */}
        <Text style={styles.sectionTitle}>Attendance Trend</Text>
        <View style={[styles.card, { flexDirection: 'row', alignItems: 'flex-end', height: 140, paddingTop: 32 }]}>
          {summary.trend.map((point, idx) => (
            <View key={idx} style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <View style={{ width: '100%', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: COLORS.textMain, position: 'absolute', top: -16 }}>{point.percentage}%</Text>
                <View style={{
                  width: 20,
                  height: `${point.percentage}%`,
                  backgroundColor: point.percentage >= 75 ? COLORS.accentEmerald : COLORS.accentAmber,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 8 }}>{point.week}</Text>
            </View>
          ))}
        </View>

        {/* Calculator */}
        <Text style={styles.sectionTitle}>Attendance Calculator</Text>
        <View style={[styles.card, { borderColor: COLORS.primary, borderWidth: 1 }]}>
          <Text style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12 }}>Tap a subject below to auto-fill current attendance.</Text>
          
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Current Present</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={calcCurrentPresent} onChangeText={setCalcCurrentPresent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Total Classes</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={calcCurrentTotal} onChangeText={setCalcCurrentTotal} />
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Future Present</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={calcAddAttended} onChangeText={setCalcAddAttended} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Future Total</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={calcAddTotal} onChangeText={setCalcAddTotal} />
            </View>
          </View>

          <View style={[styles.projBox, isProjWarning ? styles.projBoxWarning : styles.projBoxSuccess]}>
            <Text style={styles.projLabel}>Projected Attendance</Text>
            <Text style={[styles.projVal, isProjWarning ? styles.projValWarning : styles.projValSuccess]}>
              {projPercent.toFixed(1)}%
            </Text>
            {isProjWarning && (
              <Text style={styles.projWarningText}>Warning: Drops below 75% threshold!</Text>
            )}
          </View>
        </View>

        {/* Subjects */}
        <Text style={styles.sectionTitle}>Subject Breakdown</Text>
        <View style={{ gap: 12, marginBottom: 24 }}>
          {subjects.map(sub => (
            <TouchableOpacity key={sub.id} style={styles.card} onPress={() => selectSubjectForCalc(sub)}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subName}>{sub.name}</Text>
                  <Text style={styles.subDetail}>
                    {sub.presentClasses} / {sub.totalClasses} Attended • {sub.classesRemaining} Remaining
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.subPercent, { color: sub.percentage >= 75 ? COLORS.accentEmerald : COLORS.accentAmber }]}>
                    {sub.percentage}%
                  </Text>
                  <View style={[styles.badge, sub.percentage >= 75 ? styles.badgeSuccess : styles.badgeWarning, { marginTop: 4 }]}>
                    <Text style={[styles.badgeText, sub.percentage >= 75 ? styles.badgeTextSuccess : styles.badgeTextWarning]}>{sub.status}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.predictionBox}>
                <Text style={styles.predictionText}>{sub.prediction}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Records */}
        <Text style={styles.sectionTitle}>Recent Records</Text>
        <View style={styles.card}>
          {records.map((rec, idx) => (
            <View key={rec.id} style={[styles.recordRow, idx === records.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={styles.recordDate}>{rec.date}</Text>
              <Text style={styles.recordSub} numberOfLines={1}>{rec.subject}</Text>
              <View style={[styles.badge, rec.status === 'Present' ? styles.badgeSuccess : styles.badgeDanger]}>
                <Text style={[styles.badgeText, rec.status === 'Present' ? styles.badgeTextSuccess : styles.badgeTextDanger]}>{rec.status}</Text>
              </View>
            </View>
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  heroPercent: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textMain,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADII.pill,
  },
  badgeSuccess: { backgroundColor: 'rgba(52, 211, 153, 0.15)' },
  badgeWarning: { backgroundColor: 'rgba(245, 158, 11, 0.15)' },
  badgeDanger: { backgroundColor: 'rgba(239, 68, 68, 0.15)' },
  badgeText: { fontSize: 11, fontWeight: '800' },
  badgeTextSuccess: { color: COLORS.accentEmerald },
  badgeTextWarning: { color: COLORS.accentAmber },
  badgeTextDanger: { color: COLORS.accentRose },
  
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.sm,
    padding: 10,
    color: COLORS.textMain,
    fontSize: 14,
  },
  projBox: {
    padding: 16,
    borderRadius: RADII.md,
    borderWidth: 1,
  },
  projBoxSuccess: { backgroundColor: 'rgba(52, 211, 153, 0.1)', borderColor: COLORS.accentEmerald },
  projBoxWarning: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: COLORS.accentRose },
  projLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  projVal: { fontSize: 24, fontWeight: '900' },
  projValSuccess: { color: COLORS.accentEmerald },
  projValWarning: { color: COLORS.accentRose },
  projWarningText: { fontSize: 12, color: COLORS.accentRose, fontWeight: '700', marginTop: 4 },
  
  subName: { fontSize: 16, fontWeight: '800', color: COLORS.textMain },
  subDetail: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  subPercent: { fontSize: 20, fontWeight: '900' },
  predictionBox: {
    marginTop: 12,
    backgroundColor: COLORS.surface2,
    padding: 10,
    borderRadius: RADII.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  predictionText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },
  
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recordDate: { width: 50, fontSize: 12, color: COLORS.textMuted, fontWeight: '700' },
  recordSub: { flex: 1, fontSize: 14, color: COLORS.textMain, fontWeight: '600', paddingRight: 12 },
});
