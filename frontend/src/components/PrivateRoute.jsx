import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import LineLoader from './LineLoader';
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <LineLoader />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
