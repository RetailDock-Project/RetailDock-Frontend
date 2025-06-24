import React from "react";
import { useSearchParams } from "react-router-dom";

const EmailVerificationStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h1
        className={`text-2xl font-bold ${
          isSuccess ? "text-green-600" : "text-red-600"
        }`}
      >
        {isSuccess
          ? "Email Verified Successfully!"
          : "Email Verification Failed"}
      </h1>
      <p className="text-gray-700 mt-4">
        {isSuccess
          ? "Your email has been verified. You can now log in."
          : "The verification link is invalid, expired, or already used."}
      </p>
      <a
        href="/auth/login"
        className="inline-block mt-6 px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </a>
    </div>
  );
};

export default EmailVerificationStatus;
