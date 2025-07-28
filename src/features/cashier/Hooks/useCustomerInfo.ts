import { useQuery } from "@tanstack/react-query"
import { getCustomerByMobile } from "../../../services/api/cashierApi/cashierApi"


export const useCustomerInfo=(mobile:string)=>{
    return useQuery({
        queryKey:['mobile',mobile],
        queryFn:()=>getCustomerByMobile(mobile),
        enabled:!!mobile,
        select:(data)=>data.data

    })
}