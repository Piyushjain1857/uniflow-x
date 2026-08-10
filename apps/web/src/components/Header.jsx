import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '@uniflow-x/constants';

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <Link to="/" className="brand-logo">
          {APP_CONFIG.APP_NAME}
        </Link>
        <span className="badge">v{APP_CONFIG.VERSION}</span>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link active">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
