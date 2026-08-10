import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="public-layout">
      <Outlet />
    </div>
  );
}

export default PublicLayout;
