import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [agentDetail, setAgentDetail] = useLocalStorage("agentDetail", null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  function logOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("agentDetail")) {
      localStorage.removeItem("agentDetail");
    }
    setIsLoggedIn(false);
    setToken(null);
    setAgentDetail(null);
  }

  return (
    <AuthContext.Provider
      value={{
        setToken,
        token,
        agentDetail,
        setAgentDetail,
        isLoggedIn,
        setIsLoggedIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
