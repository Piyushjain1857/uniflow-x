import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Input, Button, Checkbox } from '../../components/ui';

export function Login() {
  const [email, setEmail] = useState('piyush.jain@uniflow.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="login-split-page">
      {/* Left Branding Side (Desktop) */}
      <div className="login-branding-panel">
        <div className="branding-content">
          <Link to="/" className="brand-logo-large">
            <span className="brand-icon-wrap">
              <Icon name="sparkles" size={24} />
            </span>
            <span>UniFlow <span style={{ color: 'var(--color-primary)' }}>X</span></span>
          </Link>

          <h2 className="branding-title">Your University. <br />One Intelligent OS.</h2>
          <p className="branding-subtext">
            A unified digital operating system connecting academics, smart attendance, campus life, services, and AI-assisted governance.
          </p>

          <div className="branding-quote">
            <p>"UniFlow X turned fragmented campus portals into one seamless desktop experience."</p>
            <span>— Piyush Jain, CS Senior</span>
          </div>
        </div>
      </div>

      {/* Right Login Card Side */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Sign In to UniFlow X</h1>
            <p className="login-subtitle">Enter your institutional credentials to access your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <Input
              label="University Email"
              type="email"
              placeholder="netid@uniflow.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon="profile"
              isRequired
            />

            <div className="password-input-wrap">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startIcon="lock"
                isRequired
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'close' : 'sparkles'} size={14} />
              </button>
            </div>

            <div className="login-options-row">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="login-submit-btn"
            >
              Sign In to Portal
            </Button>

            <div className="login-footer">
              <span>Don't have an account? </span>
              <Link to="/register" className="register-link">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
