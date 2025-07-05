import authClient from "./authClient";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswordOtpPayload {
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}
interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

// Register User
export const registerUser = async (data: RegisterPayload) => {
  const response = await authClient.post("/Auth/register", data);
  return response.data;
};

// Login User
export const loginUser = async (data: LoginPayload) => {
  const response = await authClient.post("/Auth/login", data);
  return response.data;
};

export const forgotPasswordOtp = async (data: ForgotPasswordOtpPayload) => {
  const response = await authClient.post("/Auth/request-otp", data);
  return response.data;
};

export const VerifyOtp = async (data: VerifyOtpPayload) => {
  const response = await authClient.post("/Auth/verify-otp", data);
  return response.data;
};

export const ResetPassword = async (data: ResetPasswordPayload) => {
  const response = await authClient.post("/Auth/reset-password", data);
  return response.data;
};

export const UserInfo = async () => {
  const response = await authClient.get("/Auth/me");
  console.log(response);
  return response.data;
};
