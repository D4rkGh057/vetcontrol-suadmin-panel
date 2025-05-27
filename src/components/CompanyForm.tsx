import React, { useState } from 'react';
import type { Company } from '../services/companyService';
import { createCompany } from '../services/companyService';

interface CompanyFormProps {
  onSuccess?: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await createCompany({
        id_empresa: '', // El backend debe asignar el id
        nombre,
        ruc,
        direccion,
        telefono,
        email,
      });
      setSuccess('Empresa creada correctamente');
      setNombre(''); setRuc(''); setDireccion(''); setTelefono(''); setEmail('');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al crear empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Crear Empresa</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Nombre" required />
      </div>
      <div>
        <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-1">RUC</label>
        <input id="ruc" type="text" value={ruc} onChange={e => setRuc(e.target.value)} className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="RUC" required />
      </div>
      <div>
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input id="direccion" type="text" value={direccion} onChange={e => setDireccion(e.target.value)} className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Dirección" required />
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input id="telefono" type="text" value={telefono} onChange={e => setTelefono(e.target.value)} className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Teléfono" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Email" required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors shadow flex items-center justify-center" disabled={loading}>
        {loading && (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        Crear Empresa
      </button>
    </form>
  );
};

export default CompanyForm;
