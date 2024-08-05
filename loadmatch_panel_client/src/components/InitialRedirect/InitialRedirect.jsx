// components/InitialRedirect/InitialRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const InitialRedirect = ({ children }) => {
  const { isLoggedIn, loading, init } = useAuthStore();
  const navigate = useNavigate();
  console.log("was in initial redirect comp");

  useEffect(() => {
    const initializeAuth = async () => {
      await init();
    };

    initializeAuth();
  }, [init]);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  }, [loading, isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a more elaborate loading spinner
  }

  return <>{children}</>;
};

export default InitialRedirect;
