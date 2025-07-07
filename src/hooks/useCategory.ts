import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/api/inventoryapi/inventoryApi";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getAllCategories(),
    select: (data) => data.data,
  });
};
