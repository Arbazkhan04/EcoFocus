import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import EmailVerification from './Components/Auths/VerifyEmail';
import ResetPassword from './Components/Auths/ResetPassword';


function App() {
  return (
    <div className="bg-background-Default">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Allow nested routes under Dashboard */}
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
