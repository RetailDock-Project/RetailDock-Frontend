import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { downloadSaleInvoice, getSaleListByDate } from "../../../services/api/cashierApi/cashierApi";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../../components/ui/reusable/Loader";
import { useNavigate } from "react-router-dom";
import { Download, Eye } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { downloadExcelFile } from "../../../utils/downloadExcel";

type Salessaleurn = {
  saleurnId: string;
  createdBy: string;
  createdAt: string;
  purchaseId: string;
  invoiceNumber: string;
  SalesDate: string;
 Customer: string;
  gst: string;
  saleurnDate: string;

  reason: string;
  itemCount: number;
  unitCount: number;
  totalValue: number;
};
type saleListProps={
  searchTerm:string;
  fromDate:Date | null;
  toDate : Date | null;

}


const SalesList: React.FC<saleListProps>= ({fromDate,toDate,searchTerm}) => {
  const [skipPage,setSkipPage]=useState<number |null> (null);
  const [takePage,setTakePage]=useState<number |null> (null);

  const navigate=useNavigate()
  const useGetAllSaleListByDate=(

)=>{
  return useQuery({
    queryKey:["getSaleByDate",fromDate,toDate,skipPage,takePage],
    queryFn:()=>getSaleListByDate(fromDate,toDate,false,skipPage,takePage),
    select:(data)=>data.data,
    enabled:true
  })
}


const downloadInvoice= async (invoiceNum:string)=>{
 await downloadExcelFile(()=>downloadSaleInvoice(invoiceNum),`SaleOnvoice${invoiceNum}.Pdf`)
}

const {data,isLoading} =useGetAllSaleListByDate();
  const filteredData = data?.filter((sale: any) => {
    const search = searchTerm.toLowerCase();
  return (
      sale.customerName?.toLowerCase().includes(search) ||
      sale.invoiceNumber?.toLowerCase().includes(search) 
     
    );
  });

  if (isLoading) return <Loader />;
  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📋 Sales  List</h2>
      <table className="min-w-[1200px] w-full  text-sm border">
        <thead className="bg-gray-100">
          <tr>
               <th className="p-3 border text-left">Sale Date</th>
            <th className="p-3 border text-left">Sales Details</th>
         
            <th className="p-3 border text-left">Customer</th>
            {/* <th className="p-3 border text-left">Sale Date</th> */}
            {/* <th className="p-3 border text-left">Status</th> */}
            <th className="p-3 border text-left">Items</th>
            <th className="p-3 border text-right">Total Value</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((sale:any, index:number) => (
            <tr key={index} className="border-t">

              <td className="p-3 border">
                <p className="text-gray-600 text-xs">
                 {formatDate( sale.saleDate).fullDate}
                </p>
                <p className="text-gray-500 text-xs">{sale.SalesDate}</p>
              </td>

              <td className="p-3 border">
                <p className="font-medium text-blue-700">{sale.invoiceNumber}</p>
                <p className="text-gray-600 text-xs">
                  payment: {sale.paymentType}
                </p>
              </td>
              
              <td className="p-3 border">
                <p className="font-medium">{sale.customerName}</p>
                <p className="text-gray-500 text-xs"> {sale.contactNumber}</p>
                <p className="text-gray-500 text-xs"> {sale.place}</p>
                {sale.gstNumber && (
  <p className="text-gray-500 text-xs">
    Gst: {sale.gstNumber}
  </p>
)}
              </td>
              {/* <td className="p-3 border">{sale.saleurnDate}</td> */}
              {/* <td className="p-3 border">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    statusColorMap[sale.]
                  }`}
                >
                  {sale.}
                </span>
              </td> */}
              {/* <td className="p-3 border text-gray-700">{sale.reason}</td> */}
              <td className="p-3 border">
                <p>
                  <span className="font-medium">{sale.saleItems.length}</span> items
                </p>
                <p className="text-xs text-gray-600">{sale.saleItems.reduce((accu:number,curr:any)=>(accu+curr.quantity),0)} units</p>
              </td>
              <td className="p-3 border text-right font-semibold">
                ₹{sale.totalAmount.toLocaleString()}
              </td>
<td className="p-3 border text-center">
  <div className="flex justify-center items-center gap-3">
    <button
      onClick={() => navigate(`/home/cashier/invoice/details/${sale.invoiceNumber}`)}
      className="text-gray-500 hover:text-gray-700 transition"
      title="View Invoice"
    >
      <Eye className="w-5 h-5" />
    </button>

    <button
      onClick={() => downloadInvoice(sale.invoiceNumber)}
      className="text-gray-500 hover:text-gray-700 transition"
      title="Download Invoice"
    >
      <FaDownload className="w-5 h-5" />
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
