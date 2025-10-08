import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiClient, { ensureCsrfCookie } from "../lib/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await apiClient.get("/api/user");
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt to restore session on mount
    (async () => {
      try {
        await ensureCsrfCookie();
      } catch {}
      await fetchUser();
    })();
  }, [fetchUser]);

  const login = useCallback(async (credentials) => {
    await ensureCsrfCookie();
    await apiClient.post("/login", credentials);
    await fetchUser();
  }, [fetchUser]);

  const register = useCallback(async (payload) => {
    await ensureCsrfCookie();
    await apiClient.post("/register", payload);
    await fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    await apiClient.post("/logout");
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout, refresh: fetchUser }), [user, loading, login, register, logout, fetchUser]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


