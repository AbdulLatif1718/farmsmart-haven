import React, { createContext, useContext, useEffect, useState } from 'react';
import { adminAuth, AdminSession } from '@/utils/adminAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  session: AdminSession | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = adminAuth.isAuthenticated();
      const sessionData = adminAuth.getSession();
      
      setIsAuthenticated(authenticated);
      setSession(sessionData);
      setLoading(false);
    };

    checkAuth();

    // Check auth status periodically
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const signOut = () => {
    adminAuth.logout();
    setIsAuthenticated(false);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};