import React, { createContext, useContext } from 'react';

// Mock types for user and role
type UserRole = 'admin' | 'passenger' | 'driver';

interface AuthContextType {
  user: null;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = {
    user: null, // Mock user as null
    userRole: null, // Mock role as null
    signIn: async () => {
      console.warn('signIn is not implemented.');
    },
    signOut: async () => {
      console.warn('signOut is not implemented.');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}