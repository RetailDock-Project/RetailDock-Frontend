import {  useQuery } from "@tanstack/react-query"
import { getUserSaleReturnDetails } from "../../../services/api/cashierApi/cashierApi";

export const useSaleReturnDetails = (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  return useQuery({
    queryKey: ["saleReturnDetails", fullData, skip, take],
    queryFn: () => getUserSaleReturnDetails(fullData, skip, take),
    enabled: fullData !== null, // prevent auto-call if fullData is not passed
  });
};