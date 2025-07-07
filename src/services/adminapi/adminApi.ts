import type { NewRole } from "../../features/admin/RoleModal";
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
  console.log(data);
  const response = await authClient.put("/User/update-user-role", data);
  console.log(response);
  return response.data;
};
export const deleteUser = async (userId: string) => {
  const response = await authClient.delete(`/User/soft-delete/${userId}`);
  console.log(response);
  return response.data;
};

export const getRolesAndPermissions = async () => {
  const response = await authClient.get(
    "/Role/organization-roles-with-permissions"
  );
  console.log(response);
  return response.data;
};

export const getAllPermissions = async () => {
  const response = await authClient.get("/Role/permissions");
  console.log(response);
  return response.data;
};
export const updateRoleAndPermissions = async (
  roleId: string,
  data: NewRole
) => {
  const response = await authClient.put(`/Role/update/${roleId}`, data);
  console.log(response);
  return response.data;
};

export const addRoleAndPermissions = async (data: NewRole) => {
  const response = await authClient.post(`/Role/add`, data);
  console.log(response);
  return response.data;
};
