import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Button,
  Progress,
  Alert,
} from '../components/ui';
import { dashboardMockData } from '../data/dashboardMockData';

export function Dashboard() {
  const [aiQuery, setAiQuery] = useState('');
  const { studentInfo, nextClass, attendanceOverview, upcoming, attentionItems, uniAiPrompts } = dashboardMockData;

  const handleAiQuerySubmit = (e) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      alert(`UniAI Query Submitted: "${aiQuery}"`);
      setAiQuery('');
    }
  };

  return (
    <PageContainer className="dashboard-page">
      {/* 1. Header Greeting & Date */}
      <div className="dashboard-welcome-header">
        <div>
          <h1 className="welcome-title">{studentInfo.greeting}</h1>
          <p className="welcome-date">{studentInfo.todayDateFormatted} • {studentInfo.currentSemester}</p>
        </div>
        <div className="welcome-actions">
          <Badge variant="primary" size="md" hasDot>
            {studentInfo.role}
          </Badge>
        </div>
      </div>

      {/* 2. Attention Section (Notices, Warnings, Deadlines) */}
      <div className="attention-section">
        {attentionItems.map((item) => (
          <Alert
            key={item.id}
            variant={item.variant}
            title={item.title}
            isDismissible
            className="attention-banner"
          >
            {item.message}
          </Alert>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="dashboard-grid">
        {/* Left / Main Column */}
        <div className="dashboard-main-col">
          {/* Next Class Hero Card */}
          <div className="next-class-card">
            <div className="next-class-badge-row">
              <span className="live-status-pill">
                <span className="pulse-dot green" />
                <span>Next Class</span>
              </span>
              <span className="countdown-pill">{nextClass.countdown}</span>
            </div>

            <div className="next-class-info">
              <span className="next-class-code">{nextClass.code}</span>
              <h2 className="next-class-title">{nextClass.subject}</h2>
              <div className="next-class-meta">
                <div className="meta-item">
                  <Icon name="timetable" size={16} />
                  <span>{nextClass.time}</span>
                </div>
                <div className="meta-item">
                  <Icon name="campusMap" size={16} />
                  <span>{nextClass.room}</span>
                </div>
                <div className="meta-item">
                  <Icon name="faculty" size={16} />
                  <span>{nextClass.instructor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Overview Section */}
          <section className="dashboard-section">
            <div className="section-header-row">
              <div>
                <h3 className="section-title">Attendance Overview</h3>
                <p className="section-subtitle">Overall Average: <strong style={{ color: 'var(--color-success)' }}>{attendanceOverview.overallPercentage}%</strong> ({attendanceOverview.attendedClasses}/{attendanceOverview.totalClasses} lectures attended)</p>
              </div>
              <Link to="/attendance" className="section-link">View Full Record →</Link>
            </div>

            <div className="attendance-cards-grid">
              {attendanceOverview.subjects.map((sub) => (
                <Card key={sub.id} className="subject-attendance-card">
                  <div className="subject-card-header">
                    <span className="subject-code-badge">{sub.code}</span>
                    <Badge variant={sub.variant === 'success' ? 'success' : 'warning'} size="sm" hasDot>
                      {sub.percentage}%
                    </Badge>
                  </div>
                  <h4 className="subject-name">{sub.name}</h4>
                  <p className="subject-counts">{sub.attended} of {sub.total} classes attended</p>
                  <Progress value={sub.percentage} max={100} variant={sub.variant} size="sm" />
                </Card>
              ))}
            </div>
          </section>

          {/* Upcoming Section (Assignments, Exams, Events) */}
          <section className="dashboard-section">
            <div className="section-header-row">
              <h3 className="section-title">Upcoming Schedule & Tasks</h3>
            </div>

            <div className="upcoming-tabs-grid">
              {/* Upcoming Assignments Card */}
              <Card>
                <CardHeader>
                  <div className="card-title-row">
                    <Icon name="assignments" size={20} className="text-primary" />
                    <CardTitle style={{ fontSize: '1.05rem' }}>Pending Assignments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="upcoming-list">
                  {upcoming.assignments.map((asg) => (
                    <div key={asg.id} className="upcoming-item">
                      <div className="item-left">
                        <span className="item-code">{asg.code}</span>
                        <h5 className="item-title">{asg.title}</h5>
                        <span className="item-date">{asg.dueDate}</span>
                      </div>
                      {asg.urgent && <Badge variant="danger" size="sm">Urgent</Badge>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Exams Card */}
              <Card>
                <CardHeader>
                  <div className="card-title-row">
                    <Icon name="exams" size={20} className="text-purple" />
                    <CardTitle style={{ fontSize: '1.05rem' }}>Upcoming Exams</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="upcoming-list">
                  {upcoming.exams.map((ex) => (
                    <div key={ex.id} className="upcoming-item">
                      <div className="item-left">
                        <span className="item-code">{ex.code}</span>
                        <h5 className="item-title">{ex.title}</h5>
                        <span className="item-date">{ex.date} • {ex.hall}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* Right / Sidebar Column */}
        <div className="dashboard-side-col">
          {/* UniAI Copilot Interactive Card */}
          <Card className="uniai-copilot-card">
            <div className="uniai-header">
              <div className="uniai-icon-badge">
                <Icon name="uniAi" size={22} />
              </div>
              <div>
                <h3 className="uniai-title">UniAI Copilot</h3>
                <p className="uniai-subtitle">Instant University Assistant</p>
              </div>
            </div>

            <p className="uniai-prompt-text">
              "Ask UniAI anything about your university"
            </p>

            <form onSubmit={handleAiQuerySubmit} className="uniai-form">
              <div className="uniai-input-wrap">
                <input
                  type="text"
                  placeholder="Type a question or schedule request..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="uniai-input"
                />
                <button type="submit" className="uniai-send-btn" aria-label="Send query">
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </form>

            <div className="uniai-pills-list">
              <span className="uniai-pills-label">Quick Prompts:</span>
              {uniAiPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAiQuery(prompt)}
                  className="uniai-prompt-pill"
                >
                  <Icon name="sparkles" size={12} />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Quick Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="shortcuts-grid">
              <Link to="/digital-id" className="shortcut-btn">
                <Icon name="digitalId" size={18} />
                <span>Digital ID Pass</span>
              </Link>
              <Link to="/timetable" className="shortcut-btn">
                <Icon name="timetable" size={18} />
                <span>Timetable</span>
              </Link>
              <Link to="/campus-map" className="shortcut-btn">
                <Icon name="campusMap" size={18} />
                <span>Campus Map</span>
              </Link>
              <Link to="/complaints" className="shortcut-btn">
                <Icon name="complaints" size={18} />
                <span>Grievance Desk</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
