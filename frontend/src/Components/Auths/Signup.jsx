import React, { useState } from "react";
import logo from "../../assets/logo192.png"; // Replace with your logo path
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({}); // Object to hold field-specific errors

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  // Frontend validation function
  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = "userName is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d+$/.test(phone)) newErrors.phone = "Phone number must contain only digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const res = await register({ userName, phone, email, password }).unwrap();
      if (!res.data) {
        setErrors({ apiError: res.message }); // API-specific error
        return;
      }
      setErrors({});
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (err) {
      setErrors({ apiError: err.message || err.error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="React Logo" className="w-16 h-16" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-xl font-bold text-blue-500 mb-6">
          Register New User
        </h1>

        {/* Error Alert */}
        {errors.apiError && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
            {errors.apiError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className={`w-full border ${
                errors.userName ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone:</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter your phone number"
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
