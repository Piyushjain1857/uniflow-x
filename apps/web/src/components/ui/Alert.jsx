import React, { useState } from 'react';
import Icon from '../Icon';

export function Alert({
  title,
  children,
  variant = 'info',
  isDismissible = false,
  onDismiss,
  className = '',
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  const iconMap = {
    info: 'sparkles',
    success: 'checkCircle',
    warning: 'alertTriangle',
    danger: 'alertTriangle',
  };

  return (
    <div className={`ui-alert ui-alert-${variant} ${className}`} role="alert">
      <div className="ui-alert-icon">
        <Icon name={iconMap[variant] || 'sparkles'} size={20} />
      </div>

      <div className="ui-alert-content">
        {title && <h4 className="ui-alert-title">{title}</h4>}
        {children && <div className="ui-alert-body">{children}</div>}
      </div>

      {isDismissible && (
        <button
          onClick={handleDismiss}
          className="ui-alert-close"
          aria-label="Dismiss alert"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}

export default Alert;
