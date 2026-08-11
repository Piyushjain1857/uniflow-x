import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { getWeeklyTimetable } from '@uniflow-x/utils/timetable';

export function Timetable() {
  const navigate = useNavigate();
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const displayTimes = ['09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00'];
  
  const [activeDay, setActiveDay] = useState('Monday');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getWeeklyTimetable();
        setWeeklyData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !weeklyData) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Timetable...</div>
      </PageContainer>
    );
  }

  // Mobile navigation handlers
  const handlePrevDay = () => {
    const idx = days.indexOf(activeDay);
    if (idx > 0) setActiveDay(days[idx - 1]);
  };
  const handleNextDay = () => {
    const idx = days.indexOf(activeDay);
    if (idx < days.length - 1) setActiveDay(days[idx + 1]);
  };
  const handleToday = () => setActiveDay('Monday'); // Mock today

  return (
    <PageContainer className="v8-timetable-page">
      {/* Header */}
      <div className="v2-page-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="v2-title">Timetable</h1>
          <p className="v2-subtitle">{activeDay} — 10 August</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-1)', borderRadius: 8, padding: 4, border: '1px solid var(--border)' }}>
            <Button variant="ghost" icon="chevronLeft" style={{ padding: '6px 8px' }} />
            <span style={{ fontSize: 13, fontWeight: 700, padding: '0 12px' }}>Aug 10–16</span>
            <Button variant="ghost" icon="chevronRight" style={{ padding: '6px 8px' }} />
          </div>
          <div style={{ display: 'flex', backgroundColor: 'var(--surface-2)', borderRadius: 8, padding: 4 }}>
            <Button variant="ghost" style={{ padding: '6px 12px', fontSize: 13, backgroundColor: 'var(--surface-3)' }}>Day</Button>
            <Button variant="ghost" style={{ padding: '6px 12px', fontSize: 13, color: 'var(--text-muted)' }}>Week</Button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="tt-desktop-view">
        <div className="tt-grid-container">
          {/* Top Left Corner */}
          <div className="tt-grid-header" style={{ borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>Time</div>
          {/* Day Headers */}
          {days.map(day => (
            <div key={day} className="tt-grid-header" style={{ borderBottom: '1px solid var(--border)' }}>{day}</div>
          ))}

          {/* Time Rows */}
          {times.map((timeStr, rIdx) => (
            <React.Fragment key={timeStr}>
              <div className="tt-time-label" style={{ gridRow: rIdx + 2, gridColumn: 1 }}>{displayTimes[rIdx]}</div>
              {days.map((day, cIdx) => (
                <div key={`${day}-${timeStr}`} className="tt-grid-cell" style={{ gridRow: rIdx + 2, gridColumn: cIdx + 2 }}>
                  {/* Find classes that start in this hour block */}
                  {weeklyData[day] && weeklyData[day].filter(c => c.startTime === timeStr).map((cls) => {
                    const durationHours = parseInt(cls.endTime.split(':')[0]) - parseInt(cls.startTime.split(':')[0]);
                    return (
                      <div 
                        key={cls.id} 
                        className={`tt-class-card ${cls.startTime === '11:00' && day === 'Monday' ? 'tt-active-class' : ''}`}
                        style={{ height: `calc(${durationHours * 100}% - 8px)`, borderLeftColor: cls.color, zIndex: 10 }}
                        onClick={() => navigate(`/academics/${cls.id}`)}
                      >
                        <div className="tt-class-title">{cls.subject}</div>
                        <div className="tt-class-meta" style={{ marginBottom: 4 }}>{cls.code}</div>
                        <div className="tt-class-meta">{cls.faculty}</div>
                        <div className="tt-class-meta" style={{ marginTop: 'auto' }}>{cls.room} • {cls.duration}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Timeline View */}
      <div className="tt-mobile-view">
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }}>
          <Button variant="ghost" onClick={handlePrevDay} disabled={activeDay === days[0]} style={{ padding: '8px 16px', backgroundColor: 'var(--surface-1)' }}>Prev Day</Button>
          <Button variant="primary" onClick={handleToday} style={{ padding: '8px 16px' }}>Today</Button>
          <Button variant="ghost" onClick={handleNextDay} disabled={activeDay === days[days.length - 1]} style={{ padding: '8px 16px', backgroundColor: 'var(--surface-1)' }}>Next Day</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {weeklyData[activeDay]?.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>No classes scheduled for {activeDay}.</div>
          ) : (
            weeklyData[activeDay]?.map((cls, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 60, flexShrink: 0, textAlign: 'right', paddingTop: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{cls.duration.split('–')[0]}</div>
                </div>
                <div 
                  className="v2-surface-box" 
                  style={{ flex: 1, padding: 16, borderLeft: `4px solid ${cls.color}`, cursor: 'pointer' }}
                  onClick={() => navigate(`/academics/${cls.id}`)}
                >
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{cls.subject}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>{cls.room} • {cls.faculty}</div>
                  <div style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: 'var(--surface-2)', borderRadius: 4, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    {cls.duration}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </PageContainer>
  );
}

export default Timetable;
