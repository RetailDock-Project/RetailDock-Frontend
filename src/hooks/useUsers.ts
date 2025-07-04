import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/adminapi/adminApi";

interface UseUsersParams {
  search?: string | null;
  roleId?: string | null;
}

export const useUsers = (params: UseUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};
