import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: (phone: string) => void;
  completeProfile: (name: string, email?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('ridezone_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Show auth modal on first load
      const hasSeenModal = localStorage.getItem('ridezone_seen_modal');
      if (!hasSeenModal) {
        setTimeout(() => setShowAuthModal(true), 1500);
      }
    }
  }, []);

  const login = (phone: string) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: '',
      phone,
    };
    setUser(newUser);
  };

  const completeProfile = (name: string, email?: string) => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem('ridezone_user', JSON.stringify(updatedUser));
      localStorage.setItem('ridezone_seen_modal', 'true');
      setShowAuthModal(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ridezone_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.name,
        showAuthModal,
        setShowAuthModal,
        login,
        completeProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
