import React from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Timetable() {
  const { todayTimeline } = mockData;

  return (
    <PageContainer className="v2-timetable-page">
      <div className="v2-page-header">
        <h1 className="v2-title">Monday — 10 August</h1>
        <div className="v2-week-selector">
          <button className="v2-arrow-btn">←</button>
          <span className="v2-week-label">Aug 10 – 16</span>
          <button className="v2-arrow-btn">→</button>
        </div>
      </div>

      <section className="v2-section">
        <div className="v2-vertical-timeline">
          {todayTimeline.map((cls) => (
            <div key={cls.id} className="timeline-node">
              <div className="node-time">{cls.time}</div>
              <div className="node-line-col">
                <div className="node-dot" />
                <div className="node-line" />
              </div>
              <div className="node-content">
                <h4 className="node-subject">{cls.subject}</h4>
                <p className="node-meta">{cls.room} · {cls.faculty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Timetable;
