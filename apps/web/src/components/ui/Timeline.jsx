import React from 'react';
import Icon from '../Icon';

export function Timeline({ items = [], className = '' }) {
  return (
    <div className={`ui-timeline ${className}`}>
      {items.map((item, idx) => (
        <div key={item.id || idx} className={`ui-timeline-item ${item.variant || 'default'}`}>
          <div className="ui-timeline-marker">
            <div className="ui-timeline-dot">
              <Icon name={item.icon || 'checkCircle'} size={14} />
            </div>
            {idx < items.length - 1 && <div className="ui-timeline-line" />}
          </div>

          <div className="ui-timeline-content">
            <div className="ui-timeline-header">
              <h4 className="ui-timeline-title">{item.title}</h4>
              {item.timestamp && <span className="ui-timeline-time">{item.timestamp}</span>}
            </div>

            {item.description && <p className="ui-timeline-desc">{item.description}</p>}
            {item.status && <span className="ui-timeline-badge">{item.status}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
