import React, { useRef, useState } from "react";

const VerifyOtpPage: React.FC = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otpValues, setOtpValues] = useState<string[]>(new Array(6).fill(""));

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }
    console.log("Verifying OTP:", otp);
    // Call your backend API here
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    // Call your resend API here
  };

  return (
    <>
      {/* OTP Box */}
      <div className="w-full bg-white rounded-lg sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <p className="text-xl font-bold text-gray-900 md:text-2xl">
            Verify OTP
          </p>
          <p className="text-sm text-gray-500">
            Enter the 6-digit OTP sent to your email.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between space-x-2">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-sm-12 h-sm-12 w-8 h-8 text-center text-xl border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Verify OTP
          </button>

          {/* Resend */}
          <p className="text-sm text-center text-gray-500 mt-2">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-blue-700 hover:underline font-medium"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;
