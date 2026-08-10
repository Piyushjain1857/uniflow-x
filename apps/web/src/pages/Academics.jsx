import React from 'react';
import PageContainer from '../components/PageContainer';
import { Card, CardHeader, CardTitle, CardContent, Badge, DataTable } from '../components/ui';
import { mockData } from '../data/mockData';

export function Academics() {
  const { student, academicsSubjects } = mockData;

  const columns = [
    { key: 'code', title: 'Code', sortable: true, width: '100px' },
    { key: 'name', title: 'Subject', sortable: true },
    { key: 'faculty', title: 'Faculty Instructor', sortable: true },
    { key: 'credits', title: 'Credits', sortable: true, width: '80px' },
    {
      key: 'attendance',
      title: 'Attendance',
      render: (val) => (
        <Badge variant={parseInt(val) >= 80 ? 'primary' : 'warning'} size="sm">
          {val}
        </Badge>
      ),
    },
    { key: 'nextClass', title: 'Next Scheduled Lecture' },
  ];

  return (
    <PageContainer className="academics-page">
      <div className="page-header-block">
        <h1 className="page-title">Academic Overview</h1>
        <p className="page-subtitle">{student.program} • {student.currentSemester}</p>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="academics-stats-grid">
        <Card className="ac-stat-card">
          <span className="stat-label">Current Semester</span>
          <div className="stat-val">{student.semester}</div>
          <span className="stat-sub">Spring Term 2026</span>
        </Card>

        <Card className="ac-stat-card">
          <span className="stat-label">Completed Credits</span>
          <div className="stat-val">{student.totalCredits} Credits</div>
          <span className="stat-sub">GPA: {student.overallGpa}</span>
        </Card>

        <Card className="ac-stat-card">
          <span className="stat-label">Active Subjects</span>
          <div className="stat-val">4 Subjects</div>
          <span className="stat-sub">2 Labs • 2 Theory</span>
        </Card>

        <Card className="ac-stat-card">
          <span className="stat-label">Overall Attendance</span>
          <div className="stat-val" style={{ color: 'var(--color-primary)' }}>{student.attendance ? '82%' : '82%'}</div>
          <span className="stat-sub">Satisfactory Standing</span>
        </Card>
      </div>

      {/* Subject Roster Table (Desktop) & Cards (Mobile) */}
      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader>
          <CardTitle>Enrolled Subjects & Faculty Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="desktop-only">
            <DataTable columns={columns} data={academicsSubjects} pageSize={10} />
          </div>

          <div className="mobile-only subject-cards-stack">
            {academicsSubjects.map((sub) => (
              <div key={sub.code} className="subject-mobile-card">
                <div className="card-top-row">
                  <Badge variant="primary" size="sm">{sub.code}</Badge>
                  <Badge variant={parseInt(sub.attendance) >= 80 ? 'primary' : 'warning'} size="sm">
                    {sub.attendance}
                  </Badge>
                </div>
                <h3 className="sub-title">{sub.name}</h3>
                <p className="sub-faculty">{sub.faculty} • {sub.credits} Credits</p>
                <p className="sub-next">Next: {sub.nextClass}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default Academics;
