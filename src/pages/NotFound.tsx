import React from 'react';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
    <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-2xl text-gray-700 mb-6">Página no encontrada</p>
    <a href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors">Ir al Dashboard</a>
  </div>
);

export default NotFound;
