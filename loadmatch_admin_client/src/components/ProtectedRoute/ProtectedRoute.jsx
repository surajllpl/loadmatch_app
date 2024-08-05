import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, children }) => {
  const isAuthenticated = localStorage.getItem("token");
  console.log(isAuthenticated);
  if (isAuthenticated !== null) {
    return Component ? <Component /> : children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
