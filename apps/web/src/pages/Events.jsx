import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Events() {
  const { upcomingCampusEvents } = mockData;

  return (
    <PageContainer className="v2-events-page">
      <div className="page-header">
        <div>
          <h1>Campus Events & Fests</h1>
          <p>Discover hackathons, cultural festivals, and technical workshops.</p>
        </div>
      </div>

      <div className="v2-events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {upcomingCampusEvents.map((ev) => (
          <div key={ev.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
            <div>
              <div className="event-top" style={{ marginBottom: '10px' }}>
                <span className="badge badge-info">{ev.category}</span>
                <span className="event-date">{ev.date}</span>
              </div>
              <h3 className="event-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{ev.title}</h3>
              <p className="event-location" style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
                <Icon name="campusMap" size={13} /> {ev.location} · {ev.time}
              </p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-primary sm-btn" style={{ width: '100%' }}>
                Get Event Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default Events;
