import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import AuthLayout from "../layouts/AuthLayout";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import EmailVerificationStatus from "../features/auth/components/EmailVerificationStatus";
import MainLayout from "../layouts/MainLayout";

const PageRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="email-verification-status"
            element={<EmailVerificationStatus />}
          />
        </Route>
        <Route path="home" element={<MainLayout />}></Route>
      </Route>
    </Routes>
  );
};

export default PageRoutes;
