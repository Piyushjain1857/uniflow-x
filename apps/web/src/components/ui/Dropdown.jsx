import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon';

export function Dropdown({
  trigger,
  items = [],
  align = 'left',
  children,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`ui-dropdown ${className}`} ref={dropdownRef}>
      <div
        className="ui-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`ui-dropdown-menu align-${align}`} role="menu">
          {children
            ? children
            : items.map((item, idx) => (
                <button
                  key={item.id || idx}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className={`ui-dropdown-item ${item.danger ? 'danger' : ''}`}
                  role="menuitem"
                >
                  {item.icon && <Icon name={item.icon} size={16} />}
                  <span>{item.label}</span>
                </button>
              ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
