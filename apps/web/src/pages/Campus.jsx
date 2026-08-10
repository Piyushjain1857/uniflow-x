import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Campus() {
  const { upcomingCampusEvents } = mockData;
  const featured = upcomingCampusEvents[0];

  return (
    <PageContainer className="v2-campus-page">
      <div className="v2-page-header">
        <h1 className="v2-title">Campus</h1>
        <p className="v2-subtitle">Discover what's happening around you.</p>
      </div>

      {/* FEATURED EVENT LARGE VISUAL AREA */}
      <section className="v2-section">
        <div className="v2-surface-box featured-event-surface">
          <div className="featured-content">
            <span className="v2-badge-indigo">{featured.category}</span>
            <h2 className="featured-title">{featured.title}</h2>
            <p className="featured-meta"><Icon name="campusMap" size={14} /> {featured.location} · {featured.date} at {featured.time}</p>
            <button className="v2-btn-primary" style={{ marginTop: '16px', width: 'fit-content' }}>
              RSVP Event Pass
            </button>
          </div>
        </div>
      </section>

      {/* TRENDING EVENTS */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">TRENDING EVENTS</h3>
        </div>

        <div className="v2-events-grid">
          {upcomingCampusEvents.slice(1).map((ev) => (
            <div key={ev.id} className="v2-event-card">
              <span className="event-cat">{ev.category}</span>
              <h4 className="event-title">{ev.title}</h4>
              <p className="event-location">{ev.location} · {ev.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR CLUBS & SERVICES */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">CAMPUS SERVICES</h3>
        </div>

        <div className="v2-divider-list">
          <div className="v2-divider-row">
            <div>
              <h4 className="font-bold">Central Library & Digital Hub</h4>
              <span className="v2-sub-text">Open 24/7 for Spring Midterms</span>
            </div>
            <span className="v2-status-tag status-submitted">Open</span>
          </div>

          <div className="v2-divider-row">
            <div>
              <h4 className="font-bold">Campus Shuttle Tracker</h4>
              <span className="v2-sub-text">Next bus arriving in 8 minutes at Tech Block Stop</span>
            </div>
            <span className="v2-badge-indigo">Live</span>
          </div>

          <div className="v2-divider-row">
            <div>
              <h4 className="font-bold">IT Service Desk</h4>
              <span className="v2-sub-text">Device registration & Wi-Fi support</span>
            </div>
            <span className="v2-status-tag status-submitted">Online</span>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Campus;
