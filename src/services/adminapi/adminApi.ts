import authClient from "../api/authClient";

interface GetUsersParams {
  search?: string | null;
  roleId?: string | null;
}

interface UpdateUserRolePayload {
  userId: string;
  newRoleId: string;
}

export const getUsers = async (data: GetUsersParams) => {
  const response = await authClient.get("/User/filtered-users", {
    params: data,
  });
  console.log(response);
  return response.data;
};

export const getRoles = async () => {
  const response = await authClient.get("/Role/organization-roles");
  console.log(response);
  return response.data;
};

export const getUsersStats = async () => {
  const response = await authClient.get("/User/users-stats");
  console.log(response);
  return response.data;
};

export const updateUser = async (data: UpdateUserRolePayload) => {
  const response = await authClient.post("/User/update-user-role", data);
  console.log(response);
  return response.data;
};
