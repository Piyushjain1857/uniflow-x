import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';

const timetableData = {
  Monday: [
    { time: '09:00 AM - 10:30 AM', subject: 'CS401 Distributed Systems', room: 'Room 304B', faculty: 'Prof. Mark Davis', status: 'Lecture' },
    { time: '11:30 AM - 01:00 PM', subject: 'CS402 AI & Neural Networks', room: 'Lab 2 (Tech Block)', faculty: 'Dr. Sarah Jenkins', status: 'Lab Session' },
    { time: '02:15 PM - 03:45 PM', subject: 'Math301 Advanced Calculus', room: 'Auditorium C', faculty: 'Prof. Alan Turing', status: 'Lecture' },
  ],
  Tuesday: [
    { time: '10:00 AM - 11:30 AM', subject: 'CS405 Cloud Native Infrastructure', room: 'Lab 4', faculty: 'Prof. Mark Davis', status: 'Lab Session' },
    { time: '01:30 PM - 03:00 PM', subject: 'CS401 Distributed Systems', room: 'Room 304B', faculty: 'Prof. Mark Davis', status: 'Lecture' },
  ],
  Wednesday: [
    { time: '09:00 AM - 10:30 AM', subject: 'CS402 AI & Neural Networks', room: 'Room 201', faculty: 'Dr. Sarah Jenkins', status: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Math301 Advanced Calculus', room: 'Auditorium C', faculty: 'Prof. Alan Turing', status: 'Lecture' },
  ],
  Thursday: [
    { time: '10:00 AM - 12:00 PM', subject: 'CS405 Cloud Systems Lab', room: 'Lab 4', faculty: 'Prof. Mark Davis', status: 'Lab Session' },
    { time: '02:00 PM - 03:30 PM', subject: 'CS402 AI & Neural Networks', room: 'Room 201', faculty: 'Dr. Sarah Jenkins', status: 'Lecture' },
  ],
  Friday: [
    { time: '09:30 AM - 11:00 AM', subject: 'Math301 Advanced Calculus', room: 'Auditorium C', faculty: 'Prof. Alan Turing', status: 'Lecture' },
    { time: '02:00 PM - 04:00 PM', subject: 'Student Research Seminar', room: 'Main Auditorium', faculty: 'Guest Speaker Series', status: 'Seminar' },
  ]
};

export function Timetable() {
  const [activeDay, setActiveDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <PageContainer className="v2-timetable-page">
      <div className="page-header">
        <div>
          <h1>Weekly Timetable</h1>
          <p>Interactive schedule, room locations, and faculty roster.</p>
        </div>
      </div>

      {/* Day Filter Bar */}
      <div className="notif-filter-bar" style={{ marginBottom: '28px' }}>
        <div className="notif-filter-tabs">
          {days.map((day) => (
            <button
              key={day}
              className={`notif-tab-btn ${activeDay === day ? 'active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* TIMETABLE SLOTS */}
      <section className="section">
        <div className="v2-divider-list">
          {timetableData[activeDay]?.map((slot, idx) => (
            <div key={idx} className="v2-divider-row" style={{ padding: '20px 0' }}>
              <div style={{ minWidth: '160px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {slot.time}
                </span>
                <div style={{ marginTop: '4px' }}>
                  <span className="badge badge-secondary">{slot.status}</span>
                </div>
              </div>

              <div style={{ flex: 1, paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{slot.subject}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {slot.faculty} · <Icon name="campusMap" size={13} /> {slot.room}
                </p>
              </div>

              <div>
                <button className="btn btn-outline sm-btn">
                  View Room Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Timetable;
