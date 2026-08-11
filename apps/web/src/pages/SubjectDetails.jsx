import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { getSubjectDetails } from '@uniflow-x/utils/academics';

export function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await getSubjectDetails(id);
        setSubject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadSubject();
  }, [id]);

  if (loading || !subject) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>{loading ? 'Loading Subject...' : 'Subject Not Found'}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={{ marginBottom: 24 }}>
        <Button variant="ghost" icon="chevronLeft" onClick={() => navigate('/academics')} style={{ padding: '8px 0' }}>
          Back to Academics
        </Button>
      </div>

      <div className="v2-page-header" style={{ marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span className="badge badge-primary">{subject.code}</span>
            <span className="badge badge-secondary">{subject.credits} Credits</span>
          </div>
          <h1 className="v2-title">{subject.name}</h1>
          <p className="v2-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="profile" size={16} /> {subject.faculty}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{subject.currentGrade}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Current Grade</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Overview */}
          <div className="v2-surface-box" style={{ padding: 0 }}>
            <div className="v2-divider-list">
              <div className="list-row" style={{ padding: '16px 24px' }}>
                <span style={{ color: 'var(--text-muted)', width: 120, fontWeight: 600 }}>Schedule</span>
                <span style={{ flex: 1, fontWeight: 500, color: 'var(--text)' }}>{subject.schedule}</span>
              </div>
              <div className="list-row" style={{ padding: '16px 24px' }}>
                <span style={{ color: 'var(--text-muted)', width: 120, fontWeight: 600 }}>Next Class</span>
                <span style={{ flex: 1, fontWeight: 500, color: 'var(--text)' }}>{subject.nextClass}</span>
              </div>
              <div className="list-row" style={{ padding: '16px 24px' }}>
                <span style={{ color: 'var(--text-muted)', width: 120, fontWeight: 600 }}>Attendance</span>
                <span style={{ flex: 1, fontWeight: 500, color: 'var(--success)' }}>{subject.attendance}</span>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div className="v2-surface-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Assignments</h3>
              <span className="badge badge-secondary">{subject.assignments.length} total</span>
            </div>
            
            {subject.assignments.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No assignments found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {subject.assignments.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'var(--surface-1)', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => navigate('/assignments')}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due: {a.dueDate}</div>
                    </div>
                    <span className={`badge ${a.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Grades */}
          <div className="v2-surface-box">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Grades Breakdown</h3>
            {subject.grades.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No grades published yet.</p>
            ) : (
              <div className="v2-divider-list">
                {subject.grades.map((g, idx) => (
                  <div key={idx} className="list-row" style={{ padding: '12px 0', borderBottom: idx === subject.grades.length - 1 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{g.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Weight: {g.weight}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--text)' }}>{g.score}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course Materials */}
          <div className="v2-surface-box">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Course Materials</h3>
            {subject.materials.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No materials uploaded.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {subject.materials.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, backgroundColor: 'var(--surface-1)', borderRadius: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="academics" size={16} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{m.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 2 }}>{m.type} • {m.date}</div>
                    </div>
                    <Button variant="ghost" icon="chevronRight" style={{ padding: 8 }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </PageContainer>
  );
}

export default SubjectDetails;
