// hooks/usePurchases.ts

import { useQuery } from "@tanstack/react-query";
import {
  getPurchasesWithFilter,
  type GetPurchasesParams,
} from "../services/api/inventoryapi/inventoryApi";

export const usePurchases = (params: GetPurchasesParams) => {
  return useQuery({
    queryKey: ["purchases", params],
    queryFn: () => getPurchasesWithFilter(params),
    enabled: !!params, // avoid running with undefined
    select: (data) => data.data, // if API returns { data: [...] }
  });
};
