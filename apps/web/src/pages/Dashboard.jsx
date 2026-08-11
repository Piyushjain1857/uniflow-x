import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';

// Import from packages/utils
import { mockGetProfile } from '@uniflow-x/utils/profile.js';
import { getAcademicsSummary } from '@uniflow-x/utils/academics.js';
import { getAttendanceSummary } from '@uniflow-x/utils/attendance.js';
import { getAssignments } from '@uniflow-x/utils/assignments.js';
import { getDailyTimetable } from '@uniflow-x/utils/timetable.js';
import { getCampusEvents } from '@uniflow-x/utils/campus.js';
import { quickPrompts } from '@uniflow-x/utils/uniai.js';

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    profile: null,
    academics: null,
    attendance: null,
    assignments: [],
    timetable: [],
    events: []
  });
  const [aiQuery, setAiQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [
          profileData,
          academicsData,
          attendanceData,
          assignmentsData,
          timetableData,
          eventsData
        ] = await Promise.all([
          mockGetProfile('12345'), // Hardcoded Alex Vance for now
          getAcademicsSummary(),
          getAttendanceSummary(),
          getAssignments(),
          getDailyTimetable('Monday'), // Simulating Monday
          getCampusEvents()
        ]);

        setData({
          profile: profileData,
          academics: academicsData,
          attendance: attendanceData,
          assignments: assignmentsData,
          timetable: timetableData,
          events: eventsData
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <PageContainer className="v8-dashboard-page">
        <div style={{ padding: '40px', color: 'var(--text-muted)' }}>Loading Dashboard...</div>
      </PageContainer>
    );
  }

  const { profile, academics, attendance, assignments, timetable, events } = data;

  const pendingTasksCount = assignments.filter(a => a.status === 'Upcoming').length;
  const upcomingAssignments = assignments.filter(a => a.status === 'Upcoming').slice(0, 3);
  
  // Find next class from timetable
  // In a real app we'd compare with current time. We'll pick the first class of the day.
  const nextClass = timetable.length > 0 ? timetable[0] : null;
  const recentActivities = academics.recentActivity || [];

  return (
    <PageContainer className="v8-dashboard-page">
      {/* 1. Header */}
      <section className="v8-greeting" style={{ marginBottom: '32px' }}>
        <h1 className="v8-greeting-title">
          Good morning, <span className="greeting-name">{profile.fullName.split(' ')[0]} 👋</span>
        </h1>
        <p className="v8-greeting-sub">Monday · 10 August</p>
        <p className="v8-greeting-sub" style={{ marginTop: '8px', fontWeight: 600, color: 'var(--text)' }}>Here's what matters today.</p>
      </section>

      {/* 2. SUMMARY */}
      <section className="v8-stat-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="v8-stat-card v8-stat-primary" onClick={() => navigate('/academics')} style={{ cursor: 'pointer' }}>
          <div className="v8-stat-icon-wrap"><Icon name="academics" size={18} /></div>
          <div className="v8-stat-info">
            <span className="v8-stat-value">{academics.gpa.current} / {academics.gpa.max}</span>
            <span className="v8-stat-label">GPA</span>
          </div>
        </div>
        <div className="v8-stat-card v8-stat-emerald" onClick={() => navigate('/attendance')} style={{ cursor: 'pointer' }}>
          <div className="v8-stat-icon-wrap"><Icon name="attendance" size={18} /></div>
          <div className="v8-stat-info">
            <span className="v8-stat-value">{attendance.overallPercentage}%</span>
            <span className="v8-stat-label">Attendance</span>
          </div>
        </div>
        <div className="v8-stat-card v8-stat-amber" onClick={() => navigate('/assignments')} style={{ cursor: 'pointer' }}>
          <div className="v8-stat-icon-wrap"><Icon name="assignments" size={18} /></div>
          <div className="v8-stat-info">
            <span className="v8-stat-value">{pendingTasksCount}</span>
            <span className="v8-stat-label">Pending Tasks</span>
          </div>
        </div>
        <div className="v8-stat-card v8-stat-purple" onClick={() => navigate('/academics')} style={{ cursor: 'pointer' }}>
          <div className="v8-stat-icon-wrap"><Icon name="courses" size={18} /></div>
          <div className="v8-stat-info">
            <span className="v8-stat-value">{academics.credits.earned} / {academics.credits.total}</span>
            <span className="v8-stat-label">Credits</span>
          </div>
        </div>
      </section>

      {/* Main Grid for layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* NEXT CLASS */}
          {nextClass && (
            <div className="v8-panel" style={{ background: 'var(--surface-hover)', borderColor: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }}></div>
              <div className="v8-panel-header">
                <h3 className="v8-panel-title">NEXT CLASS</h3>
                <span className="v8-status-badge v8-status-upcoming" style={{ background: 'var(--accent)', color: '#fff' }}>Starts in 24 minutes</span>
              </div>
              <div style={{ padding: '0 20px 20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{nextClass.subject}</h2>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>{nextClass.code}</p>
                
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="clock" size={16} color="var(--text-muted)" /> {nextClass.startTime}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="location" size={16} color="var(--text-muted)" /> {nextClass.room}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="profile" size={16} color="var(--text-muted)" /> {nextClass.faculty}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TODAY'S SCHEDULE */}
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">TODAY'S SCHEDULE</h3>
              <Link to="/timetable" className="v8-panel-link">View Timetable</Link>
            </div>
            <div className="v8-schedule-list">
              {timetable.map((item) => (
                <div key={item.id} className="v8-schedule-item" style={{ borderLeftColor: item.color }} onClick={() => navigate('/timetable')} >
                  <div className="v8-schedule-time">{item.startTime}</div>
                  <div className="v8-schedule-info">
                    <span className="v8-schedule-subject">{item.subject}</span>
                    <span className="v8-schedule-meta">{item.room} · {item.faculty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* UPCOMING ASSIGNMENTS */}
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">UPCOMING ASSIGNMENTS</h3>
              <Link to="/assignments" className="v8-panel-link">View All</Link>
            </div>
            <div className="v8-schedule-list" style={{ padding: '0 20px 20px' }}>
              {upcomingAssignments.map(asg => (
                <div key={asg.id} style={{ padding: '16px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => navigate('/assignments')}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{asg.title}</h4>
                  <p style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600 }}>Due {asg.dueDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="v8-panel" style={{ cursor: 'pointer' }} onClick={() => navigate('/attendance')}>
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">ATTENDANCE</h3>
            </div>
            <div style={{ padding: '0 20px 20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--success)' }}>{attendance.overallPercentage}%</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                "You can miss 2 more classes before reaching 75%."
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* UPCOMING ON CAMPUS */}
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">UPCOMING ON CAMPUS</h3>
              <Link to="/campus" className="v8-panel-link">Campus Hub</Link>
            </div>
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.slice(0, 3).map(evt => (
                <div key={evt.id} style={{ display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/campus')}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Icon name="events" size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{evt.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{evt.date} · {evt.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">RECENT ACTIVITY</h3>
            </div>
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivities.map(act => (
                <div key={act.id} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                    <Icon name={act.icon} size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{act.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UNIAI */}
          <div className="v8-panel v8-ai-preview-panel">
            <div className="v8-panel-header">
              <div className="v8-ai-header-left">
                <div className="v8-ai-avatar">
                  <Icon name="sparkles" size={16} />
                </div>
                <div>
                  <h3 className="v8-panel-title">Ask UniAI</h3>
                </div>
              </div>
            </div>

            <div className="v8-ai-prompt-chips">
              {quickPrompts.slice(0, 3).map((prompt, idx) => (
                <button key={idx} className="v8-prompt-chip" onClick={() => navigate('/uniai', { state: { query: prompt } })}>
                  {prompt}
                </button>
              ))}
            </div>

            <form className="v8-ai-input-row" onSubmit={(e) => { e.preventDefault(); if(aiQuery.trim()) { navigate('/uniai', { state: { query: aiQuery } }); } }}>
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

        </div>

      </div>
    </PageContainer>
  );
}

export default Dashboard;

