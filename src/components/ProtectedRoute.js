import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn }) =>
  loggedIn ? children : <Navigate to='/signin' />;

export default ProtectedRoute;
