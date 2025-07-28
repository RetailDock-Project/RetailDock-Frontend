import { useQuery } from "@tanstack/react-query";
import { getAllSaleInvoices } from "../../../services/api/cashierApi/cashierApi";


export const useAllSaleInvoices = (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  return useQuery({
    queryKey: ["allSaleInvoices", fullData, skip, take],
    queryFn: () => getAllSaleInvoices(fullData, skip, take),
    select: (data) => data.data,
  });
};
