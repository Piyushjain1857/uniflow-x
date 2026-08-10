import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Card, Badge, Tabs, Modal, Button } from '../components/ui';
import { mockData } from '../data/mockData';

export function Assignments() {
  const { assignments } = mockData;
  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = assignments.filter((item) => {
    if (filter === 'upcoming') return item.status === 'Upcoming';
    if (filter === 'submitted') return item.status === 'Submitted';
    if (filter === 'overdue') return item.status === 'Overdue';
    return true;
  });

  return (
    <PageContainer className="assignments-page">
      <div className="page-header-block">
        <h1 className="page-title">Assignments & Submissions</h1>
        <p className="page-subtitle">View active coursework tasks, submission deadlines, and evaluation marks</p>
      </div>

      {/* Filter Tabs */}
      <Tabs
        variant="pill"
        activeTab={filter}
        onChange={setFilter}
        items={[
          { id: 'all', label: 'All Tasks' },
          { id: 'upcoming', label: 'Upcoming', badge: '2' },
          { id: 'submitted', label: 'Submitted', badge: '1' },
          { id: 'overdue', label: 'Overdue', badge: '1' },
        ]}
        style={{ marginBottom: '1.5rem' }}
      />

      {/* Assignments Cards Grid */}
      <div className="assignments-cards-grid">
        {filteredAssignments.map((item) => (
          <Card
            key={item.id}
            isHoverable
            isClickable
            onClick={() => setSelectedAssignment(item)}
            className="assignment-item-card"
          >
            <div className="card-top">
              <span className="code-pill">{item.code} • {item.subject}</span>
              <Badge
                variant={
                  item.status === 'Submitted'
                    ? 'success'
                    : item.status === 'Overdue'
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
              >
                {item.status}
              </Badge>
            </div>

            <h3 className="item-title">{item.title}</h3>
            <p className="item-desc">{item.description}</p>

            <div className="card-bottom">
              <span className="deadline-text">📅 {item.deadline}</span>
              <span className="marks-badge">{item.score || item.marks}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Premium Assignment Detail Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          title={`Assignment Detail — ${selectedAssignment.code}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setSelectedAssignment(null)}>Close</Button>
              {selectedAssignment.status !== 'Submitted' && (
                <Button variant="primary" icon="sparkles" onClick={() => { alert('Submission Portal Sim Triggered!'); setSelectedAssignment(null); }}>
                  Upload Submission PDF
                </Button>
              )}
            </>
          }
        >
          <div className="assignment-detail-modal-body">
            <div className="detail-header-row">
              <Badge variant="primary" size="md">{selectedAssignment.code}</Badge>
              <Badge variant={selectedAssignment.status === 'Submitted' ? 'success' : 'danger'} size="md">
                {selectedAssignment.status}
              </Badge>
            </div>

            <h2 className="detail-title">{selectedAssignment.title}</h2>
            <p className="detail-sub">{selectedAssignment.subject}</p>

            <div className="detail-meta-box">
              <div><strong>Deadline:</strong> {selectedAssignment.deadline}</div>
              <div><strong>Evaluation Marks:</strong> {selectedAssignment.score || selectedAssignment.marks}</div>
            </div>

            <div className="detail-desc-box">
              <h4>Instructions & Prompt:</h4>
              <p>{selectedAssignment.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </PageContainer>
  );
}

export default Assignments;
