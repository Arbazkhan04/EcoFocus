import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import EmailVerification from './Components/Auths/VerifyEmail';
import ResetPassword from './Components/Auths/ResetPassword';
import ProtectedRoute from './Components/Common/protectedRoute';
import Unauthorized from './Components/Common/Unauthorized';

function App() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="bg-background-Default">
      <Router>
        <Routes>
          {/* Redirect Logic Based on Login Status */}
          {userInfo ? (
            userInfo.isEmailVerified ? (
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            ) : (
              <Route path="*" element={<Navigate to="/verify-email" replace />} />
            )
          ) : (
            <>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              {/* Catch-all to redirect unauthenticated users */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute hasAccess={userInfo && userInfo.isEmailVerified}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Email Verification */}
          <Route path="/verify-email" element={<EmailVerification />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
