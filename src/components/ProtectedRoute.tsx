import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back to their original page
    // after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route is for admins only, check the user role
  if (adminOnly && user?.role !== 'admin') {
    // Redirect to a general dashboard or an unauthorized page
    return <Navigate to="/dashboard/client" replace />;
  }

  return children;
};

export default ProtectedRoute;
