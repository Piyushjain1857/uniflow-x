import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { APP_CONFIG } from '@uniflow-x/constants';

export function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Non-functional mock auth step for Prompt 02
    if (selectedRole === 'faculty') navigate('/faculty');
    else if (selectedRole === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  const setDemoCredentials = (role) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('alex.vance@university.edu');
      setPassword('••••••••••••');
    } else if (role === 'faculty') {
      setEmail('dr.sarah.jenkins@university.edu');
      setPassword('••••••••••••');
    } else {
      setEmail('admin.ops@university.edu');
      setPassword('••••••••••••');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-brand-logo">
            <Icon name="sparkles" size={24} />
          </div>
          <h2 className="auth-title">Welcome to {APP_CONFIG.APP_NAME}</h2>
          <p className="auth-subtitle">Sign in to your digital campus account</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="auth-role-tabs">
          <button
            type="button"
            className={`auth-role-tab ${selectedRole === 'student' ? 'active' : ''}`}
            onClick={() => setDemoCredentials('student')}
          >
            <Icon name="profile" size={16} />
            <span>Student</span>
          </button>
          <button
            type="button"
            className={`auth-role-tab ${selectedRole === 'faculty' ? 'active' : ''}`}
            onClick={() => setDemoCredentials('faculty')}
          >
            <Icon name="faculty" size={16} />
            <span>Faculty</span>
          </button>
          <button
            type="button"
            className={`auth-role-tab ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => setDemoCredentials('admin')}
          >
            <Icon name="admin" size={16} />
            <span>Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              University Email / Username
            </label>
            <div className="input-wrap">
              <Icon name="profile" size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                required
                className="form-input"
                placeholder="netid@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="password">
                Security Password
              </label>
              <Link to="/forgot-password" className="auth-link-sm">
                Forgot password?
              </Link>
            </div>
            <div className="input-wrap">
              <Icon name="forgotPassword" size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                required
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember session on this browser</span>
            </label>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            <span>Sign In to {selectedRole.toUpperCase()} Portal</span>
            <Icon name="arrowRight" size={18} />
          </button>
        </form>

        {/* Quick Demo Pre-fill Pill */}
        <div className="auth-demo-helper">
          <span>Demo Account: </span>
          <button onClick={() => setDemoCredentials('student')} className="demo-chip">
            Student
          </button>
          <button onClick={() => setDemoCredentials('faculty')} className="demo-chip">
            Faculty
          </button>
          <button onClick={() => setDemoCredentials('admin')} className="demo-chip">
            Admin
          </button>
        </div>

        <div className="auth-footer-link">
          <span>Don't have an active account? </span>
          <Link to="/register" className="auth-link-highlight">
            Register new profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
