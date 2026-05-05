import type { RegisterRequest, AuthResponse } from '../types';
import { API } from './authService';

export const register = (data: RegisterRequest): Promise<AuthResponse> =>
  API.post('/auth/register', data).then((res) => res.data as AuthResponse);

