
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'farmer';
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/landing" replace />;
  }

  // Role-based route protection
  const currentPath = location.pathname;
  
  // Youth routes - only accessible by youth users
  if (currentPath.startsWith('/youth') && userRole !== 'youth') {
    return <Navigate to={userRole === 'investor' ? '/investor' : '/dashboard'} replace />;
  }
  
  // Investor routes - only accessible by investor users
  if (currentPath.startsWith('/investor') && userRole !== 'investor') {
    return <Navigate to={userRole === 'youth' ? '/youth' : '/dashboard'} replace />;
  }
  
  // Farmer routes - accessible by farmers, but redirect youth/investors to their dashboards
  const farmerRoutes = ['/dashboard', '/weather', '/crops', '/marketplace', '/transport', '/machinery', '/storage', '/knowledge', '/settings'];
  if (farmerRoutes.includes(currentPath) && userRole !== 'farmer') {
    return <Navigate to={userRole === 'youth' ? '/youth' : '/investor'} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
