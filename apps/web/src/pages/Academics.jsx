import React from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Academics() {
  const { student, academicsRoster } = mockData;

  return (
    <PageContainer className="v2-academics-page">
      <div className="v2-page-header">
        <h1 className="v2-title">Academics</h1>
        <p className="v2-subtitle">Your academic overview.</p>
      </div>

      {/* CURRENT SEMESTER SECTION */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">CURRENT SEMESTER</h3>
        </div>
        <div className="v2-surface-box semester-info-box">
          <div>
            <h2 className="sem-program">{student.program}</h2>
            <p className="sem-number">{student.semester} · Spring 2026</p>
          </div>
          <div className="sem-gpa-stat">
            <span className="gpa-lbl">Cumulative GPA</span>
            <span className="gpa-val">{student.overallGpa} / 4.0</span>
          </div>
        </div>
      </section>

      {/* SUBJECTS REFINED LIST TABLE */}
      <section className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">SUBJECT ROSTER</h3>
        </div>

        <div className="desktop-only">
          <div className="v2-table-wrapper">
            <table className="v2-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Faculty</th>
                  <th>Attendance</th>
                  <th>Next Class</th>
                  <th>Assignments</th>
                </tr>
              </thead>
              <tbody>
                {academicsRoster.map((sub, idx) => (
                  <tr key={idx}>
                    <td className="font-bold">{sub.subject}</td>
                    <td>{sub.faculty}</td>
                    <td><span className="v2-badge-indigo">{sub.attendance}</span></td>
                    <td>{sub.nextClass}</td>
                    <td>{sub.assignments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Clean List Items */}
        <div className="mobile-only v2-divider-list">
          {academicsRoster.map((sub, idx) => (
            <div key={idx} className="v2-divider-row flex-col align-start">
              <div className="row-top-line">
                <h4 className="font-bold">{sub.subject}</h4>
                <span className="v2-badge-indigo">{sub.attendance}</span>
              </div>
              <p className="v2-sub-text">{sub.faculty} · Next: {sub.nextClass}</p>
              <p className="v2-sub-text" style={{ marginTop: '2px', color: 'var(--color-primary)' }}>{sub.assignments}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Academics;
