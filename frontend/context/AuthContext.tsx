import {
  deleteFromSecureStore,
  getFromSecureStore,
  saveToSecureStore,
} from '@/utils/secureStore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (user: User, token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        console.log('[AuthProvider] Loading auth data from SecureStore...');
        const storedToken = await getFromSecureStore('token');
        const storedUser = await getFromSecureStore('user');

        console.log('[AuthProvider] Retrieved token:', storedToken);
        console.log('[AuthProvider] Retrieved user:', storedUser);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log('[AuthProvider] Auth state initialized with SecureStore data.');
        } else {
          console.log('[AuthProvider] No auth data found in SecureStore.');
        }
      } catch (error) {
        console.error('[AuthProvider] Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const signIn = async (user: User, token: string) => {
    try {
      console.log('[AuthProvider] Signing in...');
      console.log('[AuthProvider] Saving token:', token);
      console.log('[AuthProvider] Saving user:', user);

      setUser(user);
      setToken(token);

      await saveToSecureStore('token', token);
      await saveToSecureStore('user', user);

      console.log('[AuthProvider] Token and user saved to SecureStore.');
    } catch (error) {
      console.error('[AuthProvider] Sign-in error:', error);
    }
  };

  const signOut = async () => {
    try {
      console.log('[AuthProvider] Signing out...');
      setUser(null);
      setToken(null);

      await deleteFromSecureStore('token');
      await deleteFromSecureStore('user');

      console.log('[AuthProvider] Token and user removed from SecureStore.');
    } catch (error) {
      console.error('[AuthProvider] Sign-out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
