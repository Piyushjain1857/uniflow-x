import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, RADII, SPACING } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import Icon from '../../src/components/Icon';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '@uniflow-x/utils/notifications';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableRow = ({ notif, onMarkRead, onDelete, onPress }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // Only trigger if dragging horizontally more than 20px
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) { // Swiped left enough to delete
          Animated.parallel([
            Animated.timing(pan, { toValue: { x: -SCREEN_WIDTH, y: 0 }, duration: 200, useNativeDriver: false }),
            Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: false })
          ]).start(() => onDelete());
        } else if (gestureState.dx > 100 && notif.isUnread) { // Swiped right to mark read
          Animated.timing(pan, { toValue: { x: 0, y: 0 }, duration: 200, useNativeDriver: false }).start(() => onMarkRead());
        } else {
          // Snap back
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View style={[styles.swipeContainer, { opacity }]}>
      {/* Background Actions */}
      <View style={styles.swipeBackground}>
        {notif.isUnread ? (
          <View style={[styles.swipeActionLeft, { width: '50%' }]}>
            <Icon name="checkCircle" size={20} color="#fff" />
            <Text style={styles.swipeActionText}>Read</Text>
          </View>
        ) : <View style={{ width: '50%' }} />}
        <View style={[styles.swipeActionRight, { width: '50%' }]}>
          <Text style={styles.swipeActionText}>Delete</Text>
          <Icon name="close" size={20} color="#fff" />
        </View>
      </View>

      {/* Foreground Card */}
      <Animated.View 
        style={[
          styles.cardForeground, 
          { transform: [{ translateX: pan.x }] },
          notif.isUnread && styles.cardForegroundUnread
        ]} 
        {...panResponder.panHandlers}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ padding: SPACING.md, flexDirection: 'row', gap: 12 }}>
          
          <View style={[styles.iconBox, notif.isHighPriority && styles.iconBoxDanger]}>
            <Icon name={notif.icon} size={20} color={notif.isHighPriority ? COLORS.danger : COLORS.primary} />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, paddingRight: 8 }}>
                <Text style={[styles.title, notif.isUnread && styles.titleUnread]} numberOfLines={1}>{notif.title}</Text>
                {notif.isUnread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.timestamp}>{notif.timestamp}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>{notif.description}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notif.category}</Text>
              </View>
              {notif.isHighPriority && (
                <View style={[styles.badge, styles.badgeDanger]}>
                  <Text style={[styles.badgeText, styles.badgeTextDanger]}>Priority</Text>
                </View>
              )}
            </View>
          </View>

        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const loadData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
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

  const handleMarkAllRead = async () => {
    const data = await markAllAsRead();
    setNotifications(data);
  };

  const handleMarkRead = async (id) => {
    const data = await markAsRead(id);
    setNotifications(data);
  };

  const handleDelete = async (id) => {
    const data = await deleteNotification(id);
    setNotifications(data);
  };

  const handlePress = async (notif) => {
    if (notif.isUnread) {
      await handleMarkRead(notif.id);
    }
    if (notif.link) {
      router.push(notif.link);
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'Unread') return item.isUnread;
    if (activeFilter === 'Academic') return item.category === 'Academic';
    if (activeFilter === 'Campus') return item.category === 'Campus';
    if (activeFilter === 'System') return item.category === 'System';
    return true;
  });

  const todayNotifications = filteredNotifications.filter((n) => n.group === 'TODAY');
  const yesterdayNotifications = filteredNotifications.filter((n) => n.group === 'YESTERDAY');

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const highPriorityCount = notifications.filter((n) => n.isHighPriority).length;

  if (loading && notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Notifications" subtitle="Stay updated with important alerts." showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.textMuted }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" subtitle="Stay updated with important alerts." showBack />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {['All', 'Unread', 'Academic', 'Campus', 'System'].map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.summaryVal}>{unreadCount}</Text>
              <Text style={styles.summaryLabel}>Unread</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.summaryVal, { color: COLORS.danger }]}>{highPriorityCount}</Text>
              <Text style={styles.summaryLabel}>High Priority</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.summaryVal, { color: COLORS.success, fontSize: 16, marginTop: 4 }]}>Sync</Text>
              <Text style={styles.summaryLabel}>Enabled</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btnSecondary} onPress={handleMarkAllRead}>
            <Text style={styles.btnSecondaryText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {filteredNotifications.length === 0 ? (
          <View style={{ padding: 48, alignItems: 'center' }}>
            <Icon name="checkCircle" size={48} color={COLORS.success} />
            <Text style={{ color: COLORS.textMain, fontSize: 18, fontWeight: '700', marginTop: 16 }}>All caught up!</Text>
            <Text style={{ color: COLORS.textMuted, marginTop: 8 }}>No notifications found.</Text>
          </View>
        ) : (
          <>
            {todayNotifications.length > 0 && (
              <>
                <Text style={styles.groupHeader}>TODAY</Text>
                {todayNotifications.map(notif => (
                  <SwipeableRow 
                    key={notif.id} 
                    notif={notif} 
                    onPress={() => handlePress(notif)}
                    onMarkRead={() => handleMarkRead(notif.id)}
                    onDelete={() => handleDelete(notif.id)}
                  />
                ))}
              </>
            )}

            {yesterdayNotifications.length > 0 && (
              <>
                <Text style={styles.groupHeader}>YESTERDAY</Text>
                {yesterdayNotifications.map(notif => (
                  <SwipeableRow 
                    key={notif.id} 
                    notif={notif} 
                    onPress={() => handlePress(notif)}
                    onMarkRead={() => handleMarkRead(notif.id)}
                    onDelete={() => handleDelete(notif.id)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  filterScroll: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: 8
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.surface1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  filterTextActive: { color: '#000' },
  summaryCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface1,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },
  summaryVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textMain,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  btnSecondary: {
    backgroundColor: COLORS.surface2,
    paddingVertical: 12,
    borderRadius: RADII.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  groupHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  swipeContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: 8,
    borderRadius: RADII.md,
    overflow: 'hidden',
    backgroundColor: COLORS.surface2,
  },
  swipeBackground: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipeActionLeft: {
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  swipeActionRight: {
    backgroundColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  swipeActionText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  cardForeground: {
    backgroundColor: COLORS.surface1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
  },
  cardForegroundUnread: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  titleUnread: {
    fontWeight: '800',
    color: COLORS.textMain,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: COLORS.surface3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  badgeTextDanger: {
    color: COLORS.danger,
  },
});
