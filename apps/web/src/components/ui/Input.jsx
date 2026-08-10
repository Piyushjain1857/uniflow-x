import React from 'react';
import Icon from '../Icon';

export function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  startIcon,
  endIcon,
  isDisabled = false,
  isRequired = false,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`ui-form-group ${error ? 'has-error' : ''} ${isDisabled ? 'disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="ui-label">
          {label} {isRequired && <span className="ui-required">*</span>}
        </label>
      )}

      <div className="ui-input-wrap">
        {startIcon && <Icon name={startIcon} size={18} className="ui-input-icon start" />}
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`ui-input ${startIcon ? 'has-start-icon' : ''} ${endIcon ? 'has-end-icon' : ''}`}
          {...props}
        />

        {endIcon && <Icon name={endIcon} size={18} className="ui-input-icon end" />}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="ui-error-text" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="ui-helper-text">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
