import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
