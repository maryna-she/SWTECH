import type { RegisterRequest, User } from '../types';
import { API } from './apiClient';

export const register = (data: RegisterRequest): Promise<User> =>
  API.post('/auth/register', data).then((res) => res.data as User);

