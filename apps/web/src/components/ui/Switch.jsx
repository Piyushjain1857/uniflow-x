import React from 'react';

export function Switch({
  id,
  label,
  checked = false,
  onChange,
  size = 'md',
  isDisabled = false,
  description,
  className = '',
  ...props
}) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const handleToggle = (e) => {
    if (isDisabled) return;
    if (onChange) {
      onChange({ target: { checked: !checked } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle(e);
    }
  };

  return (
    <div className={`ui-switch-group ${isDisabled ? 'disabled' : ''} ${className}`}>
      <label htmlFor={switchId} className="ui-switch-label">
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={isDisabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`ui-switch-track ui-switch-${size} ${checked ? 'checked' : ''}`}
          {...props}
        >
          <span className="ui-switch-thumb" />
        </button>

        {label && (
          <div className="ui-switch-text-wrap">
            <span className="ui-switch-text">{label}</span>
            {description && <span className="ui-switch-desc">{description}</span>}
          </div>
        )}
      </label>
    </div>
  );
}

export default Switch;
