// src/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './apiSlice';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Listen for 401 errors that might occur after initial authentication
  useEffect(() => {
    const handleUnauthorized = (event) => {
      // Check if the error is from our API and is a 401
      if (event.detail?.status === 401 && event.detail?.source === 'api') {
        dispatch(logout());
        navigate('/login');
      }
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [dispatch, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
