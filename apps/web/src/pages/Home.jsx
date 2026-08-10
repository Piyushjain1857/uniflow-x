import React from 'react';
import { USER_ROLES, APP_CONFIG } from '@uniflow-x/constants';
import { formatRoleName } from '@uniflow-x/utils';

function Home() {
  return (
    <div className="page-home">
      <section className="hero">
        <h1 className="hero-title">{APP_CONFIG.APP_NAME}</h1>
        <p className="hero-subtitle">
          {APP_CONFIG.DESCRIPTION}
        </p>
        <div className="roles-list">
          {Object.values(USER_ROLES).map((role) => (
            <span key={role} className="role-tag">
              {formatRoleName(role)}
            </span>
          ))}
        </div>
      </section>

      <section className="card-grid">
        <div className="card">
          <h3>Web Application</h3>
          <p>Built with React, Vite, and JavaScript for seamless browser experience.</p>
        </div>
        <div className="card">
          <h3>Native Mobile App</h3>
          <p>Powered by React Native and Expo for iOS and Android devices.</p>
        </div>
        <div className="card">
          <h3>FastAPI Backend</h3>
          <p>High-performance Python backend with SQLAlchemy, Alembic, and MySQL.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
