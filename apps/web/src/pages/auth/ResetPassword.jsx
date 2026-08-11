import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useAuth } from '../../context/AuthContext';

export function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const res = await resetPassword(newPassword, confirmPassword);
      setSuccess(res.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-brand-logo">
            <Icon name="forgotPassword" size={24} />
          </div>
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">
            Enter your new secure password below
          </p>
        </div>

        {success ? (
          <div className="auth-success-box">
            <div className="success-icon-badge">
              <Icon name="checkCircle" size={32} />
            </div>
            <h3>Password Reset!</h3>
            <p>{success}</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="form-error">{error}</div>}
            
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">
                New Password
              </label>
              <div className="input-wrap">
                <Icon name="lock" size={18} className="input-icon" />
                <input
                  id="newPassword"
                  type="password"
                  required
                  className="form-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <div className="input-wrap">
                <Icon name="lock" size={18} className="input-icon" />
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="form-input"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Resetting...' : 'Reset Password'}</span>
              <Icon name="arrowRight" size={18} />
            </button>
          </form>
        )}

        <div className="auth-footer-link">
          <span>Remembered your password? </span>
          <Link to="/login" className="auth-link-highlight">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
