import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []); 

  
  const loginAuth = (userData, authToken) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setCurrentUser(userData);
  };

  const logoutAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setCurrentUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, loginAuth, logoutAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};