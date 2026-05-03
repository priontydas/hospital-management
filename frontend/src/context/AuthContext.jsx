import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./auth-context";
import { API_BASE_URL, getAuthHeaders } from "../lib/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(Boolean(token));

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setAuthLoading(false);
  }, []);

  const refreshAuth = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      logout();
      return null;
    }

    setAuthLoading(true);

    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/user/profile`, {
        headers: getAuthHeaders(storedToken),
      });

      if (!data.success || !data.user) {
        logout();
        return null;
      }

      localStorage.setItem(TOKEN_KEY, storedToken);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(storedToken);
      setUser(data.user);
      return data.user;
    } catch {
      logout();
      return null;
    } finally {
      setAuthLoading(false);
    }
  }, [logout]);

  const login = useCallback(async ({ token: nextToken, user: nextUser }) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);

    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }

    await refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setAuthLoading(false);
      return;
    }

    refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    const handleStorage = () => {
      const nextToken = localStorage.getItem(TOKEN_KEY);
      const nextUser = localStorage.getItem(USER_KEY);

      setToken(nextToken);
      try {
        setUser(nextUser ? JSON.parse(nextUser) : null);
      } catch {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const value = {
    authLoading,
    isAuthenticated: Boolean(token && user),
    login,
    logout,
    refreshAuth,
    token,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
