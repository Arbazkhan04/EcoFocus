import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import EmailVerification from './Components/Auths/VerifyEmail';
import ResetPassword from './Components/Auths/ResetPassword';
import ProtectedRoute from './Components/Common/protectedRoute';
import { useSelector } from 'react-redux';
import Unauthorized from './Components/Common/Unauthorized';


function App() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="bg-background-Default">
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* public routes end routes */}

          {/* protected routes */}
          {/* Allow nested routes under Dashboard */}
          <Route path="/dashboard/*" element={ <ProtectedRoute hasAccess={userInfo ? true:false}><DashboardPage /></ProtectedRoute>} />
          {/* protected-route end */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
