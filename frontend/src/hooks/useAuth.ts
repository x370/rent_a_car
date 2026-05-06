import { useState } from 'react';
import { authService } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, logout as logoutAction } from '@/store/authSlice';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      
      // Dispatch to Redux
      dispatch(setCredentials({
        user: data.user || { email: credentials.email }, // Backend might return user object
        token: data.token,
        role: data.role
      }));

      // Optional: still keep token in localStorage for persistence across refreshes
      localStorage.setItem('token', data.token);
      
      router.push('/');
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      router.push('/auth/login');
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return { login, register, logout, loading, error };
};
