// Servicio para manejar operaciones relacionadas con usuarios

export interface User {
  id_empresa: string;
  id_usuario?: string;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  rol?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Elimina la simulación de base de datos en memoria

export async function createUser(user: User): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Error al registrar usuario');
  }
  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return response.json();
}
