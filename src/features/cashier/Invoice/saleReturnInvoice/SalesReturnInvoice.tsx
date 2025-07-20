import { Download, Eye, Printer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAllSaleReturnInvoices } from '../../../../services/api/cashierApi/cashierApi';
import { useAllSaleReturnInvoices } from '../../Hooks/useGetAllSaleReturnInvoices';
import Loader from '../../../../components/ui/reusable/Loader';
type Invoice = {
  id: string;
  date: string;
  customer: string;
  total: string;
  payment: string;
  
};
type SaleReturnInvoiceProps={
  fullData :boolean | null;
  setFullData:React.Dispatch<React.SetStateAction<boolean | null >>;

  setSkipPage: React.Dispatch<React.SetStateAction<number | null >>;
  skipPage:number| null;

  takePage:number | null;
  setTakePage:React.Dispatch<React.SetStateAction<number | null >>;

}


const SalesReturnInvoice:React.FC<SaleReturnInvoiceProps> = ( {fullData,setFullData,skipPage,setSkipPage,takePage,setTakePage}) => {
 const {data,isLoading,error}=useAllSaleReturnInvoices(fullData,skipPage,takePage);

 
  if(isLoading)return<p><Loader/></p>
if(error)return <p>error while fetching..</p>



  return (
<div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-6">Invoice #</th>
              <th className="px-4 py-6">Date</th>
              <th className="px-4 py-6">Customer</th>
              <th className="px-4 py-6">Total</th>
              <th className="px-4 py-6">Payment</th>
         
              <th className="px-4 py-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((inv:any, idx:number) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-4 font-semibold text-blue-700">{inv.invoiceNumber}</td>
<td className="px-4 py-4">{new Date(inv.returnDate).toLocaleDateString()}</td>

                <td className="px-4 py-4">{inv.customerName}</td>
                <td className="px-4 py-4">{inv.totalAmount}</td>
                <td className="px-4 py-4">{inv.payment}</td>
                
                <td className="px-4 py-4 flex gap-4 items-center text-gray-600">
                  <Eye className="cursor-pointer w-5 h-5 hover:text-black" />
                  <Download className="cursor-pointer w-5 h-5 hover:text-black" />
                  <Printer className="cursor-pointer w-5 h-5 hover:text-black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default SalesReturnInvoice