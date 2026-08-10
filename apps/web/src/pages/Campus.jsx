import React from 'react';
import PageContainer from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../components/ui';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Campus() {
  const { upcomingEvents, campusClubs, campusServices } = mockData;

  return (
    <PageContainer className="campus-page">
      <div className="page-header-block">
        <h1 className="page-title">Campus Life & Discovery</h1>
        <p className="page-subtitle">Events, societies, campus map wayfinding, and administrative services</p>
      </div>

      {/* 1. Featured Events */}
      <section className="campus-section">
        <h2 className="section-heading">Featured Events</h2>
        <div className="events-grid">
          {upcomingEvents.map((ev) => (
            <Card key={ev.id} isHoverable className="featured-event-card">
              <div className="event-badge-row">
                <Badge variant="primary" size="sm">{ev.category}</Badge>
                <span className="event-date">{ev.date}</span>
              </div>
              <h3 className="event-title">{ev.title}</h3>
              <p className="event-location"><Icon name="campusMap" size={14} /> {ev.location}</p>
              <div className="event-footer">
                <span className="attendees-count">👥 {ev.attendees} Registered</span>
                <Button variant="secondary" size="sm">RSVP Event</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Popular Clubs & Societies */}
      <section className="campus-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-heading">Popular Student Clubs & Societies</h2>
        <div className="clubs-grid">
          {campusClubs.map((club, idx) => (
            <Card key={idx} isHoverable className="club-card">
              <div className="club-header">
                <div className="club-avatar">{club.name[0]}</div>
                <div>
                  <h4 className="club-name">{club.name}</h4>
                  <span className="club-category">{club.category}</span>
                </div>
              </div>
              <div className="club-footer">
                <span>{club.members} Members</span>
                <Button variant="outline" size="sm">Join Society</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Campus Services & Interactive Wayfinding Map */}
      <section className="campus-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-heading">Campus Services & Map Wayfinding</h2>
        <div className="services-map-grid">
          <Card className="services-list-card">
            <CardHeader>
              <CardTitle>Administrative Services</CardTitle>
            </CardHeader>
            <CardContent className="services-stack">
              {campusServices.map((srv, idx) => (
                <div key={idx} className="service-row">
                  <Icon name={srv.icon} size={20} className="srv-icon" />
                  <div>
                    <h5 className="srv-name">{srv.name}</h5>
                    <span className="srv-status">{srv.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="campus-map-card">
            <CardHeader>
              <CardTitle>Interactive Campus Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="map-placeholder-box">
                <Icon name="campusMap" size={42} />
                <p>Interactive Vector Map of Science Block, Library & Innovation Hub</p>
                <Button variant="primary" size="sm" style={{ marginTop: '10px' }}>Open Fullscreen Wayfinding</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageContainer>
  );
}

export default Campus;
