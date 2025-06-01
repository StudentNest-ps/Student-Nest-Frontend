'use client';

import auth from '@/module/services/auth';
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { User, UserResponse } from '@/module/@types';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: UserResponse | null;
  login: (userData: User, callback?: () => void) => void;
  logout: () => void;
};

export interface UserProfile {
  _id: string;
  email: string;
  username: string;
  phoneNumber: string;
  role: 'student' | 'landlord' | 'admin';
  __v: number;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const router = useRouter();
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      // Clean up invalid data
      localStorage.removeItem('userData');
    }
  }, []);

  const login = async (userData: User, callback?: () => void) => {
    try {
      const user: User = {
        email: userData.email,
        password: userData.password,
      };
      const res = await auth.loginUser(user);
      if (res.status) {
        Cookies.set('auth-token', res.data?.token || '', {
          expires: 30,
        });
        Cookies.set('role', res.data?.role || '', {
          expires: 30,
        });
        Cookies.set('user-id', res.data?.userId || '', {
          expires: 30,
        });
        localStorage.setItem('userData', JSON.stringify(res.data));
        setUser(res.data!);
        toast.success('Sign in successful');
        router.push('/apartments');
      } else {
        toast.error('Invalid Email or Password');
        if (callback) callback();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Invalid Email or Password');
      if (callback) callback();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    Cookies.remove('auth-token');
    router.replace('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
