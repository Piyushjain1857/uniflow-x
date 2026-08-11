import React, { useState, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import { getAttendanceSummary, getSubjectsAttendance, getRecentAttendanceRecords } from '@uniflow-x/utils/attendance';

export function Attendance() {
  const [summary, setSummary] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [calcSubjectId, setCalcSubjectId] = useState('');
  const [calcCurrentPresent, setCalcCurrentPresent] = useState(0);
  const [calcCurrentTotal, setCalcCurrentTotal] = useState(0);
  const [calcAddAttended, setCalcAddAttended] = useState(0);
  const [calcAddTotal, setCalcAddTotal] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [sumData, subData, recData] = await Promise.all([
          getAttendanceSummary(),
          getSubjectsAttendance(),
          getRecentAttendanceRecords()
        ]);
        setSummary(sumData);
        setSubjects(subData);
        setRecords(recData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update calculator fields when a subject is selected
  useEffect(() => {
    if (calcSubjectId) {
      const sub = subjects.find(s => s.id === calcSubjectId);
      if (sub) {
        setCalcCurrentPresent(sub.presentClasses);
        setCalcCurrentTotal(sub.totalClasses);
      }
    } else {
      setCalcCurrentPresent(0);
      setCalcCurrentTotal(0);
    }
    setCalcAddAttended(0);
    setCalcAddTotal(0);
  }, [calcSubjectId, subjects]);

  if (loading || !summary) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Attendance...</div>
      </PageContainer>
    );
  }

  // Calculator Logic
  const projPresent = calcCurrentPresent + Number(calcAddAttended);
  const projTotal = calcCurrentTotal + Number(calcAddTotal);
  const projPercent = projTotal > 0 ? (projPresent / projTotal) * 100 : 0;
  const isProjWarning = projPercent < 75;

  return (
    <PageContainer className="v8-attendance-page">
      {/* Header */}
      <div className="v2-page-header" style={{ marginBottom: 32 }}>
        <div>
          <h1 className="v2-title">Attendance</h1>
          <p className="v2-subtitle">Track your class attendance in real time.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Summary Box */}
          <div className="v2-surface-box" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Overall Attendance</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <h3 style={{ fontSize: 40, fontWeight: 900, margin: 0, color: 'var(--primary)' }}>{summary.overallPercentage}%</h3>
                  <span className={`badge ${summary.overallPercentage >= 75 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 14, padding: '4px 10px' }}>
                    Status: {summary.status}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>{summary.present}</div>
                <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700, textTransform: 'uppercase' }}>Present</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>{summary.absent}</div>
                <div style={{ fontSize: 12, color: 'var(--danger)', fontWeight: 700, textTransform: 'uppercase' }}>Absent</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>{summary.late}</div>
                <div style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 700, textTransform: 'uppercase' }}>Late</div>
              </div>
            </div>
          </div>

          {/* Trend Chart (CSS Based) */}
          <div className="v2-surface-box">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Attendance Trend</h3>
            <div style={{ height: 160, display: 'flex', alignItems: 'flex-end', gap: 12, paddingTop: 20 }}>
              {summary.trend.map((point, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{
                      width: '40%',
                      backgroundColor: point.percentage >= 75 ? 'var(--success)' : 'var(--warning)',
                      height: `${point.percentage}%`,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      transition: 'height 0.3s ease'
                    }} />
                    <span style={{ position: 'absolute', top: -20, fontSize: 11, fontWeight: 700 }}>{point.percentage}%</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>{point.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Records */}
          <div className="v2-surface-box" style={{ padding: 0 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Recent Records</h3>
            </div>
            <div className="v2-divider-list">
              {records.map(rec => (
                <div key={rec.id} className="list-row" style={{ padding: '16px 24px' }}>
                  <div style={{ width: 80, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{rec.date}</div>
                  <div style={{ flex: 1, fontWeight: 600 }}>{rec.subject}</div>
                  <span className={`badge ${rec.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Calculator */}
          <div className="v2-surface-box" style={{ borderColor: 'var(--primary)', borderWidth: 1 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: 'var(--primary)' }}>Attendance Calculator</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              
              <div className="form-group">
                <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Select Subject</label>
                <select className="v2-input" value={calcSubjectId} onChange={e => setCalcSubjectId(e.target.value)} style={{ appearance: 'auto' }}>
                  <option value="">Custom Input</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Current Present</label>
                  <input type="number" className="v2-input" value={calcCurrentPresent} onChange={e => setCalcCurrentPresent(Number(e.target.value))} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Total Classes</label>
                  <input type="number" className="v2-input" value={calcCurrentTotal} onChange={e => setCalcCurrentTotal(Number(e.target.value))} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Future Present</label>
                  <input type="number" className="v2-input" value={calcAddAttended} onChange={e => setCalcAddAttended(Number(e.target.value))} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Future Total</label>
                  <input type="number" className="v2-input" value={calcAddTotal} onChange={e => setCalcAddTotal(Number(e.target.value))} />
                </div>
              </div>

              <div style={{ marginTop: 8, padding: 16, backgroundColor: isProjWarning ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', borderRadius: 8, border: `1px solid ${isProjWarning ? 'var(--danger)' : 'var(--success)'}` }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>Projected Attendance</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: isProjWarning ? 'var(--danger)' : 'var(--success)' }}>
                  {projPercent.toFixed(1)}%
                </div>
                {isProjWarning && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--danger)', fontWeight: 600 }}>
                    Warning: Projected attendance drops below 75% threshold!
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="v2-surface-box" style={{ padding: 0 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Subject Breakdown</h3>
            </div>
            <div className="v2-divider-list">
              {subjects.map(sub => (
                <div key={sub.id} className="list-row" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{sub.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                        {sub.presentClasses} / {sub.totalClasses} Classes Attended • {sub.classesRemaining} Remaining
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: 18, color: sub.percentage >= 75 ? 'var(--success)' : 'var(--warning)' }}>{sub.percentage}%</div>
                      <span className={`badge ${sub.percentage >= 75 ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: 4 }}>{sub.status}</span>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'var(--surface-1)', padding: 10, borderRadius: 6, fontSize: 12, color: 'var(--text-secondary)', borderLeft: '3px solid var(--primary)' }}>
                    {sub.prediction}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </PageContainer>
  );
}

export default Attendance;
