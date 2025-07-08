import cashierClient from "./cashierClient";

export const getRoles = async () => {
  const response = await cashierClient.get("/Role/organization-roles");
  console.log(response);
  return response.data;
};