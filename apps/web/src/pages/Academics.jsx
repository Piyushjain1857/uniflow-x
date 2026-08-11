import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Timeline from '../components/ui/Timeline';
import { getAcademicsSummary, getSubjects } from '@uniflow-x/utils/academics';

export function Academics() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sumData, subData] = await Promise.all([
          getAcademicsSummary(),
          getSubjects()
        ]);
        setSummary(sumData);
        setSubjects(subData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !summary) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Academics...</div>
      </PageContainer>
    );
  }

  const gpaPercent = (summary.gpa.current / summary.gpa.max) * 100;
  const creditsPercent = (summary.credits.earned / summary.credits.total) * 100;

  return (
    <PageContainer className="v8-academics-page">
      {/* Header */}
      <div className="v2-page-header" style={{ marginBottom: 32 }}>
        <div>
          <h1 className="v2-title">Academics</h1>
          <p className="v2-subtitle">Your academic performance at a glance.</p>
        </div>
      </div>

      {/* Top Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div className="v2-surface-box">
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>{summary.term}</p>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text)' }}>{summary.degree}</h3>
          <p style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 600, margin: 0 }}>{summary.semester}</p>
        </div>
        
        <div className="v2-surface-box">
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Cumulative GPA</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h3 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: 'var(--text)' }}>{summary.gpa.current.toFixed(2)}</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: 16, fontWeight: 600 }}>/ {summary.gpa.max.toFixed(1)}</span>
          </div>
          <div style={{ height: 4, backgroundColor: 'var(--border)', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${gpaPercent}%`, backgroundColor: 'var(--accent)' }} />
          </div>
        </div>

        <div className="v2-surface-box">
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Credits Earned</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h3 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: 'var(--text)' }}>{summary.credits.earned}</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: 16, fontWeight: 600 }}>/ {summary.credits.total}</span>
          </div>
          <div style={{ height: 4, backgroundColor: 'var(--border)', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${creditsPercent}%`, backgroundColor: 'var(--success)' }} />
          </div>
        </div>
      </div>

      {/* Subject Overview */}
      <div className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">Enrolled Subjects</h3>
        </div>
        <div className="v2-surface-box" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Course Code</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Faculty</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Credits</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Attendance</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Assignments</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => (
                <tr 
                  key={sub.id} 
                  style={{ borderBottom: idx === subjects.length - 1 ? 'none' : '1px solid var(--border)', cursor: 'pointer' }}
                  onClick={() => navigate(`/academics/${sub.id}`)}
                  className="list-row"
                >
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text)' }}>
                    {sub.name}
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>Next: {sub.nextClass}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{sub.code}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{sub.faculty}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{sub.credits}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span className="badge badge-secondary">{sub.attendance}</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {sub.assignmentCount > 0 ? (
                      <span className="badge badge-warning">{sub.assignmentCount} pending</span>
                    ) : (
                      <span className="badge badge-success">All clear</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary)' }}>{sub.currentGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
        
        {/* GPA Trend */}
        <div className="v2-surface-box">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>GPA Trend</h3>
          <div className="v8-gpa-chart" style={{ height: 200, padding: 0, marginTop: 10 }}>
            <div className="v8-gpa-y-axis">
              {[4.0, 3.5, 3.0].map(v => (
                <span key={v} className="v8-y-label">{v.toFixed(1)}</span>
              ))}
            </div>
            <div className="v8-gpa-bars">
              {summary.gpaTrend.map((item, idx) => (
                <div key={idx} className="v8-gpa-bar-col">
                  <div className="v8-gpa-bar-track" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <div
                      className="v8-gpa-bar-fill"
                      style={{ height: `${((item.gpa - 3.0) / 1.0) * 100}%`, backgroundColor: 'var(--primary)' }}
                    />
                  </div>
                  <span className="v8-gpa-bar-label" style={{ fontSize: 11 }}>{item.semester}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="v2-surface-box">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Attendance Overview</h3>
          <div className="v8-attendance-donut-wrap" style={{ justifyContent: 'flex-start', gap: 32 }}>
            <div className="v8-donut-container" style={{ width: 140, height: 140 }}>
              <svg viewBox="0 0 120 120" className="v8-donut-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-3)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="var(--accent)" strokeWidth="12"
                  strokeDasharray={`${(summary.attendanceOverview.overall / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="v8-donut-center">
                <span className="v8-donut-value" style={{ fontSize: 24, fontWeight: 800 }}>{summary.attendanceOverview.overall}%</span>
              </div>
            </div>
            <div className="v8-donut-legend" style={{ alignSelf: 'center' }}>
              <div className="v8-legend-item" style={{ marginBottom: 12 }}>
                <span className="v8-legend-dot" style={{ background: 'var(--accent)', width: 12, height: 12 }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Present</span>
                <span className="v8-legend-val">{summary.attendanceOverview.present}</span>
              </div>
              <div className="v8-legend-item">
                <span className="v8-legend-dot" style={{ background: 'var(--surface-3)', width: 12, height: 12 }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Absent</span>
                <span className="v8-legend-val">{summary.attendanceOverview.absent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="v2-surface-box">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Recent Activity</h3>
          <Timeline items={summary.recentActivity} />
        </div>

      </div>
    </PageContainer>
  );
}

export default Academics;
