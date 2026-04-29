import axios from 'axios';
import type { LoginRequest, AuthResponse } from '../types';

export const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// JWT Token automatisch mitsenden
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data: LoginRequest): Promise<AuthResponse> =>
  API.post('/auth/login', data).then((res) => res.data as AuthResponse);

