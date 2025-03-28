import { createContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      logout();
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      fetchUserData();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    const { token } = response.data;

    localStorage.setItem("token", token);
    setUser(userData);

    // ✅ Fetch and store user preferences
    const preferencesResponse = await api.get("/user/preferences");
    setUserPreferences(preferencesResponse.data);

    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed", error);
  }
};


export default AuthContext;
