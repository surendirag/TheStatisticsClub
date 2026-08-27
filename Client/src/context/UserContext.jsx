import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← wait before rendering

  // check cookie on every page load
  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(data); // cookie valid → restore user
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return 'Loading...'; // prevent flash of wrong UI

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}