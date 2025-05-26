import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlusIcon, UsersIcon, CheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Panel de Gestión de Usuarios</h1>
      <p className="mb-6 text-gray-600">Desde aquí puedes gestionar, crear y administrar los usuarios que tendrán acceso al sistema. Usa los accesos rápidos para comenzar.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-blue-500">
          <UsersIcon className="h-10 w-10 text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Usuarios</h2>
            <p className="text-2xl font-bold text-blue-700">100</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-green-500">
          <CheckIcon className="h-10 w-10 text-green-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Usuarios Activos</h2>
            <p className="text-2xl font-bold text-green-700">75</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4 border-t-4 border-purple-500">
          <ShieldCheckIcon className="h-10 w-10 text-purple-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Administradores</h2>
            <p className="text-2xl font-bold text-purple-700">10</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Link to="/users" className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 font-semibold justify-center shadow">
          <UsersIcon className="h-5 w-5" />
          Gestionar Usuarios
        </Link>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-gray-700">
        <h3 className="font-semibold mb-2">¿Cómo usar este panel?</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Haz clic en <span className="font-semibold text-blue-600">Gestionar Usuarios</span> para ver, editar o eliminar usuarios existentes.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
