import React, { useEffect } from 'react';
import Icon from '../Icon';

export function Drawer({
  isOpen = false,
  onClose,
  title,
  position = 'right',
  children,
  footer,
  className = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ui-drawer-backdrop" onClick={onClose}>
      <div
        className={`ui-drawer-panel drawer-${position} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="ui-drawer-header">
          {title && <h3 className="ui-drawer-title">{title}</h3>}
          <button onClick={onClose} className="ui-drawer-close-btn" aria-label="Close drawer">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="ui-drawer-body">{children}</div>

        {footer && <div className="ui-drawer-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Drawer;
