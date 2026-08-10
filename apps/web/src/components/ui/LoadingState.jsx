import React from 'react';
import Icon from '../Icon';

export function LoadingState({
  message = 'Loading data...',
  isFullScreen = false,
  size = 'md',
  className = '',
}) {
  return (
    <div className={`ui-loading-state ${isFullScreen ? 'fullscreen' : ''} ${className}`}>
      <div className={`ui-loading-spinner size-${size}`}>
        <Icon name="sparkles" size={size === 'sm' ? 18 : size === 'lg' ? 32 : 24} />
      </div>
      {message && <p className="ui-loading-msg">{message}</p>}
    </div>
  );
}

export default LoadingState;
