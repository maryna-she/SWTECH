import { createContext } from 'react';
import type { User } from '../types';

// Beschreibt alle Werte, die der Auth-Kontext teilt.
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
