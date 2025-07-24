import developerClient from "./developerClient";

export const getLast7MonthOrgRegistrations = async () => {
  const { data } = await developerClient.get(`/Organization/signup-chart`);
  return data;
};

export const getLast7MonthIncome = async () => {
  const { data } = await developerClient.get(`/Organization/revenue-chart`);
  return data;
};

export const getAccountsStatusSummary = async () => {
  const { data } =
    await developerClient.get(`/Organization/organization/status/summery
`);
  return data;
};

export const getDashboardSummary = async () => {
  const { data } = await developerClient.get(`/Organization/dashboard/summary
`);
  return data;
};

export const addOrganizationAndSubscription = async (id: any, orgData: any) => {
  const { data } = await developerClient.post(
    `/Organization/subscription/add?userId=${id}`,
    orgData
  );
  return data;
};

export const getFilteredOrganizations = async (
  search?: string,
  status?: string
) => {
  const { data } = await developerClient.get("/Organization/get-filter", {
    params: { search, status },
  });

  return data;
};

export const getOrganizationDatailById = async (id: any) => {
  const { data } = await developerClient.get(`/Organization/${id}/details
`);
  return data;
};

export const blockOrUnblockOrg = async (id: any) => {
  const { data } = await developerClient.patch(
    `/Organization/${id}/block-unblock
`
  );
  return data;
};
