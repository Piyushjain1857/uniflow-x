import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
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
    <PageContainer className="v8-assignments-page">
      {/* Header */}
      <div className="v8-page-header">
        <div>
          <h1 className="v8-page-title">Assignments</h1>
          <p className="v8-page-sub">Coursework tasks and submission deadlines.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="v8-filter-bar">
        <div className="v8-filter-tabs">
          {['Upcoming', 'Submitted', 'Overdue'].map((tab) => (
            <button
              key={tab}
              className={`v8-filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="v8-filter-icon-btn">
          <Icon name="settings" size={14} /> Filter
        </button>
      </div>

      {/* Assignments Table */}
      <div className="v8-panel">
        <div className="v8-table-wrap">
          <table className="v8-mini-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Memo</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asg) => (
                <tr key={asg.id}>
                  <td className="v8-cell-bold">{asg.title}</td>
                  <td>{asg.subject}</td>
                  <td>{asg.dueDate}</td>
                  <td>—</td>
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
        {filteredAssignments.length === 0 && (
          <div className="v8-empty-state">
            <p>No {filter.toLowerCase()} assignments found.</p>
          </div>
        )}
        <div className="v8-table-footer">
          <span className="v8-table-count">Showing {filteredAssignments.length} of {assignmentsList.length} total</span>
        </div>
      </div>
    </PageContainer>
  );
}

export default Assignments;
