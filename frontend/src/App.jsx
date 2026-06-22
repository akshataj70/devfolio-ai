import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';

import LandingPage      from './pages/LandingPage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import Dashboard        from './pages/Dashboard';
import ResumeBuilder    from './pages/ResumeBuilder';
import PortfolioBuilder from './pages/PortfolioBuilder';
import Projects         from './pages/Projects';
import Settings         from './pages/Settings';
import ProtectedRoute   from './components/auth/ProtectedRoute';

function App() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <ThemeProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            },
          }}
        />
        <Routes>
          {/* ── Public ── */}
          <Route path="/"      element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ── Protected ── */}
          <Route
            path="/resume-builder"
            element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>}
          />
          <Route
            path="/portfolio-builder"
            element={<ProtectedRoute><PortfolioBuilder /></ProtectedRoute>}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute><Settings /></ProtectedRoute>}
          />

          {/* ── Legacy redirects (keep old deep-links working) ── */}
          <Route path="/builder"   element={<Navigate to="/resume-builder"    replace />} />
          <Route path="/portfolio" element={<Navigate to="/portfolio-builder" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;