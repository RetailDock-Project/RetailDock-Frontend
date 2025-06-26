import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordOtp } from "../../services/api/authApi";
import toast from "react-hot-toast";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGenerateOTP = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPasswordOtp({ email });
      console.log("OTP sent successfully:", response);
      toast.success(response?.message);
      navigate("/auth/verify-otp", { state: { email } });
    } catch (error: any) {
      console.error("Failed to send OTP", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        disabled={isLoading}
        onClick={handleGenerateOTP}
        className={`w-full  ${
          isLoading ? "bg-blue-300" : "bg-blue-900"
        } hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white`}
      >
        Generate OTP
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
