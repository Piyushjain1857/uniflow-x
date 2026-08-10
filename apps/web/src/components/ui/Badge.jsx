import React from 'react';

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  hasDot = false,
  className = '',
  ...props
}) {
  return (
    <span className={`ui-badge ui-badge-${variant} ui-badge-${size} ${className}`} {...props}>
      {hasDot && <span className={`ui-badge-dot ${variant}`} />}
      <span className="ui-badge-text">{children}</span>
    </span>
  );
}

export default Badge;
