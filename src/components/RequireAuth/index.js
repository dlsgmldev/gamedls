import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "3") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
