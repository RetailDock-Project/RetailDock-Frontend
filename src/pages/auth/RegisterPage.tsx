import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/api/authApi";
import toast from "react-hot-toast";

// ✅ Zod schema for registration validation
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(30, "Name cannot be longer than 30 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .max(100, "Email cannot be longer than 100 characters")
      .email("Invalid email address format")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email cannot contain spaces"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot be longer than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await registerUser(data);
      console.log("Registered:", response);
      toast.success(response?.message);
      // Optionally navigate or show toast
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Create an account
      </p>

      {/* Name */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900">
          Your name
        </label>
        <input
          {...register("name")}
          placeholder="Joy Samuel"
          className={`bg-gray-50 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
          id="name"
          type="text"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mt-0">
        <label className="block mb-1 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          {...register("email")}
          placeholder="example@gmail.com"
          className={`bg-gray-50 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
          id="email"
          type="email"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            className={`bg-gray-50 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10`}
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
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900">
          Confirm password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className={`bg-gray-50 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-10`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit(onSubmit)}
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
  );
};

export default RegisterPage;
