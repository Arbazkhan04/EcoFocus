import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, hasAccess }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.isEmailVerified === false) {
      navigate("/verify-email");
    } else if (!hasAccess) {
      navigate("/unauthorized");
    }
  }, [userInfo, hasAccess, navigate]);

  // If conditions above pass, render children
  if (!userInfo || userInfo.isEmailVerified === false || !hasAccess) {
    return null; // Prevent rendering if redirection happens
  }

  return children;
};

export default ProtectedRoute;
