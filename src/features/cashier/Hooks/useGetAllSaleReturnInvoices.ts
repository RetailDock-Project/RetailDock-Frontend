import { useQuery } from "@tanstack/react-query";
import { getAllSaleReturnInvoices } from "../../../services/api/cashierApi/cashierApi";

export const useAllSaleReturnInvoices = (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  return useQuery({
    queryKey: ["allSaleInvoices", fullData, skip, take],
    queryFn: () => getAllSaleReturnInvoices(fullData, skip, take),
    select: (data) => data.data,
   
  });
};
