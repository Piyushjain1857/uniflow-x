import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Dashboard() {
  const [aiQuery, setAiQuery] = useState('');
  const { student, nextClass, attendance, todayTimeline, attentionRows, upcomingCampusEvents, aiSuggestedPrompts } = mockData;

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      alert(`UniAI Query: "${aiQuery}"`);
      setAiQuery('');
    }
  };

  return (
    <PageContainer className="v2-dashboard-page">
      {/* 1. Large Typographic Greeting */}
      <section className="v2-greeting-section">
        <h1 className="v2-greeting-title">
          <span className="greeting-muted">{student.greetingMuted}</span> <br />
          <span className="greeting-bold">{student.greetingBold}</span>
        </h1>
        <div className="v2-greeting-meta">
          <span className="meta-date">{student.dateFormatted}</span>
          <span className="meta-dot">·</span>
          <span className="meta-sub">{student.subheading}</span>
        </div>
      </section>

      {/* 2. Asymmetric Hero Section (Next Class + Attendance) */}
      <section className="v2-hero-grid">
        {/* Left Hero Box: NEXT CLASS */}
        <div className="v2-hero-box next-class-hero">
          <div className="box-header">
            <span className="box-tag">NEXT CLASS</span>
            <span className="box-pill-timer">{nextClass.countdown}</span>
          </div>

          <div className="box-body">
            <h2 className="class-title">{nextClass.subject}</h2>
            <div className="class-details-row">
              <span className="detail-item"><Icon name="timetable" size={14} /> {nextClass.time}</span>
              <span className="detail-item"><Icon name="campusMap" size={14} /> {nextClass.room}</span>
              <span className="detail-item"><Icon name="faculty" size={14} /> {nextClass.faculty}</span>
            </div>
          </div>
        </div>

        {/* Right Hero Box: ATTENDANCE */}
        <div className="v2-hero-box attendance-hero">
          <div className="box-header">
            <span className="box-tag">ATTENDANCE</span>
            <span className="box-status-pill">{attendance.statusText}</span>
          </div>

          <div className="box-body">
            <div className="attendance-number-row">
              <span className="big-perc">{attendance.overallPercentage}%</span>
              <span className="class-counts">{attendance.attendedClasses} / {attendance.totalClasses} classes</span>
            </div>

            <div className="v2-progress-track">
              <div className="v2-progress-fill" style={{ width: `${attendance.overallPercentage}%` }} />
            </div>

            <p className="v2-attendance-hint">{attendance.missableClassesText}</p>

            <Link to="/attendance" className="v2-box-link">
              View details →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TODAY SECTION (Vertical Timeline) */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">TODAY</h3>
        </div>

        <div className="v2-vertical-timeline">
          {todayTimeline.map((item) => (
            <div key={item.id} className="timeline-node">
              <div className="node-time">{item.time}</div>
              <div className="node-line-col">
                <div className="node-dot" />
                <div className="node-line" />
              </div>
              <div className="node-content">
                <h4 className="node-subject">{item.subject}</h4>
                <p className="node-meta">{item.room} · {item.faculty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEEDS YOUR ATTENTION SECTION */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">NEEDS YOUR ATTENTION</h3>
        </div>

        <div className="v2-divider-list">
          {attentionRows.map((row) => (
            <Link key={row.id} to={row.link} className="v2-divider-row">
              <div className="row-text-wrap">
                <span className="row-title">{row.title}</span>
                <span className="row-sub">{row.sub}</span>
              </div>
              <span className="row-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING ON CAMPUS SECTION */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">UPCOMING ON CAMPUS</h3>
          <Link to="/events" className="v2-section-link">View all events →</Link>
        </div>

        <div className="v2-events-grid">
          {upcomingCampusEvents.map((ev) => (
            <div key={ev.id} className="v2-event-card">
              <div className="event-top">
                <span className="event-cat">{ev.category}</span>
                <span className="event-date">{ev.date}</span>
              </div>
              <h4 className="event-title">{ev.title}</h4>
              <p className="event-location"><Icon name="campusMap" size={13} /> {ev.location} · {ev.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LARGE UNIAI SECTION */}
      <section className="v2-section">
        <div className="v2-uniai-hero-block">
          <div className="uniai-block-header">
            <div className="uniai-mark">
              <Icon name="uniAi" size={20} />
            </div>
            <div>
              <h3 className="uniai-block-title">UniAI Assistant</h3>
              <p className="uniai-block-sub">Ask UniAI anything about your university.</p>
            </div>
          </div>

          <form onSubmit={handleAiSubmit} className="uniai-input-form">
            <input
              type="text"
              placeholder="What do you want to know?"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="uniai-large-input"
            />
            <button type="submit" className="uniai-submit-btn">
              Ask UniAI
            </button>
          </form>

          <div className="uniai-chips-row">
            <span className="chips-label">Suggested:</span>
            {aiSuggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="prompt-chip-btn"
                onClick={() => setAiQuery(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Dashboard;
