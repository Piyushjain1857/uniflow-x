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
import PlaceholderPage from './pages/PlaceholderPage';
import NotFound from './pages/NotFound';
import DesignSystemShowcase from './pages/DesignSystemShowcase';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          
          {/* Unauthenticated / Public Landing & Auth Shell */}
          <Route element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="design-system" element={<DesignSystemShowcase />} />
          </Route>

          {/* Authenticated Workspace Shell & Role Placeholders */}
          <Route element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<PlaceholderPage routePath="/dashboard" />} />
            <Route path="academics" element={<PlaceholderPage routePath="/academics" />} />
            <Route path="attendance" element={<PlaceholderPage routePath="/attendance" />} />
            <Route path="assignments" element={<PlaceholderPage routePath="/assignments" />} />
            <Route path="exams" element={<PlaceholderPage routePath="/exams" />} />
            <Route path="timetable" element={<PlaceholderPage routePath="/timetable" />} />
            <Route path="calendar" element={<PlaceholderPage routePath="/calendar" />} />
            
            <Route path="campus" element={<PlaceholderPage routePath="/campus" />} />
            <Route path="events" element={<PlaceholderPage routePath="/events" />} />
            <Route path="clubs" element={<PlaceholderPage routePath="/clubs" />} />
            <Route path="campus-map" element={<PlaceholderPage routePath="/campus-map" />} />
            <Route path="complaints" element={<PlaceholderPage routePath="/complaints" />} />
            
            <Route path="uni-ai" element={<PlaceholderPage routePath="/uni-ai" />} />
            <Route path="digital-id" element={<PlaceholderPage routePath="/digital-id" />} />
            <Route path="notifications" element={<PlaceholderPage routePath="/notifications" />} />
            <Route path="profile" element={<PlaceholderPage routePath="/profile" />} />
            <Route path="settings" element={<PlaceholderPage routePath="/settings" />} />
            
            {/* Role Placeholder Routes */}
            <Route path="faculty" element={<PlaceholderPage routePath="/faculty" />} />
            <Route path="admin" element={<PlaceholderPage routePath="/admin" />} />
          </Route>

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
