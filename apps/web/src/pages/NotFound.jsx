import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card glass-panel">
        <div className="not-found-code">404</div>
        <div className="not-found-badge">
          <Icon name="alertTriangle" size={16} />
          <span>Route Disconnected</span>
        </div>
        <h1 className="not-found-title">Page Not Found in Matrix</h1>
        <p className="not-found-text">
          The requested UniFlow X node or route does not exist or has been relocated to another sector.
        </p>

        <div className="not-found-actions">
          <Link to="/dashboard" className="btn-primary">
            <Icon name="dashboard" size={18} />
            <span>Return to Dashboard</span>
          </Link>
          <Link to="/" className="btn-secondary">
            <Icon name="home" size={18} />
            <span>Go to Home Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
