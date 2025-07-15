import { Download, Eye, Printer } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllSaleInvoices } from '../../../../services/api/cashierApi/cashierApi';
type Invoice = {
  id: string;
  date: string;
  customer: string;
  total: string;
  payment: string;
 
};
type SalesInvoiceProps={
  fullData :boolean | null;
  setFullData:React.Dispatch<React.SetStateAction<boolean | null >>;

  setSkipPage: React.Dispatch<React.SetStateAction<number | null >>;
  skipPage:number| null;

  takePage:number | null;
  setTakePage:React.Dispatch<React.SetStateAction<number | null >>;

}

const invoices: Invoice[] = [
  {
    id: "INV-1001",
    date: "2024-05-20",
    customer: "Walk-in",
    total: "₹14,997",
    payment: "Card",
  
  },
  {
    id: "INV-1002",
    date: "2024-05-20",
    customer: "John Smith",
    total: "₹4,497",
    payment: "Cash",
  
  },
  {
    id: "INV-1003",
    date: "2024-05-19",
    customer: "Priya Patel",
    total: "₹18,997",
    payment: "Card",
  
  },
  {
    id: "INV-1004",
    date: "2024-05-19",
    customer: "Rahul Sharma",
    total: "₹3,499",
    payment: "UPI",
  
  },
];

const SalesInvoice:React.FC<SalesInvoiceProps> = ( {fullData,setFullData,skipPage,setSkipPage,takePage,setTakePage}) => 
  {
const [saleInvoice,setSaleInvoice]=useState<any>();

  useEffect(() => {
  const fetchAllSaleInvoice = async () => {
    try {
      const response = await getAllSaleInvoices(fullData, skipPage , takePage);
      setSaleInvoice(response.data.data);
    } catch (error) {
      console.log(error, 'error from getall saleInvoice');
    }
  };

  fetchAllSaleInvoice();
}, [fullData, skipPage, takePage]);

  const navigate=useNavigate()
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-6">Invoice #</th>
              <th className="px-4 py-6">Date</th>
              <th className="px-4 py-6">Customer</th>
              <th className="px-4 py-6">Total</th>
              <th className="px-4 py-6">pendingAmount</th>
              <th className="px-4 py-6">Actions</th>
            </tr>
          </thead>
          <tbody>
  {saleInvoice?.map((inv: any, idx: number) => (
    <tr key={idx} className="border-t">
      <td className="px-4 py-4 font-semibold text-blue-700">{inv.invoiceNumber}</td>
      <td className="px-4 py-4">{new Date(inv.saleDate).toLocaleDateString()}</td>
      <td className="px-4 py-4">{inv.customerName}</td>
      <td className="px-4 py-4">₹{inv.totalAmount}</td>
      <td className="px-4 py-4">{inv.pendingAmount?? "-"}</td>

      <td className="px-4 py-4 flex gap-4 items-center text-gray-600">
        <button onClick={() => navigate(`/home/cashier/invoice/details/${inv.invoiceNumber}`)}>
          <Eye className="cursor-pointer w-5 h-5 hover:text-black" />
        </button>
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

export default SalesInvoice