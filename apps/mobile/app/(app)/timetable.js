import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';
import { getDailyTimetable } from '@uniflow-x/utils/timetable';

export default function TimetableScreen() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState('Monday');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    async function loadClasses() {
      setLoading(true);
      try {
        const data = await getDailyTimetable(activeDay);
        setClasses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, [activeDay]);

  const handlePrevDay = () => {
    const idx = days.indexOf(activeDay);
    if (idx > 0) setActiveDay(days[idx - 1]);
  };
  const handleNextDay = () => {
    const idx = days.indexOf(activeDay);
    if (idx < days.length - 1) setActiveDay(days[idx + 1]);
  };
  const handleToday = () => setActiveDay('Monday');

  const getBorderColor = (colorVar) => {
    switch(colorVar) {
      case 'var(--primary)': return COLORS.primary;
      case 'var(--accent)': return COLORS.accentPurple;
      case 'var(--warning)': return COLORS.accentAmber;
      case 'var(--success)': return COLORS.accentEmerald;
      case 'var(--danger)': return COLORS.accentRose;
      default: return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Timetable" subtitle={`${activeDay} — 10 August`} showBack />

      {/* Nav Controls */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navBtn, activeDay === days[0] && styles.navBtnDisabled]} 
          onPress={handlePrevDay}
          disabled={activeDay === days[0]}
        >
          <Icon name="chevronLeft" size={16} color={activeDay === days[0] ? COLORS.textDim : COLORS.textMain} />
          <Text style={[styles.navText, activeDay === days[0] && { color: COLORS.textDim }]}>Prev</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.todayBtn} onPress={handleToday}>
          <Text style={styles.todayText}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navBtn, activeDay === days[days.length - 1] && styles.navBtnDisabled]} 
          onPress={handleNextDay}
          disabled={activeDay === days[days.length - 1]}
        >
          <Text style={[styles.navText, activeDay === days[days.length - 1] && { color: COLORS.textDim }]}>Next</Text>
          <Icon name="chevronRight" size={16} color={activeDay === days[days.length - 1] ? COLORS.textDim : COLORS.textMain} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
        ) : classes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No classes scheduled for {activeDay}.</Text>
          </View>
        ) : (
          <View style={styles.timeline}>
            {classes.map((cls, idx) => (
              <View key={idx} style={styles.timelineRow}>
                <View style={styles.timeCol}>
                  <Text style={styles.timeText}>{cls.duration.split('–')[0]}</Text>
                </View>
                
                <TouchableOpacity 
                  style={[styles.classCard, { borderLeftColor: getBorderColor(cls.color) }]}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/subject/${cls.id}`)}
                >
                  <Text style={styles.classTitle}>{cls.subject}</Text>
                  <Text style={styles.classMeta}>{cls.room} • {cls.faculty}</Text>
                  
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{cls.duration}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface1,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADII.sm,
    backgroundColor: 'rgba(255,255,255,0.05)',
    gap: 4,
  },
  navBtnDisabled: {
    opacity: 0.5,
  },
  navText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  todayBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADII.pill,
  },
  todayText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000',
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  timeline: {
    flexDirection: 'column',
    gap: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeCol: {
    width: 50,
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  classCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRightColor: COLORS.border,
    borderTopColor: COLORS.border,
    borderBottomColor: COLORS.border,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  classMeta: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 12,
  },
  durationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  }
});
