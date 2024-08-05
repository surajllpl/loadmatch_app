import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, children }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return Component ? <Component /> : children;
};

export default ProtectedRoute;
