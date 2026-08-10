import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';
import {
  Card, CardHeader, CardTitle, CardContent,
  Badge,
  Button,
  Progress,
  Alert,
} from '../components/ui';
import { mockData } from '../data/mockData';

export function Dashboard() {
  const [aiQuery, setAiQuery] = useState('');
  const { student, nextClass, attendance, todayTimeline, attentionItems, upcomingEvents } = mockData;

  const handleAiAsk = (e) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      alert(`UniAI Query: "${aiQuery}"`);
      setAiQuery('');
    }
  };

  return (
    <PageContainer className="dashboard-page">
      {/* 1. Top Header */}
      <div className="dashboard-header-block">
        <div>
          <h1 className="dashboard-greeting">{student.greeting}</h1>
          <p className="dashboard-date-meta">{student.todayFormatted} • {student.currentSemester}</p>
        </div>
        <div className="dashboard-user-badge">
          <Badge variant="primary" size="md">
            {student.program} (Sem 4)
          </Badge>
        </div>
      </div>

      {/* 2. NEXT CLASS HERO CARD */}
      <div className="next-class-card">
        <div className="next-class-header">
          <div className="next-class-badge">
            <span className="pulse-dot green" />
            <span>NEXT CLASS</span>
          </div>
          <span className="countdown-pill">{nextClass.countdown}</span>
        </div>

        <div className="next-class-content">
          <span className="next-class-code">{nextClass.code}</span>
          <h2 className="next-class-name">{nextClass.subject}</h2>
          <div className="next-class-details">
            <span className="meta-pill"><Icon name="timetable" size={14} /> {nextClass.time}</span>
            <span className="meta-pill"><Icon name="campusMap" size={14} /> {nextClass.room}</span>
            <span className="meta-pill"><Icon name="faculty" size={14} /> {nextClass.faculty}</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Grid */}
      <div className="dashboard-grid">
        {/* Left Main Column */}
        <div className="dashboard-main-col">

          {/* 3. ATTENDANCE OVERVIEW */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3 className="section-title">Attendance Overview</h3>
              <Link to="/attendance" className="section-link">View Detailed Breakdown →</Link>
            </div>

            <Card className="overall-attendance-card">
              <div className="overall-gauge-row">
                <div className="gauge-info">
                  <span className="gauge-label">Overall Attendance</span>
                  <div className="gauge-value">{attendance.overallPercentage}%</div>
                  <span className="gauge-status">Status: Satisfactory ({attendance.attendedClasses}/{attendance.totalClasses} Lectures)</span>
                </div>

                <div className="horizontal-gauge-wrap">
                  <Progress
                    value={attendance.overallPercentage}
                    max={100}
                    variant={attendance.overallPercentage >= 80 ? 'primary' : 'warning'}
                    size="lg"
                  />
                </div>
              </div>

              {/* Subject Cards */}
              <div className="subject-cards-grid">
                {attendance.subjects.map((sub) => (
                  <div key={sub.id} className="subject-mini-card">
                    <div className="subject-top">
                      <span className="sub-code">{sub.code}</span>
                      <span className="sub-perc">{sub.percentage}%</span>
                    </div>
                    <h4 className="sub-name">{sub.name}</h4>
                    <p className="sub-classes">{sub.present}/{sub.total} Classes</p>
                    <Progress value={sub.percentage} max={100} variant={sub.percentage >= 80 ? 'primary' : 'warning'} size="sm" />
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 4. TODAY CLASS TIMELINE */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3 className="section-title">TODAY SCHEDULE</h3>
            </div>

            <Card>
              <CardContent className="today-timeline-list">
                {todayTimeline.map((item) => (
                  <div key={item.id} className={`timeline-row ${item.status === 'up-next' ? 'active-row' : ''}`}>
                    <div className="time-badge">{item.time}</div>
                    <div className="row-content">
                      <h4 className="row-title">{item.subject} ({item.code})</h4>
                      <p className="row-meta">{item.room} • {item.faculty}</p>
                    </div>
                    {item.status === 'up-next' && <Badge variant="primary" size="sm">Up Next</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* 5. NEEDS YOUR ATTENTION */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3 className="section-title">NEEDS YOUR ATTENTION</h3>
            </div>

            <div className="attention-list">
              {attentionItems.map((item) => (
                <Alert
                  key={item.id}
                  variant={item.variant === 'rose' ? 'danger' : item.variant === 'amber' ? 'warning' : 'info'}
                  title={item.title}
                  isDismissible
                >
                  {item.description}
                </Alert>
              ))}
            </div>
          </section>

          {/* 6. UPCOMING EVENTS */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3 className="section-title">UPCOMING EVENTS</h3>
              <Link to="/events" className="section-link">View All Events →</Link>
            </div>

            <div className="events-cards-grid">
              {upcomingEvents.map((ev) => (
                <Card key={ev.id} isHoverable className="event-card">
                  <div className="event-card-header">
                    <Badge variant="secondary" size="sm">{ev.category}</Badge>
                    <span className="event-date">{ev.date}</span>
                  </div>
                  <h4 className="event-title">{ev.title}</h4>
                  <p className="event-meta"><Icon name="campusMap" size={12} /> {ev.location} • {ev.attendees} Attending</p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: UniAI Assistant Card */}
        <div className="dashboard-side-col">
          {/* 7. UNIAI ASSISTANT CARD */}
          <Card className="uniai-large-card">
            <div className="uniai-card-header">
              <div className="uniai-brand-icon">
                <Icon name="uniAi" size={22} />
              </div>
              <div>
                <h3 className="uniai-card-title">UniAI Assistant</h3>
                <p className="uniai-card-sub">Your Intelligent OS Copilot</p>
              </div>
            </div>

            <p className="uniai-card-prompt">
              Ask UniAI anything about your university.
            </p>

            <form onSubmit={handleAiAsk} className="uniai-ask-form">
              <div className="uniai-input-wrap">
                <input
                  type="text"
                  placeholder="What do you want to know?"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="uniai-ask-input"
                />
              </div>
              <Button type="submit" variant="primary" size="md" icon="sparkles" className="uniai-ask-btn">
                Ask UniAI
              </Button>
            </form>

            <div className="uniai-quick-prompts">
              <span className="quick-label">Suggested Queries:</span>
              <button type="button" onClick={() => setAiQuery('What assignments do I have this week?')} className="uniai-prompt-chip">
                "What assignments do I have this week?"
              </button>
              <button type="button" onClick={() => setAiQuery('Will my attendance drop below 80% if I miss next class?')} className="uniai-prompt-chip">
                "Will my attendance drop if I miss next class?"
              </button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
