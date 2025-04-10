
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { sampleFarmers, sampleInvestors, sampleLandowners } from '../data/mockData';

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const savedUser = localStorage.getItem('user');

      if (isLoggedIn && savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      setIsLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // For demo, we're using dummy credentials
    if (email === 'sulley@gmail.com' && password === 'sulley1234') {
      // For demo purposes, we'll use a mock farmer profile
      const mockUser = {
        ...sampleFarmers[0],
        email: 'sulley@gmail.com',
        fullName: 'Sulley Mohammed'
      };
      
      setUser(mockUser);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = '/landing';
  };

  const updateUserRole = (role: UserRole) => {
    if (!user) return;

    // Update the user's role
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
