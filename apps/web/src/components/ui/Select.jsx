import React from 'react';
import Icon from '../Icon';

export function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  error,
  helperText,
  startIcon,
  isDisabled = false,
  isRequired = false,
  className = '',
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`ui-form-group ${error ? 'has-error' : ''} ${isDisabled ? 'disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="ui-label">
          {label} {isRequired && <span className="ui-required">*</span>}
        </label>
      )}

      <div className="ui-select-wrap">
        {startIcon && <Icon name={startIcon} size={18} className="ui-input-icon start" />}
        
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          aria-invalid={!!error}
          className={`ui-select ${startIcon ? 'has-start-icon' : ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <Icon name="chevronRight" size={16} className="ui-select-arrow" />
      </div>

      {error ? (
        <p className="ui-error-text" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="ui-helper-text">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Select;
