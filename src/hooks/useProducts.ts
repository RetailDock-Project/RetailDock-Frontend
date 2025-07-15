import { useQuery } from "@tanstack/react-query";
import { getProductsFilters } from "../services/api/inventoryapi/inventoryApi";

export type ProductFilterParams = {
  search?: string | null;
  categoryId?: number | null;
  stockStatus?: string | null;
};

export const useProducts = (filters: ProductFilterParams = {}) => {
  return useQuery({
    queryKey: ["filteredProducts", filters],
    queryFn: () => getProductsFilters(filters),
    select: (data) => data.data,
  });
};

