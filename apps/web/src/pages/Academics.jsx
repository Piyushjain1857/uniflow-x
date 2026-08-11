import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Academics() {
  const { student, academicsRoster, gpaTrend, attendance } = mockData;
  const [semester, setSemester] = useState('Semester 8 - 2026');

  const maxGpa = 4.0;

  return (
    <PageContainer className="v8-academics-page">
      {/* Header */}
      <div className="v8-page-header">
        <div>
          <h1 className="v8-page-title">Academics</h1>
          <p className="v8-page-sub">Cumulative GPA: {student.overallGpa} / 4.0</p>
        </div>
        <select className="v8-semester-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option>Semester 8 - 2026</option>
          <option>Semester 7 - 2025</option>
          <option>Semester 6 - 2025</option>
        </select>
      </div>

      {/* Subject Roster Table */}
      <section className="v8-section">
        <div className="v8-section-header">
          <h3 className="v8-section-label">SUBJECT ROSTER</h3>
        </div>
        <div className="v8-panel">
          <div className="v8-table-wrap">
            <table className="v8-mini-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Faculty</th>
                  <th>Attendance</th>
                  <th>Next Class</th>
                  <th>Assignments</th>
                </tr>
              </thead>
              <tbody>
                {academicsRoster.map((sub, idx) => (
                  <tr key={idx}>
                    <td className="v8-cell-bold">{sub.subject}</td>
                    <td>{sub.faculty}</td>
                    <td><span className="v8-status-badge v8-status-info">{sub.attendance}</span></td>
                    <td>{sub.nextClass}</td>
                    <td>
                      <span className={`v8-status-badge v8-status-${sub.assignmentStatus}`}>
                        {sub.assignments}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GPA Trend + Attendance Overview */}
      <section className="v8-two-col">
        {/* Left: GPA Trend */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">GPA Trend</h3>
            <span className="v8-panel-meta">Last 6 Semesters</span>
          </div>
          <div className="v8-gpa-chart">
            <div className="v8-gpa-y-axis">
              {[4.0, 3.5, 3.0, 2.5, 2.0].map(v => (
                <span key={v} className="v8-y-label">{v.toFixed(1)}</span>
              ))}
            </div>
            <div className="v8-gpa-bars">
              {gpaTrend.map((item, idx) => (
                <div key={idx} className="v8-gpa-bar-col">
                  <div className="v8-gpa-bar-track">
                    <div
                      className="v8-gpa-bar-fill"
                      style={{ height: `${(item.gpa / maxGpa) * 100}%` }}
                    />
                  </div>
                  <span className="v8-gpa-bar-label">{item.semester}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Attendance Overview */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Attendance Overview</h3>
            <span className="v8-panel-meta">This Semester</span>
          </div>
          <div className="v8-attendance-donut-wrap">
            <div className="v8-donut-container">
              <svg viewBox="0 0 120 120" className="v8-donut-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-2)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="var(--accent)" strokeWidth="10"
                  strokeDasharray={`${(attendance.overallPercentage / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="v8-donut-center">
                <span className="v8-donut-value">{attendance.overallPercentage}%</span>
              </div>
            </div>
            <div className="v8-donut-legend">
              <div className="v8-legend-item">
                <span className="v8-legend-dot" style={{ background: 'var(--accent)' }} />
                <span>Present</span>
                <span className="v8-legend-val">{Math.round((attendance.attendedClasses / attendance.totalClasses) * 100)}%</span>
              </div>
              <div className="v8-legend-item">
                <span className="v8-legend-dot" style={{ background: 'var(--warning)' }} />
                <span>Absent</span>
                <span className="v8-legend-val">{Math.round((attendance.absentClasses / attendance.totalClasses) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Academics;
