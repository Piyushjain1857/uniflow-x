import React from 'react';

export function Skeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  style = {},
}) {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, idx) => (
        <div
          key={idx}
          className={`ui-skeleton ui-skeleton-${variant} ${className}`}
          style={{
            width: width || (variant === 'circle' ? height : undefined),
            height: height,
            ...style,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export default Skeleton;
