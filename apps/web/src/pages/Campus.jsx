import React, { useState, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { getCampusEvents, getCampusServices, getCampusMap } from '@uniflow-x/utils/campus';

export function Campus() {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    async function loadData() {
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
    }
    loadData();
  }, []);

  const featuredEvent = events.find(e => e.isFeatured);
  
  const trendingEvents = events.filter(e => {
    if (e.isFeatured) return false; // Hide featured from trending list
    const matchesFilter = filter === 'All' || e.category === filter;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading || !events.length) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Campus Hub...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="v2-campus-page">
      {/* Header */}
      <div className="v2-page-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="v2-title">Campus</h1>
          <p className="v2-subtitle">Discover what's happening around you.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
        
        {/* Left Column (Featured & Services) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Featured Event */}
          {featuredEvent && (
            <div className="v2-surface-box" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: 120, backgroundColor: 'var(--primary)', opacity: 0.1, position: 'absolute', top: 0, left: 0, right: 0 }} />
              <div style={{ padding: 24, position: 'relative', zIndex: 1 }}>
                <span className="badge badge-primary" style={{ marginBottom: 12, display: 'inline-block' }}>Featured {featuredEvent.category} Event</span>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{featuredEvent.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
                  <Icon name="calendar" size={14} /> {featuredEvent.date} • {featuredEvent.time}
                  <span style={{ margin: '0 8px' }}>|</span>
                  <Icon name="campusMap" size={14} /> {featuredEvent.location}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
                  {featuredEvent.description}
                </p>
                <Button variant="primary" onClick={() => setSelectedEvent(featuredEvent)}>View Details & Attend</Button>
              </div>
            </div>
          )}

          {/* Campus Services */}
          <div className="v2-surface-box" style={{ padding: 0 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Campus Services</h3>
            </div>
            <div className="v2-divider-list">
              {services.map(srv => (
                <div key={srv.id} className="list-row" style={{ padding: '12px 24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)' }}>{srv.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{srv.desc}</div>
                  </div>
                  <span className={`badge ${srv.status === 'Open' || srv.status === 'Online' ? 'badge-success' : 'badge-warning'}`}>
                    {srv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Trending & Map) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Trending Events */}
          <div className="v2-surface-box" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px 0' }}>Trending Events</h3>
            
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <input 
                type="text" 
                className="v2-input" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {['All', 'Academic', 'Technical', 'Cultural', 'Sports'].map(tab => (
                <Button 
                  key={tab} 
                  variant={filter === tab ? 'primary' : 'ghost'} 
                  onClick={() => setFilter(tab)}
                  style={{ padding: '6px 12px', fontSize: 12, backgroundColor: filter === tab ? 'var(--primary)' : 'var(--surface-2)' }}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {trendingEvents.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No events found.</div>
              ) : (
                trendingEvents.map(ev => (
                  <div key={ev.id} className="list-row" style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer' }} onClick={() => setSelectedEvent(ev)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span className="badge badge-secondary">{ev.category}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{ev.date}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ev.location} • {ev.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Custom Map Interface */}
          <div className="v2-surface-box">
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px 0' }}>Campus Map</h3>
            <div className="campus-map-container">
              {mapLocations.map(loc => (
                <div 
                  key={loc.id} 
                  className="map-building"
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    width: `${loc.w}%`,
                    height: `${loc.h}%`,
                    backgroundColor: loc.type === 'park' ? 'rgba(52, 211, 153, 0.1)' : 'var(--surface-3)',
                    borderColor: loc.type === 'park' ? 'var(--success)' : 'var(--border)'
                  }}
                  onClick={() => setSelectedLocation(loc)}
                >
                  <span className="map-building-text">{loc.name}</span>
                </div>
              ))}
              <div className="map-controls">
                <button className="map-ctrl-btn">+</button>
                <button className="map-ctrl-btn">−</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title="Event Details">
          <div style={{ padding: 24 }}>
            <span className="badge badge-primary" style={{ marginBottom: 12 }}>{selectedEvent.category}</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{selectedEvent.title}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, backgroundColor: 'var(--surface-1)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="calendar" size={16} color="var(--primary)" />
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{selectedEvent.date} at {selectedEvent.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="campusMap" size={16} color="var(--primary)" />
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{selectedEvent.location}</span>
              </div>
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>About this event</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
              {selectedEvent.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Button variant="ghost" onClick={() => setSelectedEvent(null)}>Close</Button>
              <Button variant="primary" onClick={() => { alert('RSVP Confirmed!'); setSelectedEvent(null); }}>
                RSVP & Attend
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Map Location Details Modal */}
      {selectedLocation && (
        <Modal isOpen={!!selectedLocation} onClose={() => setSelectedLocation(null)} title="Location Details">
          <div style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon name="campusMap" size={32} color="var(--primary)" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{selectedLocation.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Type: {selectedLocation.type.toUpperCase()}</p>
            <div style={{ marginTop: 24 }}>
              <Button variant="primary" onClick={() => setSelectedLocation(null)}>Close Map Details</Button>
            </div>
          </div>
        </Modal>
      )}

    </PageContainer>
  );
}

export default Campus;
