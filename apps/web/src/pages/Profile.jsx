import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockGetProfile, mockUpdateProfile, mockChangePassword } from '@uniflow-x/utils/profile';
import Icon from '../components/Icon';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import PageContainer from '../components/PageContainer';
import Button from '../components/ui/Button';

export function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    semester: '',
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const data = await mockGetProfile(user.id);
      setProfile(data);
      setEditForm({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        department: data.department || '',
        semester: data.semester || '',
      });
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    setEditSuccess(false);
    try {
      const updated = await mockUpdateProfile(user.id, editForm);
      setProfile(updated);
      setEditSuccess(true);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setEditSuccess(false);
      }, 1500);
    } catch (err) {
      setEditError(err.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);
    try {
      const res = await mockChangePassword(
        user.id,
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      );
      setPasswordSuccess(true);
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordSuccess(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 1500);
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Profile...</div>
      </PageContainer>
    );
  }

  if (!profile) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Failed to load profile.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="v2-page-header">
        <div>
          <h1 className="v2-title">Student Profile</h1>
          <p className="v2-subtitle">Manage your identity and preferences</p>
        </div>
        <div className="page-header-actions">
          <Button variant="secondary" onClick={() => setIsPasswordModalOpen(true)}>
            <Icon name="lock" size={16} />
            <span>Change Password</span>
          </Button>
          <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>
            <Icon name="edit" size={16} />
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>

      <div className="v2-surface-box" style={{ marginBottom: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 32, fontWeight: 900
        }}>
          {profile.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: 'var(--text)' }}>{profile.fullName}</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: 15 }}>
            {profile.department} • Semester {profile.semester}
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <span className="badge badge-secondary">ID: {profile.studentId}</span>
            <span className="badge badge-secondary">{profile.email}</span>
            <span className="badge badge-success">{profile.enrollmentStatus}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 44 }}>
        <StatCard
          title="Current GPA"
          value={profile.stats.gpa}
          icon="academics"
          trend="+0.1"
          trendLabel="vs last sem"
          trendUp={true}
        />
        <StatCard
          title="Attendance"
          value={profile.stats.attendance}
          icon="attendance"
        />
        <StatCard
          title="Credits Earned"
          value={profile.stats.credits}
          icon="digitalId"
        />
        <StatCard
          title="Pending Assignments"
          value={profile.stats.pendingAssignments}
          icon="assignments"
        />
      </div>

      <div className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">Personal Information</h3>
        </div>
        <div className="v2-surface-box" style={{ padding: 0 }}>
          <div className="v2-divider-list">
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Full Name</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.fullName}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Gender</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.gender || 'Not specified'}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Date of Birth</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.dateOfBirth || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">Academic Information</h3>
        </div>
        <div className="v2-surface-box" style={{ padding: 0 }}>
          <div className="v2-divider-list">
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Student ID</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.studentId}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Department</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.department}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Semester</span>
              <span style={{ flex: 1, fontWeight: 500 }}>Semester {profile.semester}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="v2-section">
        <div className="v2-section-header">
          <h3 className="v2-section-title">Contact Information</h3>
        </div>
        <div className="v2-surface-box" style={{ padding: 0 }}>
          <div className="v2-divider-list">
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Email Address</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.email}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Phone Number</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.phone || 'Not specified'}</span>
            </div>
            <div className="list-row" style={{ padding: '20px 32px' }}>
              <span style={{ color: 'var(--text-muted)', width: 200, fontWeight: 600 }}>Term Address</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{profile.address || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <Button variant="outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={logout}>
          <Icon name="logout" size={16} />
          <span>Sign Out of Session</span>
        </Button>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => !editLoading && setIsEditModalOpen(false)}
        title="Edit Profile"
      >
        {editSuccess ? (
          <div className="auth-success-box">
            <div className="success-icon-badge">
              <Icon name="checkCircle" size={48} />
            </div>
            <h3 style={{ margin: 0 }}>Profile Updated</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Your profile changes have been saved.</p>
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
            {editError && <div className="form-error">{editError}</div>}
            
            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                className="v2-input"
                value={editForm.fullName}
                onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
                required
                disabled={editLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                className="v2-input"
                value={editForm.email}
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                required
                disabled={editLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Phone Number</label>
              <input
                type="text"
                className="v2-input"
                value={editForm.phone}
                onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                disabled={editLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Department</label>
              <input
                type="text"
                className="v2-input"
                value={editForm.department}
                onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                disabled={editLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Semester</label>
              <select
                className="v2-input"
                value={editForm.semester}
                onChange={e => setEditForm({ ...editForm, semester: e.target.value })}
                disabled={editLoading}
                style={{ appearance: 'auto' }}
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
              <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)} disabled={editLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={editLoading}>
                {editLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => !passwordLoading && setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        {passwordSuccess ? (
          <div className="auth-success-box">
            <div className="success-icon-badge">
              <Icon name="checkCircle" size={48} />
            </div>
            <h3 style={{ margin: 0 }}>Password Changed</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Your password has been successfully updated.</p>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
            {passwordError && <div className="form-error">{passwordError}</div>}
            
            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Current Password</label>
              <input
                type="password"
                className="v2-input"
                value={passwordForm.currentPassword}
                onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                disabled={passwordLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>New Password</label>
              <input
                type="password"
                className="v2-input"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                disabled={passwordLoading}
              />
            </div>

            <div className="form-group">
              <label className="v2-label" style={{ marginBottom: 6, display: 'block', fontSize: 13, fontWeight: 600 }}>Confirm New Password</label>
              <input
                type="password"
                className="v2-input"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
                disabled={passwordLoading}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
              <Button type="button" variant="ghost" onClick={() => setIsPasswordModalOpen(false)} disabled={passwordLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={passwordLoading}>
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

    </PageContainer>
  );
}

export default Profile;
