import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Icon from '../../../src/components/Icon';
import { getCampusEvents, getCampusServices, getCampusMap } from '@uniflow-x/utils/campus';

export default function CampusScreen() {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const loadData = async () => {
    try {
      const [evtData, srvData, mapData] = await Promise.all([
        getCampusEvents(),
        getCampusServices(),
        getCampusMap()
      ]);
      setEvents(evtData);
      setServices(srvData);
      setMapLocations(mapData);
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

  const featuredEvent = events.find(e => e.isFeatured);
  const trendingEvents = events.filter(e => {
    if (e.isFeatured) return false;
    return filter === 'All' || e.category === filter;
  });

  const filters = ['All', 'Academic', 'Technical', 'Cultural', 'Sports'];

  if (loading || !events.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Campus" subtitle="Discover what's happening around you." showBack={false} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Campus" subtitle="Discover what's happening around you." showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Featured Event */}
        {featuredEvent && (
          <View style={styles.featuredContainer}>
            <View style={styles.featuredBg} />
            <View style={{ padding: SPACING.md }}>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgePrimaryText}>Featured {featuredEvent.category} Event</Text>
              </View>
              <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
              
              <View style={styles.featuredMetaRow}>
                <Icon name="calendar" size={14} color={COLORS.textMuted} />
                <Text style={styles.featuredMetaText}>{featuredEvent.date} • {featuredEvent.time}</Text>
              </View>
              <View style={styles.featuredMetaRow}>
                <Icon name="campusMap" size={14} color={COLORS.textMuted} />
                <Text style={styles.featuredMetaText}>{featuredEvent.location}</Text>
              </View>
              
              <TouchableOpacity style={styles.btnPrimary} onPress={() => setSelectedEvent(featuredEvent)}>
                <Text style={styles.btnPrimaryText}>Attend Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Trending Events */}
        <Text style={styles.sectionTitle}>Trending Events</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll} style={{ marginBottom: 16 }}>
          {filters.map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.trendingList}>
          {trendingEvents.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <Text style={{ color: COLORS.textMuted }}>No events found.</Text>
            </View>
          ) : (
            trendingEvents.map(ev => (
              <TouchableOpacity key={ev.id} style={styles.eventCard} onPress={() => setSelectedEvent(ev)}>
                <View style={styles.eventCardHeader}>
                  <View style={styles.badgeSecondary}>
                    <Text style={styles.badgeSecondaryText}>{ev.category}</Text>
                  </View>
                  <Text style={styles.eventDateText}>{ev.date}</Text>
                </View>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventLocation}>{ev.location} • {ev.time}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Campus Services */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Campus Services</Text>
        <View style={styles.servicesCard}>
          {services.map((srv, idx) => (
            <View key={srv.id} style={[styles.serviceRow, idx === services.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceName}>{srv.name}</Text>
                <Text style={styles.serviceDesc}>{srv.desc}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: srv.status === 'Open' || srv.status === 'Online' || srv.status === 'Live' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)' }]}>
                <Text style={[styles.statusText, { color: srv.status === 'Open' || srv.status === 'Online' || srv.status === 'Live' ? COLORS.accentEmerald : COLORS.accentAmber }]}>
                  {srv.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Campus Map */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Campus Map</Text>
        <View style={styles.mapContainer}>
          <View style={styles.mapGridPattern} />
          {mapLocations.map(loc => (
            <TouchableOpacity 
              key={loc.id}
              style={[
                styles.mapBuilding, 
                { left: `${loc.x}%`, top: `${loc.y}%`, width: `${loc.w}%`, height: `${loc.h}%` },
                loc.type === 'park' && { backgroundColor: 'rgba(52, 211, 153, 0.15)', borderColor: COLORS.accentEmerald }
              ]}
              onPress={() => setSelectedLocation(loc)}
            >
              <Text style={styles.mapBuildingText} numberOfLines={2}>{loc.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Event Details Modal */}
      <Modal visible={!!selectedEvent} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <View style={[styles.badgePrimary, { alignSelf: 'flex-start', marginBottom: 12 }]}>
                  <Text style={styles.badgePrimaryText}>{selectedEvent.category}</Text>
                </View>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                
                <View style={styles.modalInfoBox}>
                  <View style={styles.modalInfoRow}>
                    <Icon name="calendar" size={16} color={COLORS.primary} />
                    <Text style={styles.modalInfoText}>{selectedEvent.date} at {selectedEvent.time}</Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Icon name="campusMap" size={16} color={COLORS.primary} />
                    <Text style={styles.modalInfoText}>{selectedEvent.location}</Text>
                  </View>
                </View>

                <Text style={styles.modalSubHeader}>About this event</Text>
                <Text style={styles.modalDesc}>{selectedEvent.description}</Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.btnGhost} onPress={() => setSelectedEvent(null)}>
                    <Text style={styles.btnGhostText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnPrimaryRow} onPress={() => { alert('RSVP Confirmed!'); setSelectedEvent(null); }}>
                    <Text style={styles.btnPrimaryText}>RSVP & Attend</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Location Details Modal */}
      <Modal visible={!!selectedLocation} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { alignItems: 'center' }]}>
            {selectedLocation && (
              <>
                <View style={styles.modalIconBox}>
                  <Icon name="campusMap" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
                <Text style={styles.modalDesc}>Type: {selectedLocation.type.toUpperCase()}</Text>
                
                <TouchableOpacity style={[styles.btnPrimary, { marginTop: 24, width: '100%' }]} onPress={() => setSelectedLocation(null)}>
                  <Text style={styles.btnPrimaryText}>Close Map Details</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

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
  featuredContainer: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  featuredBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },
  badgePrimary: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgePrimaryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  featuredMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featuredMetaText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: RADII.md,
    alignItems: 'center',
    marginTop: 16,
  },
  btnPrimaryRow: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADII.md,
    alignItems: 'center',
    flex: 1,
  },
  btnPrimaryText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 8,
  },
  filterBtn: {
    backgroundColor: COLORS.surface1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADII.pill,
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
  filterTextActive: {
    color: '#000',
  },
  trendingList: {
    gap: 12,
  },
  eventCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeSecondary: {
    backgroundColor: COLORS.surface2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeSecondaryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  eventDateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  servicesCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  serviceDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.surface1,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  mapGridPattern: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.1,
    backgroundColor: '#fff', 
    // Poor man's grid in React Native without heavy SVG usage
  },
  mapBuilding: {
    position: 'absolute',
    backgroundColor: COLORS.surface2,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  mapBuildingText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMain,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface1,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  modalInfoBox: {
    backgroundColor: COLORS.bgDark,
    borderRadius: RADII.md,
    padding: SPACING.md,
    gap: 12,
    marginBottom: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalInfoText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  modalSubHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnGhost: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADII.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnGhostText: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: '700',
  },
  modalIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  }
});
