import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

const primaryMobileTabs = [
  { path: '/dashboard', label: 'Home', icon: 'dashboard' },
  { path: '/academics', label: 'Academics', icon: 'academics' },
  { path: '/campus', label: 'Campus', icon: 'campus' },
  { path: '/uni-ai', label: 'UniAI', icon: 'uniAi', isAi: true },
  { path: '/profile', label: 'Profile', icon: 'profile' },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {primaryMobileTabs.map((tab) => {
        const isActive = location.pathname === tab.path || (tab.path === '/dashboard' && location.pathname === '/');
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={`mobile-nav-item ${isActive ? 'active' : ''} ${tab.isAi ? 'ai-tab' : ''}`}
          >
            <div className="mobile-nav-icon-wrap">
              <Icon name={tab.icon} size={20} />
            </div>
            <span className="mobile-nav-label">{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
