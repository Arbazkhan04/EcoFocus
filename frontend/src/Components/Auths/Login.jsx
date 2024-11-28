import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo192.png"; // Replace with the correct path
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { forgotPassword } from '../../apiManager/auth/authorization';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errors, setErrors] = useState({}); // State for validation errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [forgotEmail, setForgotEmail] = useState(""); // Email for forgot password
  const [forgotError, setForgotError] = useState(""); // Error for forgot password
  const [forgotSuccess, setForgotSuccess] = useState(""); // Success message for forgot password
  const [isForgotLoading, setIsForgotLoading] = useState(false); // Loading state for forgot password

  const validateInputs = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop if validation fails

    try {
      const res = await login({ email, password }).unwrap();
      if (!res.data) {
        setErrors({ apiError: res.message }); // API-specific error
        return;
      }
      dispatch(setCredentials({ ...res }));
      navigate("/verify-email"); // Redirect on successful login
    } catch (err) {
      setErrors({ apiError: err.message || "An error occurred during login." });
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError("Invalid email format.");
      return;
    }

    setForgotError("");
    setForgotSuccess("");
    setIsForgotLoading(true);

    try {
      const res = await forgotPassword(forgotEmail); // API call
      if (!res.data) {
        setForgotError(res.message); // Show error from backend
        return;
      }
      setForgotSuccess(res.message); // Show success message from backend
    } catch (error) {
      setForgotError(
        error.message || "An error occurred while resetting the password. Please try again."
      );
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup"); // Redirect to register page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="React Logo" className="w-16 h-16" />
          <h1 className="ms-5">React</h1>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-500 mb-6">Logg inn</h1>
        </div>

        {/* Error Messages */}
        {errors.apiError && (
          <p className="text-red-500 text-center mb-4">{errors.apiError}</p>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Epost:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Passord:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsModalOpen(true)} // Open modal
              className="text-blue-500 underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Logg inn"}
          </button>
        </form>

        {/* Register Button */}
        <div className="mt-4">
          <button
            onClick={handleRegisterClick}
            className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600"
          >
            Opprett ny bruker
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <label className="block text-gray-700 font-medium mb-1">
              Enter your email:
            </label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                forgotError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {forgotError && (
              <p className="text-red-500 text-sm mt-1">{forgotError}</p>
            )}
            {forgotSuccess && (
              <p className="text-green-500 text-sm mt-1">{forgotSuccess}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  isForgotLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isForgotLoading}
              >
                {isForgotLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
