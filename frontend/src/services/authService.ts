import type { BackendUser, LoginRequest, AuthResponse, User } from '../types';
import { API } from './apiClient';

export const login = (data: LoginRequest): Promise<AuthResponse> =>
  API.post('/auth/login', data).then((res) => res.data as AuthResponse);

const toUser = (user: BackendUser): User => ({
  id: user.id,
  email: user.email,
  name: [user.firstName, user.lastName].filter(Boolean).join(' '),
  role: user.role,
});

export const getCurrentUser = (): Promise<User> =>
  API.get('/auth/users/me').then((res) => toUser(res.data as BackendUser));

export const loginWithProfile = async (data: LoginRequest) => {
  const auth = await login(data);
  localStorage.setItem('token', auth.token);
  const user = await getCurrentUser();
  return { token: auth.token, user };
};

