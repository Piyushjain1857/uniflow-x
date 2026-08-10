import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function RootLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} UniFlow X. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RootLayout;
