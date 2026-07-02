import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
