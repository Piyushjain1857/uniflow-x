import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Attendance() {
  const { attendance, recentMarkedClasses } = mockData;
  const [semester, setSemester] = useState('This Semester');

  return (
    <PageContainer className="v8-attendance-page">
      {/* Header */}
      <div className="v8-page-header">
        <div>
          <h1 className="v8-page-title">Attendance</h1>
          <p className="v8-page-sub">Track your class attendance in real-time.</p>
        </div>
        <select className="v8-semester-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option>This Semester</option>
          <option>Last Semester</option>
        </select>
      </div>

      {/* Two-Column: Overall + Subject Wise */}
      <section className="v8-two-col">
        {/* Left: Overall Attendance */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Overall Attendance</h3>
          </div>
          <div className="v8-attendance-donut-wrap">
            <div className="v8-donut-container v8-donut-lg">
              <svg viewBox="0 0 120 120" className="v8-donut-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-2)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="var(--accent)" strokeWidth="12"
                  strokeDasharray={`${(attendance.overallPercentage / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="v8-donut-center">
                <span className="v8-donut-value v8-donut-value-lg">{attendance.overallPercentage}%</span>
              </div>
            </div>
            <div className="v8-att-summary-row">
              <div className="v8-att-summary-item">
                <span className="v8-att-summary-dot" style={{ background: 'var(--success)' }} />
                <span className="v8-att-summary-label">Present</span>
                <span className="v8-att-summary-val">{attendance.attendedClasses}</span>
              </div>
              <div className="v8-att-summary-item">
                <span className="v8-att-summary-dot" style={{ background: 'var(--danger)' }} />
                <span className="v8-att-summary-label">Absent</span>
                <span className="v8-att-summary-val">{attendance.absentClasses}</span>
              </div>
              <div className="v8-att-summary-item">
                <span className="v8-att-summary-dot" style={{ background: 'var(--text-muted)' }} />
                <span className="v8-att-summary-label">Total</span>
                <span className="v8-att-summary-val">{attendance.totalClasses}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Subject Wise */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Subject Wise</h3>
          </div>
          <div className="v8-subject-att-list">
            {attendance.subjects.map((sub) => (
              <div key={sub.id} className="v8-subject-att-row">
                <div className="v8-subject-att-info">
                  <span className="v8-subject-att-name">{sub.name} ({sub.code})</span>
                  <span className="v8-subject-att-pct">{sub.percentage}%</span>
                </div>
                <div className="v8-subject-att-bar">
                  <div
                    className="v8-subject-att-fill"
                    style={{
                      width: `${sub.percentage}%`,
                      background: sub.percentage >= 85 ? 'var(--success)' : sub.percentage >= 75 ? 'var(--accent)' : sub.percentage >= 65 ? 'var(--warning)' : 'var(--danger)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Marked Classes Table */}
      <section className="v8-section">
        <div className="v8-section-header">
          <h3 className="v8-section-label">RECENT MARKED CLASSES</h3>
        </div>
        <div className="v8-panel">
          <div className="v8-table-wrap">
            <table className="v8-mini-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Faculty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMarkedClasses.map((cls, idx) => (
                  <tr key={idx}>
                    <td>{cls.date}</td>
                    <td className="v8-cell-bold">{cls.subject}</td>
                    <td>{cls.faculty}</td>
                    <td>
                      <span className={`v8-status-badge v8-status-${cls.status.toLowerCase() === 'present' ? 'submitted' : 'overdue'}`}>
                        {cls.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Attendance;
