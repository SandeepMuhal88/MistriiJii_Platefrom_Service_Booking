import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parse JWT token from localstorage to simulate logged-in user state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode JWT slightly to get user info if we wanted, or just assume logged in
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ email: payload.sub });
      } catch (e) {
        setUser(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ email: payload.sub });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};