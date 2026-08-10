import React from 'react';
import Icon from '../Icon';

export function EmptyState({
  icon = 'sparkles',
  title = 'No Data Available',
  description = 'There are no items or records to display at this moment.',
  action,
  className = '',
}) {
  return (
    <div className={`ui-empty-state ${className}`}>
      <div className="ui-empty-icon-wrap">
        <Icon name={icon} size={36} />
      </div>
      <h3 className="ui-empty-title">{title}</h3>
      <p className="ui-empty-desc">{description}</p>
      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
