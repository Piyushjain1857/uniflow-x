import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ToastProvider } from './components/ui/ToastContext';
import RootLayout from './layouts/RootLayout';
import PublicLayout from './layouts/PublicLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Academics from './pages/Academics';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Timetable from './pages/Timetable';
import Campus from './pages/Campus';
import UniAI from './pages/UniAI';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFound from './pages/NotFound';
import DesignSystemShowcase from './pages/DesignSystemShowcase';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          
          {/* Public Unauthenticated Shell */}
          <Route element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="design-system" element={<DesignSystemShowcase />} />
          </Route>

          {/* Authenticated Workspace Shell */}
          <Route element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="academics" element={<Academics />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="exams" element={<PlaceholderPage routePath="/exams" />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="calendar" element={<PlaceholderPage routePath="/calendar" />} />
            
            <Route path="campus" element={<Campus />} />
            <Route path="events" element={<Campus />} />
            <Route path="clubs" element={<Campus />} />
            <Route path="campus-map" element={<Campus />} />
            <Route path="complaints" element={<Campus />} />
            
            <Route path="uni-ai" element={<UniAI />} />
            <Route path="digital-id" element={<PlaceholderPage routePath="/digital-id" />} />
            <Route path="notifications" element={<PlaceholderPage routePath="/notifications" />} />
            <Route path="profile" element={<PlaceholderPage routePath="/profile" />} />
            <Route path="settings" element={<PlaceholderPage routePath="/settings" />} />
            
            <Route path="faculty" element={<PlaceholderPage routePath="/faculty" />} />
            <Route path="admin" element={<PlaceholderPage routePath="/admin" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
