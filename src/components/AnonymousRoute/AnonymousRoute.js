import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/ProvideAuth';
import routes from '../../routes';

const AnonymousRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Navigate to={routes.movies} replace /> : children;
};

export default AnonymousRoute;
