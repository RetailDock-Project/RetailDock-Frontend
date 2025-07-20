import { useQuery } from "@tanstack/react-query"
import { getSaleInvoiceDetails } from "../../../services/api/cashierApi/cashierApi"

export const useSaleInvoiceInfo=(invoice?:string|undefined)=>{
    return useQuery({
       queryKey:['invoices',invoice] ,
       queryFn:()=>getSaleInvoiceDetails(invoice),
       select:(data)=>data.data,
       enabled:!!invoice
    });
}