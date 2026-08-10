import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui';
import { mockData } from '../data/mockData';

export function Timetable() {
  const { timetableWeekly } = mockData;
  const [activeDay, setActiveDay] = useState('Monday');

  const selectedDayData = timetableWeekly.find((d) => d.day === activeDay) || timetableWeekly[0];

  return (
    <PageContainer className="timetable-page">
      <div className="page-header-block">
        <h1 className="page-title">Weekly Timetable</h1>
        <p className="page-subtitle">Spring Semester 2026 • B.Tech Computer Science & Engineering (Sem 4)</p>
      </div>

      {/* Desktop Weekly Grid Layout */}
      <div className="desktop-only">
        <div className="timetable-grid">
          {timetableWeekly.map((dayData) => (
            <Card key={dayData.day} className="timetable-day-column">
              <CardHeader className="day-header">
                <CardTitle style={{ fontSize: '1rem' }}>{dayData.day}</CardTitle>
              </CardHeader>
              <CardContent className="day-classes-stack">
                {dayData.classes.map((cls, idx) => (
                  <div key={idx} className="timetable-class-card">
                    <span className="class-time">{cls.time}</span>
                    <h4 className="class-subject">{cls.subject}</h4>
                    <p className="class-meta">{cls.room} • {cls.faculty}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Timeline Layout */}
      <div className="mobile-only">
        <div className="day-selector-row">
          {timetableWeekly.map((d) => (
            <button
              key={d.day}
              className={`day-tab-btn ${activeDay === d.day ? 'active' : ''}`}
              onClick={() => setActiveDay(d.day)}
            >
              {d.day.slice(0, 3)}
            </button>
          ))}
        </div>

        <Card style={{ marginTop: '1rem' }}>
          <CardHeader>
            <CardTitle>{selectedDayData.day} Schedule</CardTitle>
          </CardHeader>
          <CardContent className="mobile-vertical-timeline">
            {selectedDayData.classes.map((cls, idx) => (
              <div key={idx} className="mobile-timeline-item">
                <div className="time-col">{cls.time}</div>
                <div className="content-col">
                  <h4 className="class-subject">{cls.subject}</h4>
                  <p className="class-meta">{cls.room} • {cls.faculty}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Timetable;
