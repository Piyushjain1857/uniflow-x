import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';

export function CampusMap() {
  const locations = [
    { name: 'Tech Block B-201', desc: 'Computer Science Dept & AI Research Labs', status: 'Open Now' },
    { name: 'Central Library & Digital Hub', desc: 'Quiet Study Zones & 24/7 Midterm Study Floor', status: 'Open 24/7' },
    { name: 'Student Union Cafeteria', desc: 'Food Court, Coffee Lounge, Organic Juice Bar', status: 'Open till 11 PM' },
    { name: 'Main Auditorium A', desc: 'University Hackathons & Guest Speaker Keynotes', status: 'Event Ready' },
  ];

  return (
    <PageContainer className="v2-campus-map-page">
      <div className="page-header">
        <div>
          <h1>Campus Map & Navigation</h1>
          <p>Wayfinding, building sectors, and live shuttle tracker.</p>
        </div>
      </div>

      <div className="surface" style={{ padding: '32px', textAlign: 'center', marginBottom: '32px', background: 'var(--surface-2)' }}>
        <Icon name="campusMap" size={48} style={{ color: 'var(--accent)', marginBottom: '12px', margin: '0 auto' }} />
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '6px' }}>Interactive 3D Campus Wayfinding Map</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 20px' }}>
          Real-time GPS tracking for Campus Shuttle #2, Wi-Fi heatmaps, and indoor building navigation.
        </p>
        <button className="btn btn-primary">
          Open Fullscreen GPS Navigator
        </button>
      </div>

      <section className="section">
        <div className="section-header">
          <h3 className="section-title">KEY CAMPUS BUILDINGS</h3>
        </div>

        <div className="v2-divider-list">
          {locations.map((loc, idx) => (
            <div key={idx} className="v2-divider-row" style={{ padding: '16px 0' }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{loc.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{loc.desc}</p>
              </div>
              <span className="badge badge-success">{loc.status}</span>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default CampusMap;
