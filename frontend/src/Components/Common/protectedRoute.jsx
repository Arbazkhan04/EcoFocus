import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, hasAccess }) => {
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
