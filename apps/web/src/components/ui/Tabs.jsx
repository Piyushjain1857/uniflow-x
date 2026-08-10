import React from 'react';
import Icon from '../Icon';

export function Tabs({
  items = [],
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}) {
  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      const nextTab = items[nextIndex];
      if (nextTab && !nextTab.disabled && onChange) {
        onChange(nextTab.id);
      }
    }
  };

  return (
    <div className={`ui-tabs ui-tabs-${variant} ${className}`} role="tablist">
      {items.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange && onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`ui-tab-item ${isActive ? 'active' : ''}`}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            <span>{tab.label}</span>
            {tab.badge && <span className="ui-tab-badge">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
