import React from 'react';
import Topbar from './Topbar';

export function Header({ onToggleSidebar }) {
  return <Topbar onToggleSidebar={onToggleSidebar} />;
}

export default Header;
