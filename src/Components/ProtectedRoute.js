import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'cookie-universal';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const cookie = Cookie();
  
  const user = cookie.get('educational-user');
  const token = cookie.get('educational-token');

  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userData = typeof user === 'string' ? JSON.parse(user) : user;

 
  if (adminOnly && userData.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}