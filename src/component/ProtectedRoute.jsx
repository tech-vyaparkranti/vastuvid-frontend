import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // could render a spinner
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export default ProtectedRoute;


