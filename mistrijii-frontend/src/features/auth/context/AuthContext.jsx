import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mj_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Check expiry
        if (payload.exp && Date.now() / 1000 > payload.exp) {
          localStorage.removeItem("mj_token");
          setUser(null);
        } else {
          setUser({ email: payload.sub, token });
        }
      } catch {
        localStorage.removeItem("mj_token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("mj_token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ email: payload.sub, token });
  };

  const logout = () => {
    localStorage.removeItem("mj_token");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("mj_token");

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isAdmin: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};