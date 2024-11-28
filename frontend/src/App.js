import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  return (
    <div className="bg-background-Default">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Allow nested routes under Dashboard */}
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
