import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { mockData } from '../data/mockData';

export function Assignments() {
  const { assignmentsList } = mockData;
  const [filter, setFilter] = useState('Upcoming');

  const filteredAssignments = assignmentsList.filter((item) => {
    if (filter === 'Upcoming') return item.status === 'Upcoming';
    if (filter === 'Submitted') return item.status === 'Submitted';
    if (filter === 'Overdue') return item.status === 'Overdue';
    return true;
  });

  return (
    <PageContainer className="v2-assignments-page">
      <div className="v2-page-header">
        <h1 className="v2-title">Assignments</h1>
        <p className="v2-subtitle">Coursework tasks and submission deadlines.</p>
      </div>

      {/* Filter Tabs */}
      <div className="v2-filter-tabs">
        {['Upcoming', 'Submitted', 'Overdue'].map((tab) => (
          <button
            key={tab}
            className={`v2-tab-btn ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dividers List */}
      <section className="v2-section">
        <div className="v2-divider-list">
          {filteredAssignments.map((asg) => (
            <div key={asg.id} className="v2-divider-row assignment-row">
              <div className="asg-info-col">
                <span className="v2-subject-tag">{asg.subject}</span>
                <h3 className="v2-asg-title">{asg.title}</h3>
                <span className="v2-asg-date">{asg.dueDate}</span>
              </div>

              <div className="asg-right-col">
                <span className="v2-marks-pill">{asg.marks}</span>
                <span className={`v2-status-tag status-${asg.status.toLowerCase()}`}>
                  {asg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Assignments;
