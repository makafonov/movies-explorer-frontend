import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/ProvideAuth';
import routes from '../../routes';

const GuestRoute = ({ children }) => {
  const { loggedIn, checkToken } = useAuth();

  useEffect(() => {
    if (loggedIn === null) {
      checkToken();
    }
  }, [loggedIn, checkToken]);

  if (loggedIn === null) {
    return null;
  }

  return loggedIn ? <Navigate to={routes.movies} replace /> : children;
};

export default GuestRoute;
