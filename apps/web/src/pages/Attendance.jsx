import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent, Badge, Progress, Alert } from '../components/ui';
import { mockData } from '../data/mockData';

export function Attendance() {
  const { attendance } = mockData;
  const [extraClasses, setExtraClasses] = useState(3);

  const predictedPercentage = Math.min(
    100,
    Math.round(((attendance.attendedClasses + extraClasses) / (attendance.totalClasses + extraClasses)) * 100)
  );

  return (
    <PageContainer className="attendance-page">
      <div className="page-header-block">
        <h1 className="page-title">Attendance Analytics</h1>
        <p className="page-subtitle">Track lecture presence, subject thresholds, and future attendance predictions</p>
      </div>

      {/* Top 82% Overall Gauge */}
      <Card className="overall-attendance-banner">
        <div className="banner-left">
          <span className="banner-label">Overall Semester Attendance</span>
          <div className="banner-value">{attendance.overallPercentage}%</div>
          <p className="banner-desc">
            You have attended <strong>{attendance.attendedClasses}</strong> out of <strong>{attendance.totalClasses}</strong> total scheduled lectures.
          </p>
        </div>

        <div className="banner-right">
          <div className="gauge-circle-wrap">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset={314 - (314 * attendance.overallPercentage) / 100}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <span className="circle-text">{attendance.overallPercentage}%</span>
          </div>
        </div>
      </Card>

      {/* Subject Attendance Cards (Present, Absent, Total) */}
      <div className="attendance-subjects-grid">
        {attendance.subjects.map((sub) => (
          <Card key={sub.id} className="attendance-subject-card">
            <div className="card-header-line">
              <span className="code-pill">{sub.code}</span>
              <Badge variant={sub.percentage >= 80 ? 'primary' : 'warning'} size="sm">
                {sub.percentage}%
              </Badge>
            </div>

            <h3 className="subject-title">{sub.name}</h3>
            <p className="faculty-name">{sub.faculty}</p>

            <div className="attendance-breakdown-row">
              <div className="count-stat">
                <span className="count-num" style={{ color: 'var(--color-success)' }}>{sub.present}</span>
                <span className="count-lbl">Present</span>
              </div>
              <div className="count-stat">
                <span className="count-num" style={{ color: 'var(--color-danger)' }}>{sub.absent}</span>
                <span className="count-lbl">Absent</span>
              </div>
              <div className="count-stat">
                <span className="count-num">{sub.total}</span>
                <span className="count-lbl">Total</span>
              </div>
            </div>

            <Progress
              value={sub.percentage}
              max={100}
              variant={sub.percentage >= 80 ? 'primary' : 'warning'}
              size="md"
            />
          </Card>
        ))}
      </div>

      {/* Visual Weekly Trend Chart */}
      <div className="attendance-lower-grid">
        <Card className="trend-chart-card">
          <CardHeader>
            <CardTitle>5-Day Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="trend-svg-container">
              <svg width="100%" height="160" viewBox="0 0 400 160">
                <path
                  d="M 20,120 Q 100,110 180,110 T 340,100 L 380,95"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                />
                {attendance.weeklyTrend.map((t, idx) => {
                  const x = 30 + idx * 80;
                  const y = 140 - (t.percentage - 70) * 5;
                  return (
                    <g key={t.day}>
                      <circle cx={x} cy={y} r="5" fill="var(--color-primary)" />
                      <text x={x} y="155" fill="var(--text-dim)" fontSize="11" textAnchor="middle">{t.day}</text>
                      <text x={x} y={y - 12} fill="var(--text-main)" fontSize="11" fontWeight="bold" textAnchor="middle">{t.percentage}%</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Prediction Simulator (UI Preview Only) */}
        <Card className="prediction-simulator-card">
          <CardHeader>
            <div className="prediction-header-line">
              <CardTitle>Attendance Simulator</CardTitle>
              <Badge variant="info" size="sm">UI Preview</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="info" title="Prediction Rule">
              {attendance.prediction.message}
            </Alert>

            <div className="simulator-controls">
              <label className="ui-label">Simulate Attending Next Classes:</label>
              <div className="simulator-btn-row">
                {[1, 2, 3, 5, 8].map((num) => (
                  <button
                    key={num}
                    className={`sim-num-btn ${extraClasses === num ? 'active' : ''}`}
                    onClick={() => setExtraClasses(num)}
                  >
                    +{num} Class{num > 1 ? 'es' : ''}
                  </button>
                ))}
              </div>

              <div className="sim-result-box">
                <span>Predicted Overall Attendance:</span>
                <strong className="sim-result-val">{predictedPercentage}%</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Attendance;
