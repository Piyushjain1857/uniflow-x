import React from 'react';

export function PageContainer({ children, className = '', style = {} }) {
  return (
    <div className={`page-container ${className}`} style={style}>
      {children}
    </div>
  );
}

export default PageContainer;
