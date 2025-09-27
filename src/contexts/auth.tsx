"use client";

import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: null;
  isAuthenticated: false;
  isLoading: false;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const login = async (email: string, password: string) => {
    console.log('Login attempt:', email);
  };

  const register = async (data: any) => {
    console.log('Register attempt:', data);
  };

  const logout = () => {
    console.log('Logout');
  };

  return (
    <AuthContext.Provider value={{ 
      user: null, 
      isAuthenticated: false, 
      isLoading: false,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}