import React from 'react';

export function Textarea({
  id,
  label,
  value = '',
  onChange,
  rows = 4,
  placeholder,
  maxLength,
  error,
  helperText,
  isDisabled = false,
  isRequired = false,
  className = '',
  ...props
}) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className={`ui-form-group ${error ? 'has-error' : ''} ${isDisabled ? 'disabled' : ''} ${className}`}>
      <div className="ui-label-row">
        {label && (
          <label htmlFor={textareaId} className="ui-label">
            {label} {isRequired && <span className="ui-required">*</span>}
          </label>
        )}

        {maxLength && (
          <span className="ui-char-count">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={isDisabled}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="ui-textarea"
        {...props}
      />

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

export default Textarea;
