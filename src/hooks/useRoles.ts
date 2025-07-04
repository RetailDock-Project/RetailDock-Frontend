import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../services/adminapi/adminApi";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });
};
