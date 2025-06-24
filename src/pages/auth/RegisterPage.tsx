import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom"; // Add this if you're using React Router

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </p>
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your name
          </label>
          <input
            placeholder="joy samuel"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            id="name"
            type="name"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            placeholder="example@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            id="email"
            type="email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10"
              placeholder="••••••••"
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

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
          type="submit"
        >
          Create an account
        </button>

        {/* Already have an account */}
        <p className="text-sm font-light text-gray-500 text-center">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
