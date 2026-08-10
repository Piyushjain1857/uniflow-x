import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from '@uniflow-x/constants';
import Icon from './Icon';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="public-header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          <div className="brand-logo-badge">
            <Icon name="sparkles" size={20} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-logo">{APP_CONFIG.APP_NAME}</span>
            <span className="brand-tagline">Digital OS</span>
          </div>
          <span className="badge version-badge">v{APP_CONFIG.VERSION}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="public-nav">
          <NavLink to="/" end className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}>
            App Shell
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}>
            Sign In
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}>
            Register
          </NavLink>
        </nav>

        {/* CTA Buttons */}
        <div className="public-header-actions">
          <Link to="/login" className="btn-secondary-sm">
            Sign In
          </Link>
          <Link to="/dashboard" className="btn-primary-sm">
            <span>Explore App</span>
            <Icon name="arrowRight" size={14} />
          </Link>
          
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle Navigation"
          >
            <Icon name={mobileNavOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="public-mobile-menu">
          <NavLink to="/" end onClick={() => setMobileNavOpen(false)} className="mobile-nav-item">
            <Icon name="home" size={18} /> Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMobileNavOpen(false)} className="mobile-nav-item">
            <Icon name="dashboard" size={18} /> App Shell Preview
          </NavLink>
          <NavLink to="/login" onClick={() => setMobileNavOpen(false)} className="mobile-nav-item">
            <Icon name="login" size={18} /> Sign In
          </NavLink>
          <NavLink to="/register" onClick={() => setMobileNavOpen(false)} className="mobile-nav-item">
            <Icon name="register" size={18} /> Register Account
          </NavLink>
          <NavLink to="/forgot-password" onClick={() => setMobileNavOpen(false)} className="mobile-nav-item">
            <Icon name="forgotPassword" size={18} /> Forgot Password
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
