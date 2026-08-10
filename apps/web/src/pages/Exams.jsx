import React from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Exams() {
  const { student } = mockData;

  const examsList = [
    { id: 1, subject: 'CS401 Distributed Systems', code: 'CS401', date: 'Sept 02, 2026', time: '10:00 AM - 12:00 PM', venue: 'Hall B (Block B-201)', seat: 'Desk #42', status: 'Hall Ticket Ready' },
    { id: 2, subject: 'CS402 AI & Neural Networks', code: 'CS402', date: 'Sept 04, 2026', time: '02:00 PM - 04:00 PM', venue: 'Lab 3 (Tech Block)', seat: 'Desk #18', status: 'Hall Ticket Ready' },
    { id: 3, subject: 'Math301 Advanced Calculus', code: 'MATH301', date: 'Sept 07, 2026', time: '09:00 AM - 11:00 AM', venue: 'Auditorium C', seat: 'Desk #95', status: 'Upcoming' },
  ];

  return (
    <PageContainer className="v2-exams-page">
      <div className="page-header">
        <div>
          <h1>Exams & Midterms</h1>
          <p>Schedule, seating hall tickets, and academic grades.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary">
            <Icon name="download" size={14} /> Download Hall Ticket Pass
          </button>
        </div>
      </div>

      {/* Overview Metric Stats Grid */}
      <div className="v2-hero-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="card">
          <span className="box-tag">Cumulative GPA</span>
          <div className="big-perc" style={{ marginTop: '8px' }}>{student.overallGpa} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 4.0</span></div>
          <span className="v2-attendance-hint">Top 5% Rank in Department</span>
        </div>
        <div className="card">
          <span className="box-tag">Upcoming Exams</span>
          <div className="big-perc" style={{ marginTop: '8px', color: 'var(--accent)' }}>3 Midterms</div>
          <span className="v2-attendance-hint">Starting Sept 02, 2026</span>
        </div>
        <div className="card">
          <span className="box-tag">Hall Ticket Status</span>
          <div className="big-perc" style={{ marginTop: '8px', color: 'var(--success)' }}>Issued</div>
          <span className="v2-attendance-hint">Seating: Block B-201 · Desk #42</span>
        </div>
      </div>

      {/* EXAMS ROSTER LIST */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">UPCOMING MIDTERM EXAMINATIONS</h3>
        </div>

        <div className="v2-divider-list">
          {examsList.map((exam) => (
            <div key={exam.id} className="v2-divider-row" style={{ padding: '20px 0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{exam.subject}</h4>
                  <span className="badge badge-info">{exam.status}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <Icon name="calendar" size={13} /> {exam.date} · {exam.time} · <Icon name="campusMap" size={13} /> {exam.venue} · <strong>{exam.seat}</strong>
                </p>
              </div>

              <button className="btn btn-outline sm-btn">
                Download QR
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Exams;
