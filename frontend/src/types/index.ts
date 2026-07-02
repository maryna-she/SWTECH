export interface RegisterRequest {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface BackendUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  isDeleted: boolean;
}

