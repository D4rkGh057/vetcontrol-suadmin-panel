import React, { useState } from 'react';

interface UserFormProps {
  user?: { id: number; name: string; email: string } | null;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para crear o editar un usuario admin
    if (user) {
      console.log('Editar usuario', { id: user.id, email, password });
    } else {
      console.log('Crear usuario', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{user ? 'Editar Usuario Administrador' : 'Nuevo Usuario Administrador'}</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="ejemplo@correo.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium placeholder-base-100/45 text-gray-700 mb-1">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border text-black border-gray-300 placeholder-base-100/45 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors shadow"
      >
        {user ? 'Guardar Cambios' : 'Crear Usuario Admin'}
      </button>
    </form>
  );
};

export default UserForm;
