import React, { useState } from "react";
import { useSelector } from "react-redux";
import { verifycode, resendVerificationCode } from "../../apiManager/auth/authorization";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6-box code input
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const email = useSelector((state) => state.auth.userInfo.email); // Get email from Redux

  // Handle input changes
  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // Handle Submit Verification
  const handleSubmit = async () => {
    const verificationCode = code.join(""); // Join the code into a single string
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await verifycode(email, verificationCode); // API call
      if (response.data) {
        setSuccess("Email verified successfully!");
        setCode(["", "", "", "", "", ""]); // Clear the input boxes
      } else {
        setError(response.message || "Invalid verification code.");
      }
    } catch (err) {
      setError("An error occurred while verifying the code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend Verification Code
  const handleResend = async () => {
    setIsLoading(true);
    try {
        const response = await resendVerificationCode(email); // API call
        if (response.data) {
            setSuccess("Verification code has been resent successfully!");
        } else {
            setError(response.message);
        }
    } catch (error) {
        setError("An error occurred while resending the code. Please try again.");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        <h1 className="text-center text-xl font-bold text-blue-500 mb-4">
          Verify Your Email
        </h1>

        <p className="text-gray-600 mb-4">
          A 6-digit verification code has been sent to your email address:{" "}
          <span className="font-bold">{email}</span>. Please enter it below to
          verify your email. The code will expire in 2 minutes.
        </p>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <button
          onClick={handleResend}
          className="w-full mt-4 py-2 rounded border hover:bg-blue-100 text-blue-500"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;