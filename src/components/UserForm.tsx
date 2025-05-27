import React, { useState } from 'react';
import type { User } from '../services/userService';
import type { Company } from '../services/companyService';
import { createUser, updateUser } from '../services/userService';

interface UserFormProps {
  user?: User | null;
  companies: Company[];
  onSuccess?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, companies, onSuccess }) => {
  const [nombre, setNombre] = useState(user?.nombre ?? '');
  const [apellido, setApellido] = useState(user?.apellido ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [rol, setRol] = useState(user?.rol ?? '');
  const [idEmpresa, setIdEmpresa] = useState(user?.id_empresa ?? (companies[0]?.id_empresa || ''));
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (user) {
        await updateUser({
          id_usuario: user.id_usuario,
          id_empresa: idEmpresa,
          nombre,
          apellido,
          email,
          contraseña: '', // No se envía contraseña al editar
          rol,
        });
        setSuccess('Usuario actualizado correctamente');
        if (onSuccess) onSuccess();
      } else {
        await createUser({
          id_empresa: idEmpresa,
          nombre,
          apellido,
          email,
          contraseña: password,
          rol,
        });
        setSuccess('Usuario creado correctamente');
        setNombre('');
        setApellido('');
        setEmail('');
        setRol('');
        setPassword('');
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{user ? 'Editar Usuario Administrador' : 'Nuevo Usuario Administrador'}</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
        <input
          id="apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Apellido"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="ejemplo@correo.com"
          required
        />
      </div>
      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
        <select
          id="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          <option value="" disabled>Seleccione un rol</option>
          <option value="admin">Administrador</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>
      <div>
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
        <select
          id="empresa"
          value={idEmpresa}
          onChange={e => setIdEmpresa(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          {companies.map((empresa) => (
            <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.nombre}</option>
          ))}
        </select>
      </div>
      {/* Campo contraseña solo al crear */}
      {!user && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium placeholder-base-100/45 text-gray-700 mb-1">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border text-black border-gray-300 placeholder-base-100/45 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors shadow flex items-center justify-center"
        disabled={loading}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        {user ? 'Guardar Cambios' : 'Crear Usuario Admin'}
      </button>
    </form>
  );
};

export default UserForm;
