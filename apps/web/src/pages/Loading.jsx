import React from 'react';
import Icon from '../components/Icon';

export function Loading({ label = 'Initializing UniFlow X Kernel...' }) {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="glow-spinner-ring">
          <div className="spinner-center">
            <Icon name="sparkles" size={28} />
          </div>
        </div>
        <h3 className="loading-label">{label}</h3>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
