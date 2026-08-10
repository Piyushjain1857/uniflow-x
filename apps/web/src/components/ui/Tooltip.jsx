import React, { useState } from 'react';

export function Tooltip({
  children,
  content,
  position = 'top',
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return children;

  return (
    <div
      className={`ui-tooltip-wrap ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`ui-tooltip-bubble position-${position}`} role="tooltip">
          {content}
          <span className="ui-tooltip-arrow" />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
