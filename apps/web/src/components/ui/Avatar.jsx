import React, { useState } from 'react';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
};

export function Avatar({
  src,
  name = 'User',
  size = 'md',
  status,
  className = '',
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`ui-avatar ui-avatar-${size} ${className}`} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageError(true)}
          className="ui-avatar-img"
        />
      ) : (
        <div className="ui-avatar-fallback">
          <span>{getInitials(name)}</span>
        </div>
      )}

      {status && <span className={`ui-avatar-status status-${status}`} aria-label={`Status: ${status}`} />}
    </div>
  );
}

export default Avatar;
