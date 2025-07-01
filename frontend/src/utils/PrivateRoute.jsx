import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!token) return <Navigate to="/signin" state={{ from: location }} replace />;
  return children;
};

export default PrivateRoute; 