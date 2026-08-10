import React from 'react';
import Icon from '../Icon';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  isLoading = false,
  isDisabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const isButtonDisabled = isDisabled || isLoading;

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      onClick={onClick}
      className={`ui-btn ui-btn-${variant} ui-btn-${size} ${isButtonDisabled ? 'disabled' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="ui-btn-spinner" aria-label="Loading">
          <Icon name="sparkles" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      ) : icon ? (
        <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}

      {children && <span className="ui-btn-label">{children}</span>}

      {!isLoading && iconRight && (
        <Icon name={iconRight} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
    </button>
  );
}

export default Button;
