import React from 'react';
import Icon from '../Icon';

export function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'primary',
  className = '',
}) {
  return (
    <div className={`ui-stat-card color-${color} ${className}`}>
      <div className="ui-stat-top">
        <span className="ui-stat-label">{label}</span>
        {icon && (
          <div className="ui-stat-icon-wrap">
            <Icon name={icon} size={18} />
          </div>
        )}
      </div>

      <div className="ui-stat-value">{value}</div>

      {change && (
        <div className={`ui-stat-change type-${changeType}`}>
          {changeType === 'positive' && '▲ '}
          {changeType === 'negative' && '▼ '}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
