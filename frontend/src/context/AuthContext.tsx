import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { AuthContext } from './authContextCore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Speichert Login-Daten und macht sie für alle Seiten verfügbar.
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const loginUser = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loginUser, logoutUser, isAuthenticated: !!token }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
