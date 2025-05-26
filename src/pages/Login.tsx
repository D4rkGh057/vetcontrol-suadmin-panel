import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setAuthToken } from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.access_token) {
        setAuthToken(data.access_token);
        navigate('/dashboard');
      } else {
        setError('No se recibió un token de autenticación.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300" style={{ backgroundImage: 'url(/src/assets/patron.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex items-center justify-center mb-6 ">
          <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
          <div className="mx-4 h-16 border-l-2 border-black"></div>
          <img src="/VetControl.png" alt="VetControl" className="h-6 w-auto object-contain" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Ingresa tu contraseña'
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
