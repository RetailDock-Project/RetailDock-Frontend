import { useQuery } from "@tanstack/react-query";
import { getAllHsnCode } from "../services/api/inventoryapi/inventoryApi";

export const useHsn = () => {
  return useQuery({
    queryKey: ["hsnCodes"],
    queryFn: () => getAllHsnCode(),
    select:(data)=>data.data
  });
};
