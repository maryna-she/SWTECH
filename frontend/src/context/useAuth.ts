import { useContext } from 'react';
import { AuthContext } from './authContextCore';

// Gibt den aktuellen Auth-Status für Komponenten zurück.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
