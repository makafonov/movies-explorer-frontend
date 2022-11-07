import { Navigate } from 'react-router-dom';

import routes from '../routes';

const ProtectedRoute = ({ children, loggedIn }) =>
  loggedIn ? children : <Navigate to={routes.home} replace />;

export default ProtectedRoute;
