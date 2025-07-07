import { useQuery } from "@tanstack/react-query";
import { getAllUnits } from "../services/api/inventoryapi/inventoryApi";

export const useUnits = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUnits(),
  });
};
