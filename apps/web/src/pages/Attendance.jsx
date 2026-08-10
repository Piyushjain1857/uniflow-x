import React from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Attendance() {
  const { attendance } = mockData;

  return (
    <PageContainer className="v2-attendance-page">
      <div className="v2-page-header">
        <h1 className="v2-title">Attendance</h1>
        <p className="v2-subtitle">Lecture presence and threshold analytics.</p>
      </div>

      {/* Main Attendance Overview Surface */}
      <section className="v2-section">
        <div className="v2-surface-box attendance-main-surface">
          <div className="att-number-block">
            <span className="att-big-number">{attendance.overallPercentage}%</span>
            <div>
              <h3 className="att-status-heading">{attendance.statusText}</h3>
              <p className="att-class-count">{attendance.attendedClasses} / {attendance.totalClasses} classes attended</p>
            </div>
          </div>

          <div className="v2-progress-track" style={{ height: '8px', margin: '20px 0 16px' }}>
            <div className="v2-progress-fill" style={{ width: `${attendance.overallPercentage}%` }} />
          </div>

          <div className="att-rule-hint">
            <span className="hint-icon">💡</span>
            <span>{attendance.missableClassesText}</span>
          </div>
        </div>
      </section>

      {/* Subject Breakdown List */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">SUBJECT BREAKDOWN</h3>
        </div>

        <div className="v2-divider-list">
          {attendance.subjects.map((sub) => (
            <div key={sub.id} className="v2-divider-row">
              <div className="row-left">
                <span className="v2-subject-code">{sub.code}</span>
                <div>
                  <h4 className="v2-subject-title">{sub.name}</h4>
                  <span className="v2-subject-sub">{sub.faculty} · {sub.present} Present / {sub.absent} Absent</span>
                </div>
              </div>

              <div className="row-right">
                <span className="v2-percentage-val">{sub.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Attendance;
