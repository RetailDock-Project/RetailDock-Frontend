import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../services/api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSice";

// Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email cannot be longer than 50 characters")
    .email("Invalid email address format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email cannot contain spaces"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot be longer than 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data); // call your API
      toast.success(response?.message);
      dispatch(login());
      navigate("/home");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
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
          placeholder="example@gmail.com"
          {...register("email")}
          className={`bg-gray-50 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className={`bg-gray-50 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <Link
          to="/auth/forgot-password"
          className="text-sm text-blue-700 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
        onClick={handleSubmit(onSubmit)}
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
  );
};

export default LoginPage;
