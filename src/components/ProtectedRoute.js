// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = sessionStorage.getItem('userRole');

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
