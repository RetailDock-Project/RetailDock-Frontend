import { useQuery } from "@tanstack/react-query"
import { getSaleReturnInvoiceNumber } from "../../../services/api/cashierApi/cashierApi"

export const useSaleReturnInvoice=(saleMode:string | undefined)=>{
   saleMode= saleMode??"B2C"
  return  useQuery({
        queryKey:["saleReturnInvoice",saleMode],
        queryFn:()=>getSaleReturnInvoiceNumber(saleMode),
        select:(data)=>data.data,
         enabled: !!saleMode,
    })
}