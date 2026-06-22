import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

/**
 * Wraps any route that requires authentication.
 * If the user is not logged in, redirects to /login
 * and saves the intended destination so we can redirect after login.
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);
  const location = useLocation();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
