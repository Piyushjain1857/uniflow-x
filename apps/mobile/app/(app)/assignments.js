import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';
import { getAssignments } from '@uniflow-x/utils/assignments';
import { useCallback } from 'react';

export default function AssignmentsScreen() {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const filteredAssignments = assignments.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  const getStatusColor = (status) => {
    if (status === 'Submitted') return COLORS.accentEmerald;
    if (status === 'Overdue') return COLORS.accentRose;
    return COLORS.accentAmber;
  };

  const tabs = ['All', 'Upcoming', 'Submitted', 'Overdue'];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Assignments" subtitle="Coursework tasks and submission deadlines." showBack />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, filter === tab && styles.tabBtnActive]}
              onPress={() => setFilter(tab)}
            >
              <Text style={[styles.tabText, filter === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
        ) : filteredAssignments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {filter.toLowerCase()} assignments found.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredAssignments.map((asg) => (
              <TouchableOpacity 
                key={asg.id} 
                style={[styles.card, asg.status === 'Overdue' && { borderLeftWidth: 4, borderLeftColor: COLORS.accentRose }]}
                onPress={() => router.push(`/assignment/${asg.id}`)}
              >
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{asg.title}</Text>
                    <Text style={styles.subject}>{asg.courseCode} • {asg.subject}</Text>
                  </View>
                  <View style={styles.marksBadge}>
                    <Text style={styles.marksText}>{asg.marks} Pts</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.footerItem}>
                    <Icon name="calendar" size={14} color={asg.status === 'Overdue' ? COLORS.accentRose : COLORS.textDim} />
                    <Text style={[styles.dateText, asg.status === 'Overdue' && { color: COLORS.accentRose }]}>
                      Due: {asg.dueDate}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(asg.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(asg.status) }]}>{asg.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface1,
  },
  tabScroll: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.surface2,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  subject: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  marksBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  marksText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDim,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  }
});
