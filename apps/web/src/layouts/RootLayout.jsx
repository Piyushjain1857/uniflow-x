import React from 'react';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="root-container">
      <div className="bg-glow-layer-1" />
      <div className="bg-glow-layer-2" />
      <Outlet />
    </div>
  );
}

export default RootLayout;
