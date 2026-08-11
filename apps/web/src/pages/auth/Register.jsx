import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '@uniflow-x/constants';

export function Register() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('1');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  
  const { register, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await register({ fullName, email, studentId, department, semester, password, confirmPassword });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel wide">
        <div className="auth-header">
          <div className="auth-brand-logo">
            <Icon name="register" size={24} />
          </div>
          <h2 className="auth-title">Create UniFlow X Identity</h2>
          <p className="auth-subtitle">Register your university credentials for instant portal access</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form grid-2-form">
          {error && <div className="form-error full-width">{error}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <div className="input-wrap">
              <Icon name="profile" size={18} className="input-icon" />
              <input
                id="fullName"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Alex Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="studentId">
              University Roll / ID Number
            </label>
            <div className="input-wrap">
              <Icon name="digitalId" size={18} className="input-icon" />
              <input
                id="studentId"
                type="text"
                required
                className="form-input"
                placeholder="e.g. CS2026-08492"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              University Email Address
            </label>
            <div className="input-wrap">
              <Icon name="profile" size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                required
                className="form-input"
                placeholder="alex.vance@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="department">
              Academic Department
            </label>
            <div className="input-wrap">
              <Icon name="academics" size={18} className="input-icon" />
              <select
                id="department"
                className="form-input form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="School of Law">School of Law</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="semester">
              Current Semester
            </label>
            <div className="input-wrap">
              <Icon name="academics" size={18} className="input-icon" />
              <select
                id="semester"
                className="form-input form-select"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password Security Key
            </label>
            <div className="input-wrap">
              <Icon name="forgotPassword" size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                required
                className="form-input"
                placeholder="Minimum 8 characters with numbers & symbols"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="input-wrap">
              <Icon name="forgotPassword" size={18} className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                required
                className="form-input"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options full-width">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span>I agree to the University Computing Terms & Academic Integrity Charter</span>
            </label>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn full-width" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Registering...' : 'Complete Registration & Open Dashboard'}</span>
            <Icon name="arrowRight" size={18} />
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Already registered your account? </span>
          <Link to="/login" className="auth-link-highlight">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
