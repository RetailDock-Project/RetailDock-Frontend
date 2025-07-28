import { useQuery } from "@tanstack/react-query"
import {  getSaleReturnByInvoiceNumber } from "../../../services/api/cashierApi/cashierApi"

export const useSaleReturnInvoiceInfo=(invoice?:string|undefined)=>{
    return useQuery({
       queryKey:['invoices',invoice] ,
       queryFn:()=>getSaleReturnByInvoiceNumber(invoice),
       select:(data)=>data.data,
       enabled:!!invoice
    });
}