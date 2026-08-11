import React, { useState, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { getAssignments, submitAssignment } from '@uniflow-x/utils/assignments';

export function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [comments, setComments] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAssignments = assignments.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  const handleOpenModal = (asg) => {
    setSelectedAssignment(asg);
    setRepoUrl(asg.submissionState?.url || '');
    setComments(asg.submissionState?.comments || '');
    setSubmitSuccess(false);
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setSelectedAssignment(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitAssignment(selectedAssignment.id, { url: repoUrl, comments });
      setSubmitSuccess(true);
      setTimeout(() => {
        handleCloseModal();
        loadData(); // Refresh the list
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (loading && assignments.length === 0) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Assignments...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="v8-assignments-page">
      {/* Header */}
      <div className="v2-page-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="v2-title">Assignments</h1>
          <p className="v2-subtitle">Coursework tasks and submission deadlines.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }}>
        {['All', 'Upcoming', 'Submitted', 'Overdue'].map((tab) => (
          <Button
            key={tab}
            variant={filter === tab ? 'primary' : 'ghost'}
            onClick={() => setFilter(tab)}
            style={{ padding: '8px 16px', backgroundColor: filter === tab ? 'var(--primary)' : 'var(--surface-1)' }}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Assignments Table */}
      <div className="v2-surface-box" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Assignment</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Subject</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Due Date</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Marks</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((asg, idx) => (
              <tr 
                key={asg.id} 
                className="list-row"
                style={{ 
                  borderBottom: idx === filteredAssignments.length - 1 ? 'none' : '1px solid var(--border)', 
                  cursor: 'pointer',
                  borderLeft: asg.status === 'Overdue' ? '4px solid var(--danger)' : '4px solid transparent'
                }}
                onClick={() => handleOpenModal(asg)}
              >
                <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text)' }}>
                  {asg.title}
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{asg.courseCode}</div>
                </td>
                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{asg.subject}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>
                  <span style={{ color: asg.status === 'Overdue' ? 'var(--danger)' : 'var(--text-secondary)' }}>{asg.dueDate}</span>
                </td>
                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>{asg.marks}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span className={`badge ${asg.status === 'Submitted' ? 'badge-success' : asg.status === 'Overdue' ? 'badge-danger' : 'badge-warning'}`}>
                    {asg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAssignments.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No {filter.toLowerCase()} assignments found.</p>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <Modal 
          isOpen={!!selectedAssignment} 
          onClose={handleCloseModal} 
          title="Assignment Details"
        >
          {submitSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon name="check" size={32} color="var(--success)" />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Submission Successful!</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your assignment has been securely uploaded.</p>
            </div>
          ) : (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{selectedAssignment.title}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{selectedAssignment.subject}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>{selectedAssignment.marks} Pts</div>
                    <div style={{ fontSize: 12, color: selectedAssignment.status === 'Overdue' ? 'var(--danger)' : 'var(--text-muted)', marginTop: 4 }}>Due: {selectedAssignment.dueDate}</div>
                  </div>
                </div>

                <div className="v2-surface-box" style={{ backgroundColor: 'var(--surface-1)', marginBottom: 24, padding: 16 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Description</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>{selectedAssignment.description}</p>
                  
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Instructions</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{selectedAssignment.instructions}</p>
                </div>
              </div>

              {selectedAssignment.status === 'Submitted' ? (
                <div style={{ padding: 16, backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: 8, border: '1px solid var(--success)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Icon name="check" size={16} color="var(--success)" />
                    <span style={{ fontWeight: 700, color: 'var(--success)' }}>Submitted on {selectedAssignment.submissionState.date}</span>
                  </div>
                  {selectedAssignment.submissionState.url && (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                      <strong>Repository:</strong> <a href={selectedAssignment.submissionState.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>{selectedAssignment.submissionState.url}</a>
                    </div>
                  )}
                  {selectedAssignment.submissionState.comments && (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      <strong>Comments:</strong> {selectedAssignment.submissionState.comments}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="form-group">
                    <label className="v2-label">Repository URL / External Link</label>
                    <input 
                      type="url" 
                      className="v2-input" 
                      placeholder="https://github.com/..." 
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="v2-label">Additional Comments</label>
                    <textarea 
                      className="v2-input" 
                      rows={3} 
                      placeholder="Any notes for the reviewer..."
                      value={comments}
                      onChange={e => setComments(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <Button variant="ghost" type="button" icon="attendance" onClick={() => document.getElementById('file-upload').click()} disabled={isSubmitting}>
                      Attach File
                      <input id="file-upload" type="file" style={{ display: 'none' }} />
                    </Button>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Button variant="ghost" type="button" onClick={handleCloseModal} disabled={isSubmitting}>Cancel</Button>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </Modal>
      )}
    </PageContainer>
  );
}

export default Assignments;
