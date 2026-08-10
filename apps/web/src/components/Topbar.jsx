import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export function Topbar({ onToggleSidebar }) {
  const [activeRole, setActiveRole] = useState('Student');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'Faculty') navigate('/faculty');
    else if (role === 'Admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
        >
          <Icon name="menu" size={22} />
        </button>

        {/* Search Input */}
        <div className="topbar-search">
          <Icon name="search" size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search courses, exams, campus events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      <div className="topbar-right">
        {/* Role Switcher Pill */}
        <div className="role-switcher-pill">
          <span className="role-switcher-label">View:</span>
          <button
            className={`role-btn ${activeRole === 'Student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('Student')}
          >
            Student
          </button>
          <button
            className={`role-btn ${activeRole === 'Faculty' ? 'active' : ''}`}
            onClick={() => handleRoleChange('Faculty')}
          >
            Faculty
          </button>
          <button
            className={`role-btn ${activeRole === 'Admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('Admin')}
          >
            Admin
          </button>
        </div>

        {/* UniAI Quick Action */}
        <Link to="/uni-ai" className="topbar-action-btn ai-btn" title="Open UniAI Assistant">
          <Icon name="sparkles" size={16} />
          <span className="ai-btn-text">UniAI</span>
        </Link>

        {/* Notification Bell with Badge Placeholder */}
        <Link to="/notifications" className="topbar-action-btn notification-btn" title="Notifications">
          <Icon name="notifications" size={18} />
          <span className="notification-badge-count">3</span>
        </Link>

        {/* User Avatar Placeholder */}
        <Link to="/profile" className="topbar-user-pill" title="User Profile">
          <div className="user-avatar-sm">PX</div>
          <span className="user-name-sm">Alex Vance</span>
        </Link>
      </div>
    </header>
  );
}

export default Topbar;
