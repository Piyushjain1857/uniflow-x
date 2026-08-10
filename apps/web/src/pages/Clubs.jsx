import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';

const clubsList = [
  { id: 1, name: 'ACM Student Chapter', category: 'Technology & Coding', members: '240 Members', role: 'Technical Lead', desc: 'Weekly competitive programming contests, open-source sprints, and technical guest lectures.', status: 'Joined' },
  { id: 2, name: 'Design & UX Guild', category: 'Product & Design', members: '180 Members', role: 'Member', desc: 'Figma workshops, UI critique sessions, design systems research, and product prototyping.', status: 'Joined' },
  { id: 3, name: 'Robotics & Automation Club', category: 'Engineering', members: '155 Members', role: 'Explore', desc: 'Drone building, Arduino/Raspberry Pi hardware labs, and national robotics competitions.', status: 'Open' },
  { id: 4, name: 'Campus Music Society', category: 'Arts & Culture', members: '310 Members', role: 'Explore', desc: 'Acoustic jam sessions, annual battle of the bands, and campus music festival production.', status: 'Open' },
];

export function Clubs() {
  return (
    <PageContainer className="v2-clubs-page">
      <div className="page-header">
        <div>
          <h1>Societies & Student Clubs</h1>
          <p>Join campus communities, lead technical chapters, and build projects.</p>
        </div>
      </div>

      <div className="v2-events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {clubsList.map((club) => (
          <div key={club.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <div className="event-top" style={{ marginBottom: '10px' }}>
                <span className="badge badge-secondary">{club.category}</span>
                <span className="badge badge-info">{club.members}</span>
              </div>
              <h3 className="event-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{club.name}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
                {club.desc}
              </p>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Role: <span style={{ color: 'var(--text)' }}>{club.role}</span>
              </span>
              <button className={`btn ${club.status === 'Joined' ? 'btn-secondary' : 'btn-primary'} sm-btn`}>
                {club.status === 'Joined' ? 'Member Portal' : 'Join Society'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default Clubs;
