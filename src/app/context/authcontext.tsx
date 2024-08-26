"use client";

import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtToken } from "../services/auth";

interface IUser {
  id: number;
  token: string;
  success: boolean;
  role: number;
  full_name: string;
}

interface IAuthContext {
  authChecked: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  login: (access: string, redirect?: boolean) => Promise<void> | void;
  logout: () => void;
  CURRENT_USER_TYPE: number | null;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [CURRENT_USER_TYPE, setCURRENT_USER_TYPE] = useState<number | null>(
    null
  );

  const router = useRouter();
  const auth = new jwtToken();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      login(token, false);
    }
    setAuthChecked(true);
  }, []);

  const login = async (access: string, redirect = true) => {
    if (access) {
      const userData = await auth.valid(access);
      setUser(userData);
      setCURRENT_USER_TYPE(userData.role);
      setIsAuthenticated(true);
      if (redirect) {
        Cookies.set("token", access);
        if (userData?.role === 1) {
          return router.push("/dashboard");
        } else {
          return router.push("/userdashboard");
        }
      }
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/login");
    router.refresh();
  };

  const value: IAuthContext = {
    authChecked,
    isAuthenticated,
    user,
    login,
    logout,
    CURRENT_USER_TYPE,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
