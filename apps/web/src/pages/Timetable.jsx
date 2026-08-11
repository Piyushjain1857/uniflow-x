import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Timetable() {
  const { timetableWeek } = mockData;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [activeDay, setActiveDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('Day');

  const slots = timetableWeek[activeDay] || [];

  return (
    <PageContainer className="v8-timetable-page">
      {/* Header */}
      <div className="v8-page-header">
        <div>
          <h1 className="v8-page-title">Timetable</h1>
          <p className="v8-page-sub">{activeDay} — 10 August</p>
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="v8-timetable-nav">
        <div className="v8-date-nav-left">
          <button className="v8-nav-arrow" onClick={() => {
            const idx = days.indexOf(activeDay);
            if (idx > 0) setActiveDay(days[idx - 1]);
          }}>←</button>
          <span className="v8-date-range">Aug 10 - Aug 16</span>
          <button className="v8-nav-arrow" onClick={() => {
            const idx = days.indexOf(activeDay);
            if (idx < days.length - 1) setActiveDay(days[idx + 1]);
          }}>→</button>
        </div>

        <div className="v8-day-tabs">
          {days.map((day) => (
            <button
              key={day}
              className={`v8-day-tab ${activeDay === day ? 'active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="v8-view-toggle">
          {['Week', 'Day'].map((mode) => (
            <button
              key={mode}
              className={`v8-view-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Slots */}
      <section className="v8-timetable-slots">
        {slots.map((slot, idx) => (
          <div key={idx} className="v8-timetable-slot" style={{ borderLeftColor: slot.color }}>
            <div className="v8-slot-time-col">
              <span className="v8-slot-time">{slot.time}</span>
            </div>
            <div className="v8-slot-card" style={{ borderLeftColor: slot.color }}>
              <div className="v8-slot-card-top">
                <h4 className="v8-slot-subject">{slot.subject} ({slot.code})</h4>
                {slot.tag && <span className="v8-slot-tag">{slot.tag}</span>}
              </div>
              <p className="v8-slot-meta">{slot.room} · {slot.faculty}</p>
              <span className="v8-slot-duration">{slot.duration}</span>
            </div>
          </div>
        ))}
      </section>
    </PageContainer>
  );
}

export default Timetable;
