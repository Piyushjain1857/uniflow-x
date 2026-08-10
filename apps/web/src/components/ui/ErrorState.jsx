import React from 'react';
import Icon from '../Icon';
import Button from './Button';

export function ErrorState({
  icon = 'alertTriangle',
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while loading this section.',
  onRetry,
  retryText = 'Try Again',
  className = '',
}) {
  return (
    <div className={`ui-error-state ${className}`}>
      <div className="ui-error-icon-wrap">
        <Icon name={icon} size={36} />
      </div>
      <h3 className="ui-error-title">{title}</h3>
      <p className="ui-error-message">{message}</p>
      {onRetry && (
        <Button variant="primary" size="sm" icon="sparkles" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
