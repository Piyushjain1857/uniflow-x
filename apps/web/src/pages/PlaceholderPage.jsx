import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';

const pageConfigs = {
  '/profile': {
    title: 'User Profile & Academic Record',
    category: 'Account',
    icon: 'profile',
    badge: 'Verified Identity',
    stats: [
      { label: 'Student Name', value: 'Piyush Jain', change: 'NetID: pjain2026', color: 'accent' },
      { label: 'Program', value: 'B.Tech CompSci', change: 'Semester 4 · Honors Track', color: 'success' },
      { label: 'Cumulative GPA', value: '3.88 / 4.0', change: 'Top 5% Department Rank', color: 'warning' }
    ],
    cards: [
      { title: 'Contact Information', desc: 'Email: piyush.jain@university.edu • Phone: +1 (555) 019-2831 • Emergency Contact Registered', status: 'Verified', icon: 'profile' },
      { title: 'Academic Advisor', desc: 'Dr. Sarah Jenkins • Office: Tech Block B-302 • Office Hours: Wed 2:00 PM', status: 'Assigned', icon: 'academics' }
    ]
  },

  '/settings': {
    title: 'System Preferences & Settings',
    category: 'Account',
    icon: 'settings',
    badge: 'Config Mode',
    stats: [
      { label: 'Theme Mode', value: 'System / Dynamic', change: 'Light & Dark Mode Enabled', color: 'accent' },
      { label: 'Security Status', value: '2FA Enabled', change: 'Hardware Passkey Linked', color: 'success' }
    ],
    cards: [
      { title: 'Appearance & Interface', desc: 'Customize contrast levels, font scale, accent colors, and desktop sidebar behaviors.', status: 'Configured', icon: 'settings' },
      { title: 'Notification Channels', desc: 'Configure instant push notifications for assignment deadlines and exam hall tickets.', status: 'Active', icon: 'notifications' }
    ]
  }
};

export function PlaceholderPage({ routePath }) {
  const path = routePath || window.location.pathname;
  const config = pageConfigs[path] || {
    title: 'UniFlow X Module View',
    category: 'Application Shell',
    icon: 'dashboard',
    badge: 'Active Module',
    stats: [{ label: 'Module Status', value: 'Operational', change: 'Route Active', color: 'accent' }],
    cards: [{ title: 'Module Initialized', desc: 'This route is active in the UniFlow X application router.', status: 'Ready', icon: 'sparkles' }]
  };

  return (
    <PageContainer className="v2-placeholder-page">
      <div className="page-header">
        <div>
          <h1>{config.title}</h1>
          <p>Connected shell view for route <code>{path}</code>.</p>
        </div>
        <div className="page-header-actions">
          <span className="badge badge-info">{config.badge}</span>
        </div>
      </div>

      {/* Metrics Row */}
      {config.stats && (
        <div className="v2-hero-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {config.stats.map((stat, idx) => (
            <div key={idx} className="card">
              <span className="box-tag">{stat.label}</span>
              <div className="big-perc" style={{ marginTop: '8px', fontSize: '1.8rem' }}>{stat.value}</div>
              <span className="v2-attendance-hint">{stat.change}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cards Row */}
      <section className="section">
        <div className="v2-events-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {config.cards &&
            config.cards.map((card, idx) => (
              <div key={idx} className="card">
                <div className="box-header" style={{ marginBottom: '10px' }}>
                  <Icon name={card.icon || config.icon} size={20} style={{ color: 'var(--accent)' }} />
                  <span className="badge badge-secondary">{card.status}</span>
                </div>
                <h3 className="class-title" style={{ fontSize: '1.1rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default PlaceholderPage;
