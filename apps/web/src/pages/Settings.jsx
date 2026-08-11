import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: 'profile' },
  { id: 'account', label: 'Account', icon: 'settings' },
  { id: 'appearance', label: 'Appearance', icon: 'dashboard' },
  { id: 'privacy', label: 'Privacy & Security', icon: 'attendance' },
];

export function Settings() {
  const { student } = mockData;
  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState(student.fullName);
  const [email, setEmail] = useState(student.email);
  const [program, setProgram] = useState(student.program);
  const [semester, setSemester] = useState(student.semester);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);

  return (
    <PageContainer className="v8-settings-page">
      {/* Header */}
      <div className="v8-page-header">
        <div>
          <h1 className="v8-page-title">Settings</h1>
          <p className="v8-page-sub">Manage your account and preferences.</p>
        </div>
      </div>

      {/* Settings Layout: Sidebar + Content */}
      <div className="v8-settings-layout">
        {/* Left Sidebar Tabs */}
        <div className="v8-settings-sidebar">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              className={`v8-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon} size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="v8-settings-content">
          {activeTab === 'profile' && (
            <div className="v8-panel">
              <div className="v8-panel-header">
                <h3 className="v8-panel-title">Profile Information</h3>
              </div>
              <div className="v8-settings-form">
                <div className="v8-form-group">
                  <label className="v8-form-label">Full Name</label>
                  <input type="text" className="v8-form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="v8-form-group">
                  <label className="v8-form-label">Email</label>
                  <input type="email" className="v8-form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="v8-form-group">
                  <label className="v8-form-label">Program</label>
                  <input type="text" className="v8-form-input" value={program} onChange={(e) => setProgram(e.target.value)} />
                </div>
                <div className="v8-form-row">
                  <div className="v8-form-group">
                    <label className="v8-form-label">Semester</label>
                    <select className="v8-form-input" value={semester} onChange={(e) => setSemester(e.target.value)}>
                      <option>Semester 1</option>
                      <option>Semester 2</option>
                      <option>Semester 3</option>
                      <option>Semester 4</option>
                      <option>Semester 5</option>
                      <option>Semester 6</option>
                      <option>Semester 7</option>
                      <option>Semester 8</option>
                    </select>
                  </div>
                  <div className="v8-form-group">
                    <label className="v8-form-label">Roll Number</label>
                    <input type="text" className="v8-form-input" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
                  </div>
                </div>
                <div className="v8-form-actions">
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="v8-panel">
              <div className="v8-panel-header">
                <h3 className="v8-panel-title">Account Settings</h3>
              </div>
              <div className="v8-settings-form">
                <div className="v8-form-group">
                  <label className="v8-form-label">Change Password</label>
                  <input type="password" className="v8-form-input" placeholder="Current password" />
                </div>
                <div className="v8-form-group">
                  <label className="v8-form-label">New Password</label>
                  <input type="password" className="v8-form-input" placeholder="New password" />
                </div>
                <div className="v8-form-actions">
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="v8-panel">
              <div className="v8-panel-header">
                <h3 className="v8-panel-title">Appearance</h3>
              </div>
              <div className="v8-settings-form">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Theme preferences are managed from the topbar toggle. Use the sun/moon icon in the header to switch between light and dark modes.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="v8-panel">
              <div className="v8-panel-header">
                <h3 className="v8-panel-title">Privacy & Security</h3>
              </div>
              <div className="v8-settings-form">
                <div className="v8-form-group">
                  <label className="v8-form-label">Two-Factor Authentication</label>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
                    Secure your account with 2FA. This adds an extra layer of protection.
                  </p>
                  <button className="btn btn-outline" style={{ marginTop: '12px' }}>Enable 2FA</button>
                </div>
                <div className="v8-form-group" style={{ marginTop: '24px' }}>
                  <label className="v8-form-label">Active Sessions</label>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
                    1 active session on this device.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Settings;
