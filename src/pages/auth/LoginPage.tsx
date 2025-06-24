import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom"; // Only if using React Router

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Login to your account
        </p>

        {/* Email Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-blue-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm font-light text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-blue-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
