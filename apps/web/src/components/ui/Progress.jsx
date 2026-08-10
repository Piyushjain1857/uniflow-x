import React from 'react';

export function Progress({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showValue = false,
  label,
  className = '',
}) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div className={`ui-progress-group ${className}`}>
      {(label || showValue) && (
        <div className="ui-progress-header">
          {label && <span className="ui-progress-label">{label}</span>}
          {showValue && <span className="ui-progress-val">{Math.round(percentage)}%</span>}
        </div>
      )}

      <div
        className={`ui-progress-track ui-progress-${size}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`ui-progress-fill variant-${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
