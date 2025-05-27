import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UsersIcon, UserPlusIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-3 rounded-md font-semibold transition-colors duration-150 ${
      location.pathname === path
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  };

  return (
    <aside className="h-screen min-h-screen w-64 bg-white shadow-lg p-4 flex flex-col gap-2 fixed md:static top-0 left-0">
      <img src="/VetControl.png" alt="Logo" className="h-10 w-auto mb-4 mx-auto" />
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClass('/')}> <HomeIcon className="h-5 w-5" /> Dashboard </Link>
        <Link to="/users" className={linkClass('/users')}> <UsersIcon className="h-5 w-5" /> Usuarios </Link>
        <Link to="/companies" className={linkClass('/companies')}> <BuildingOfficeIcon className="h-5 w-5" /> Empresas </Link>
      </nav>
      <Link
        to={isAuthenticated ? '#' : '/login'}
        onClick={handleAuthClick}
        className={`mt-auto w-full flex items-center gap-2 px-4 py-3 rounded-md font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
          isAuthenticated
            ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'
        }`}
      >
        <UserPlusIcon className="h-5 w-5" /> {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
      </Link>
    </aside>
  );
};

export default Sidebar;
