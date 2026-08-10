import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { APP_CONFIG } from '@uniflow-x/constants';

function PublicLayout() {
  return (
    <div className="public-layout">
      <Header />
      
      <main className="public-content">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="footer-brand">
                <Icon name="sparkles" size={20} />
                <span>{APP_CONFIG.APP_NAME}</span>
              </div>
              <p className="footer-desc">
                {APP_CONFIG.DESCRIPTION}. The single digital operating system for higher education.
              </p>
            </div>

            <div className="footer-links-col">
              <h4>Quick Navigation</h4>
              <ul>
                <li><Link to="/">Landing Home</Link></li>
                <li><Link to="/login">Student Sign In</Link></li>
                <li><Link to="/register">Register Account</Link></li>
                <li><Link to="/forgot-password">Reset Credentials</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>App Shell Preview</h4>
              <ul>
                <li><Link to="/dashboard">Student Dashboard</Link></li>
                <li><Link to="/academics">Academics & Credits</Link></li>
                <li><Link to="/faculty">Faculty Portal</Link></li>
                <li><Link to="/admin">Admin Console</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>System Info</h4>
              <div className="system-status-pill">
                <span className="status-dot green" />
                <span>All Systems Operational</span>
              </div>
              <p className="system-version">UniFlow OS Kernel v1.0.0-PROD</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} UniFlow X Inc. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <span>•</span>
              <a href="#terms">Terms of Service</a>
              <span>•</span>
              <a href="#security">Campus Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
