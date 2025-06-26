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
