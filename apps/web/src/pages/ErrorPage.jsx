import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div className="error-page">
      <div className="error-card glass-panel">
        <div className="error-icon-wrap red">
          <Icon name="alertTriangle" size={36} />
        </div>
        <span className="badge badge-error">Application Fault</span>
        <h2 className="error-title">An Unexpected Exception Occurred</h2>
        <p className="error-desc">
          {error?.message || 'UniFlow X encountered a runtime fault while processing the active component.'}
        </p>

        <div className="error-actions">
          {resetErrorBoundary && (
            <button onClick={resetErrorBoundary} className="btn-primary">
              Retry Operation
            </button>
          )}
          <Link to="/dashboard" className="btn-secondary">
            Return to Safety (Dashboard)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
