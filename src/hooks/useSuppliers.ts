import { useQuery } from "@tanstack/react-query";
import {
  getSupplierWithFilters,
  type SupplierFilterParams,
} from "../services/api/inventoryapi/inventoryApi";

export const useSuppliers = (params: SupplierFilterParams) => {
  return useQuery({
    queryKey: ["suppliers", params], // <== track params
    queryFn: () => getSupplierWithFilters(params),
    select: (data) => data.data,
  });
};
