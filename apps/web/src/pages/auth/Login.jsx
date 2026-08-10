import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export function Login() {
  const [email, setEmail] = useState('piyush.jain@uniflow.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="v2-login-page">
      {/* LEFT 55% BRANDING PANEL */}
      <div className="login-left-panel desktop-only">
        <div className="left-content">
          <Link to="/" className="v2-brand-link">
            <div className="v2-brand-mark">
              <Icon name="sparkles" size={16} />
            </div>
            <div className="v2-brand-text">
              <span className="brand-uniflow">UNIFLOW</span>
              <span className="brand-x">X</span>
            </div>
          </Link>

          <h1 className="left-headline">
            Your university. <br />
            Finally, <br />
            <span className="text-primary">in one place.</span>
          </h1>

          <p className="left-subtext">
            A calm, intelligent platform for academics, campus life, schedules, services, and AI assistance.
          </p>

          <div className="abstract-shape-container">
            <div className="shape-circle-gradient" />
            <div className="shape-ring-lines" />
          </div>
        </div>
      </div>

      {/* RIGHT 45% FORM PANEL */}
      <div className="login-right-panel">
        <div className="v2-form-surface">
          <div className="mobile-only v2-brand-link" style={{ marginBottom: '24px' }}>
            <div className="v2-brand-mark">
              <Icon name="sparkles" size={16} />
            </div>
            <div className="v2-brand-text">
              <span className="brand-uniflow">UNIFLOW</span>
              <span className="brand-x">X</span>
            </div>
          </div>

          <h2 className="form-title">Sign in</h2>
          <p className="form-sub">Enter your institutional email to access your workspace</p>

          <form onSubmit={handleLogin} className="v2-login-form">
            <div className="v2-input-group">
              <label className="v2-label">Institutional Email</label>
              <input
                type="email"
                placeholder="student@uniflow.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="v2-input"
                required
              />
            </div>

            <div className="v2-input-group">
              <div className="label-row">
                <label className="v2-label">Password</label>
                <Link to="/forgot-password" className="v2-forgot-link">Forgot?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="v2-input"
                required
              />
            </div>

            <div className="v2-checkbox-row">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Remember me on this browser</label>
            </div>

            <button type="submit" className="v2-btn-primary full-width" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in to workspace'}
            </button>

            <div className="form-footer">
              <span>Don't have an account? </span>
              <Link to="/register" className="v2-forgot-link">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
