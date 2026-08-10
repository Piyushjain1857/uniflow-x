import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export function MobileHeader({ onToggleSidebar, title = 'UniFlow X', notificationCount = 3 }) {
  return (
    <header className="mobile-header">
      <button
        className="mobile-menu-toggle-btn"
        onClick={onToggleSidebar}
        aria-label="Open navigation drawer"
      >
        <Icon name="menu" size={22} />
      </button>

      <Link to="/dashboard" className="mobile-brand-link">
        <span className="mobile-brand-icon">
          <Icon name="sparkles" size={18} />
        </span>
        <span className="mobile-brand-title">{title}</span>
      </Link>

      <div className="mobile-header-actions">
        <Link to="/notifications" className="mobile-action-icon" title="Notifications">
          <Icon name="notifications" size={20} />
          {notificationCount > 0 && <span className="mobile-badge-dot">{notificationCount}</span>}
        </Link>
        <Link to="/profile" className="mobile-user-avatar" title="Profile">
          AV
        </Link>
      </div>
    </header>
  );
}

export default MobileHeader;
