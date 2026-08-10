import React from 'react';
import Icon from '../Icon';

export function Checkbox({
  id,
  label,
  checked = false,
  indeterminate = false,
  onChange,
  isDisabled = false,
  description,
  className = '',
  ...props
}) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!isDisabled && onChange) {
        onChange({ target: { checked: !checked } });
      }
    }
  };

  return (
    <div className={`ui-checkbox-group ${isDisabled ? 'disabled' : ''} ${className}`}>
      <label htmlFor={checkboxId} className="ui-checkbox-label">
        <div className="ui-checkbox-box-wrap">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={isDisabled}
            onKeyDown={handleKeyDown}
            className="ui-checkbox-native"
            {...props}
          />
          <div className={`ui-checkbox-custom ${checked ? 'checked' : ''} ${indeterminate ? 'indeterminate' : ''}`}>
            {checked && <Icon name="checkCircle" size={14} />}
          </div>
        </div>

        {label && (
          <div className="ui-checkbox-text-wrap">
            <span className="ui-checkbox-text">{label}</span>
            {description && <span className="ui-checkbox-desc">{description}</span>}
          </div>
        )}
      </label>
    </div>
  );
}

export default Checkbox;
