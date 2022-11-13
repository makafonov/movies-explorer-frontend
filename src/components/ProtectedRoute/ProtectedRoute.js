import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/ProvideAuth';
import routes from '../../routes';

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkToken } = useAuth();

  useState(() => {
    if (loggedIn === null) {
      checkToken();
    }
  }, [loggedIn]);

  if (loggedIn === null) {
    return null;
  }

  return loggedIn ? children : <Navigate to={routes.home} replace />;
};

export default ProtectedRoute;
