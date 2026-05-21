import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { register } from '../../services/registerService';
import type { AuthCopy } from '../authCopy';
import { getPasswordScore } from './passwordScore';

const isConflictError = (err: unknown) => (
  typeof err === 'object' &&
  err !== null &&
  'response' in err &&
  typeof (err as { response?: { status?: number } }).response?.status === 'number' &&
  (err as { response: { status: number } }).response.status === 409
);

const useRegisterForm = (copy: AuthCopy) => {
  // Kapselt Eingaben, Prüfung und API-Aufruf der Registrierung.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const passwordScore = getPasswordScore(password);
  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(copy.register.mismatchError);
      return;
    }

    if (password.length < 8) {
      setError(copy.register.shortPasswordError);
      return;
    }

    setLoading(true);
    try {
      const res = await register({ name, email, password });
      loginUser(res.token, { email: res.email, name: res.name, role: res.role });
      navigate('/');
    } catch (err: unknown) {
      setError(isConflictError(err) ? copy.register.conflictError : copy.register.defaultError);
    } finally {
      setLoading(false);
    }
  };

  return {
    values: { name, email, password, confirmPassword },
    state: { showPassword, error, loading, passwordScore, passwordsMatch },
    setters: { setName, setEmail, setPassword, setConfirmPassword, setError },
    actions: { setShowPassword, handleSubmit },
  };
};

export default useRegisterForm;
