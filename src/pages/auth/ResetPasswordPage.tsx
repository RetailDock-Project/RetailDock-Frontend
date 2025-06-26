import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPassword } from "../../services/api/authApi";
import toast from "react-hot-toast";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email ?? null;
  const otp = location.state?.otp ?? null;
  console.log(email, otp);
  useEffect(() => {
    if (!email || !otp) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      console.log("Resetting password to:", newPassword);
      const response = await ResetPassword({
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success(response?.message);
      navigate("/auth/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {/* Box */}
      <div className="w-full bg-white rounded-lg sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <p className="text-xl font-bold text-gray-900 md:text-2xl">
            Reset Password
          </p>
          <p className="text-sm text-gray-500">
            Enter your new password below.
          </p>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            onClick={handleResetPassword}
            className="w-full bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
