import { useQuery } from "@tanstack/react-query"
import { getSaleReturnDetailsByDate } from "../../../services/api/cashierApi/cashierApi"


export const useGetsaleReturnDetailsByDate=(
  fromDate: Date | null,
  toDate: Date | null,
   isFullData: boolean | null,
)=>{
    return useQuery({
        queryKey:["saleReturnByDate",fromDate,toDate,isFullData],
        queryFn:()=>getSaleReturnDetailsByDate(fromDate,toDate,isFullData),
        select:(data)=>data.data,
        enabled:true

    })
}