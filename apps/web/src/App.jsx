import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/ToastContext';
import RootLayout from './layouts/RootLayout';
import PublicLayout from './layouts/PublicLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Academics from './pages/Academics';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Exams from './pages/Exams';
import Timetable from './pages/Timetable';
import Campus from './pages/Campus';
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import CampusMap from './pages/CampusMap';
import UniAI from './pages/UniAI';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import PlaceholderPage from './pages/PlaceholderPage';
import Settings from './pages/Settings';
import SubjectDetails from './pages/SubjectDetails';
import NotFound from './pages/NotFound';
import DesignSystemShowcase from './pages/DesignSystemShowcase';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>

            {/* Public Unauthenticated Shell */}
            <Route element={<PublicLayout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="design-system" element={<DesignSystemShowcase />} />
            </Route>

            {/* Authenticated Workspace Shell */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="academics" element={<Academics />} />
              <Route path="academics/:id" element={<SubjectDetails />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="exams" element={<Exams />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="calendar" element={<PlaceholderPage routePath="/calendar" />} />

              <Route path="campus" element={<Campus />} />
              <Route path="events" element={<Events />} />
              <Route path="clubs" element={<Clubs />} />
              <Route path="campus-map" element={<CampusMap />} />
              <Route path="complaints" element={<Campus />} />

              <Route path="uni-ai" element={<UniAI />} />
              <Route path="digital-id" element={<PlaceholderPage routePath="/digital-id" />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />

              <Route path="faculty" element={<PlaceholderPage routePath="/faculty" />} />
              <Route path="admin" element={<PlaceholderPage routePath="/admin" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
