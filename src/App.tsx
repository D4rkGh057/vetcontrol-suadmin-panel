import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Companies from './pages/Companies';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const MainLayout: React.FC = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-0 md:p-8">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}> {/* Protege todas las rutas excepto login */}
        <Route path="/*" element={isLogin ? <Login /> : <MainLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
