
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
