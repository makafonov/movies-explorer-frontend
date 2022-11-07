import { Navigate } from 'react-router-dom';

import routes from '../../routes';

const AnonymousRoute = ({ children, loggedIn }) =>
  loggedIn ? <Navigate to={routes.movies} replace /> : children;

export default AnonymousRoute;
