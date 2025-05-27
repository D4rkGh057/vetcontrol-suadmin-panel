import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UsersIcon, BuildingOfficeIcon, ChartBarIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-colors duration-150 text-lg tracking-wide ${
      location.pathname === path
        ? 'bg-[#003E40] text-white shadow-md' // Seleccionado
        : 'text-white hover:bg-[#008888] hover:text-white' // Hover
    }`;

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  };

  return (
    <aside className="h-screen min-h-screen w-72 bg-[#005456] shadow-xl p-0 flex flex-col gap-2 fixed md:static top-0 left-0">
      <div className="flex items-center justify-center h-12 border-b border-[#01334a] mb-2 bg-white">
        <img src="/VetControl.png" alt="Logo" className="h-8 w-auto" />
      </div>
      <nav className="flex flex-col gap-2 px-2 mt-4">
        <Link to="/dashboard" className={linkClass('/dashboard')}> <ChartBarIcon className="h-6 w-6" /> Dashboard </Link>
        <Link to="/users" className={linkClass('/users')}> <UsersIcon className="h-6 w-6" /> Usuarios </Link>
        <Link to="/companies" className={linkClass('/companies')}> <BuildingOfficeIcon className="h-6 w-6" /> Empresas </Link>
      </nav>
      <Link
        to={isAuthenticated ? '#' : '/login'}
        onClick={handleAuthClick}
        className={`mt-auto w-full flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-lg tracking-wide ${
          isAuthenticated
            ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'
        }`}
      >
        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" /> {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
      </Link>
    </aside>
  );
};

export default Sidebar;
