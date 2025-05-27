import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, ShieldCheckIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { getUsers } from '../services/userService';
import { getCompanies } from '../services/companyService';

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getCompanies()
    ]).then(([users, companies]) => {
      setUserCount(users.length);
      setAdminCount(users.filter(u => u.rol === 'admin').length);
      setCompanyCount(companies.length);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Panel de Gestión</h1>
      <p className="mb-6 text-gray-600">Desde aquí puedes gestionar, crear y administrar los usuarios y empresas del sistema. Usa los accesos rápidos para comenzar.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-blue-500 hover:scale-105 transition-transform">
          <UsersIcon className="h-10 w-10 text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Usuarios</h2>
            <p className="text-2xl font-bold text-blue-700">{loading ? <span className='skeleton h-6 w-12 inline-block'></span> : userCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-green-500 hover:scale-105 transition-transform">
          <BuildingOfficeIcon className="h-10 w-10 text-green-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Empresas</h2>
            <p className="text-2xl font-bold text-green-700">{loading ? <span className='skeleton h-6 w-12 inline-block'></span> : companyCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-purple-500 hover:scale-105 transition-transform">
          <ShieldCheckIcon className="h-10 w-10 text-purple-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Administradores</h2>
            <p className="text-2xl font-bold text-purple-700">{loading ? <span className='skeleton h-6 w-12 inline-block'></span> : adminCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Link to="/users" className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 font-semibold justify-center shadow transition-transform hover:scale-105">
          <UsersIcon className="h-5 w-5" />
          Gestionar Usuarios
        </Link>
        <Link to="/companies" className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-600 font-semibold justify-center shadow transition-transform hover:scale-105">
          <BuildingOfficeIcon className="h-5 w-5" />
          Gestionar Empresas
        </Link>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-gray-700">
        <h3 className="font-semibold mb-2">¿Cómo usar este panel?</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Haz clic en <span className="font-semibold text-blue-600">Gestionar Usuarios</span> para ver, editar o eliminar usuarios existentes.</li>
          <li>Haz clic en <span className="font-semibold text-green-600">Gestionar Empresas</span> para administrar las empresas asociadas.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
