import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Dashboard() {
  const [aiQuery, setAiQuery] = useState('');
  const { student, statCards, todayTimeline, assignmentsList, announcement, aiSuggestedPrompts } = mockData;

  const upcomingAssignments = assignmentsList.filter(a => a.status === 'Upcoming').slice(0, 5);

  return (
    <PageContainer className="v8-dashboard-page">
      {/* 1. Greeting */}
      <section className="v8-greeting">
        <h1 className="v8-greeting-title">
          {student.greetingMuted} <span className="greeting-name">{student.greetingBold}</span>
        </h1>
        <p className="v8-greeting-sub">{student.subheading}</p>
      </section>

      {/* 2. Stat Cards Row */}
      <section className="v8-stat-row">
        {statCards.map((card) => (
          <div key={card.id} className={`v8-stat-card v8-stat-${card.color}`}>
            <div className="v8-stat-icon-wrap">
              <Icon name={card.icon} size={18} />
            </div>
            <div className="v8-stat-info">
              <span className="v8-stat-value">{card.value}</span>
              <span className="v8-stat-label">{card.label}</span>
            </div>
            <span className="v8-stat-sub">{card.sub}</span>
          </div>
        ))}
      </section>

      {/* 3. Two-Column: Today's Schedule + Upcoming Assignments */}
      <section className="v8-two-col">
        {/* Left: Today's Schedule */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Today's Schedule</h3>
            <Link to="/timetable" className="v8-panel-link">View Timetable</Link>
          </div>
          <div className="v8-schedule-list">
            {todayTimeline.map((item) => (
              <div key={item.id} className="v8-schedule-item" style={{ borderLeftColor: item.color }}>
                <div className="v8-schedule-time">{item.time}</div>
                <div className="v8-schedule-info">
                  <span className="v8-schedule-subject">{item.subject}</span>
                  <span className="v8-schedule-meta">{item.room} · {item.faculty}</span>
                </div>
                {item.isNow && <span className="v8-now-badge">Now</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Assignments */}
        <div className="v8-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Upcoming Assignments</h3>
            <Link to="/assignments" className="v8-panel-link">View All</Link>
          </div>
          <div className="v8-table-wrap">
            <table className="v8-mini-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Marks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAssignments.map((asg) => (
                  <tr key={asg.id}>
                    <td className="v8-cell-bold">{asg.title}</td>
                    <td>{asg.subject}</td>
                    <td>{asg.dueDate}</td>
                    <td>{asg.marks}</td>
                    <td>
                      <span className={`v8-status-badge v8-status-${asg.status.toLowerCase()}`}>
                        {asg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="v8-table-footer">
            <span className="v8-table-count">Total: {assignmentsList.length}</span>
            <Link to="/assignments" className="v8-view-all-btn">View All Assignments</Link>
          </div>
        </div>
      </section>

      {/* 4. Two-Column: AI Assistant + Announcement */}
      <section className="v8-two-col">
        {/* Left: AI Assistant Preview */}
        <div className="v8-panel v8-ai-preview-panel">
          <div className="v8-panel-header">
            <div className="v8-ai-header-left">
              <div className="v8-ai-avatar">
                <Icon name="uniAi" size={16} />
              </div>
              <div>
                <h3 className="v8-panel-title">AI Assistant</h3>
                <p className="v8-ai-subtitle">Hi Piyush! I can help you with your studies.</p>
              </div>
            </div>
          </div>

          <div className="v8-ai-prompt-chips">
            {aiSuggestedPrompts.map((prompt, idx) => (
              <button key={idx} className="v8-prompt-chip" onClick={() => setAiQuery(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="v8-ai-input-row" onSubmit={(e) => { e.preventDefault(); if(aiQuery.trim()) { setAiQuery(''); } }}>
            <input
              type="text"
              placeholder="Ask anything..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="v8-ai-input"
            />
            <button type="submit" className="v8-ai-send-btn">→</button>
          </form>
        </div>

        {/* Right: Announcement */}
        <div className="v8-panel v8-announcement-panel">
          <div className="v8-panel-header">
            <h3 className="v8-panel-title">Announcement</h3>
          </div>
          <div className="v8-announcement-body">
            <span className="v8-announcement-tag">{announcement.tag}</span>
            <h4 className="v8-announcement-title">{announcement.title}</h4>
            <p className="v8-announcement-desc">{announcement.description}</p>
            <p className="v8-announcement-author">{announcement.author}</p>
            <button className="btn btn-primary sm-btn" style={{ marginTop: '12px' }}>
              {announcement.cta} →
            </button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Dashboard;
