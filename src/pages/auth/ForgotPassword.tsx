import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleGenerateOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Call your API to send OTP here
    console.log("Generating OTP for:", email);
  };

  return (
    <>
      <div className="p-6 space-y-4 sm:p-8">
        <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Forgot Password
        </p>
        <p className="text-sm text-gray-500">
          Enter your registered email to receive a one-time password (OTP).
        </p>

        {/* Email Input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* Generate OTP Button */}
        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
        >
          <Link to="/auth/verify-otp">Generate OTP</Link>
        </button>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
