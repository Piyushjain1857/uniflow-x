import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-brand-logo">
            <Icon name="forgotPassword" size={24} />
          </div>
          <h2 className="auth-title">Recover Credentials</h2>
          <p className="auth-subtitle">
            Enter your registered university email to receive a password reset token
          </p>
        </div>

        {submitted ? (
          <div className="auth-success-box">
            <div className="success-icon-badge">
              <Icon name="checkCircle" size={32} />
            </div>
            <h3>Reset Email Dispatched!</h3>
            <p>
              We sent password recovery instructions to <strong>{email}</strong>. Check your inbox and follow the secure link.
            </p>
            <div className="auth-actions-stacked">
              <button onClick={() => setSubmitted(false)} className="btn-secondary full-width">
                Send to a different email
              </button>
              <Link to="/login" className="btn-primary full-width">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Registered University Email
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

            <button type="submit" className="btn-primary auth-submit-btn">
              <span>Send Recovery Code</span>
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

export default ForgotPassword;
