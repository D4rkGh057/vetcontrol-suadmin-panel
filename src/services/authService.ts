// src/services/authService.ts

export interface LoginResponse {
  token: string;
  [key: string]: any;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Credenciales incorrectas o error en el servidor.');
  }
  return response.json();
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
