import React from "react";
import { FaEye } from "react-icons/fa6";
import Loader from "../../../components/ui/reusable/Loader";
import { useGetsaleReturnDetailsByDate } from "../Hooks/useGetSaleReturnDetailsByDate";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";


type SalesReturnsListProps = {
  fromDate: Date | null;
  toDate: Date | null;
  searchTerm: string;
};

const SalesReturnsList: React.FC<SalesReturnsListProps> = ({
  fromDate,
  toDate,
  searchTerm,
}) => {
const navigate=useNavigate();

  const { data, isLoading } = useGetsaleReturnDetailsByDate(fromDate, toDate, false);

  const filteredData = data?.filter((ret: any) => {
    const search = searchTerm.toLowerCase();
    return (
      ret.customerName?.toLowerCase().includes(search) ||
      ret.invoiceNumber?.toLowerCase().includes(search) 
     
    );
  });

  if (isLoading) return <Loader />;


  
  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📋 Sales Return List</h2>
      <table className="min-w-[1200px] w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Return Details</th>
            <th className="p-3 border text-left"> Sale Invoice</th>
            <th className="p-3 border text-left">Return Invoice</th>
            <th className="p-3 border text-left">Return Date</th>
            <th className="p-3 border text-left">Reason</th>
            <th className="p-3 border text-left">Items</th>
            <th className="p-3 border text-right">Total Value</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((ret: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="p-3 border">
                <p className="font-medium">{ret.customerName}</p>
                <p className="text-gray-600 text-xs">{ret.place}</p>
                <p className="text-gray-500 text-xs">{ret.contactNumber}</p>
{ret.gstNumber && (
  <p className="text-gray-500 text-xs">
    Gst: {ret.gstNumber}
  </p>
)}

              </td>
              <td className="p-3 border">
               
                <button onClick={()=>useNavigate()}>
                  <p className="text-gray-600 text-xs">{ret.saleInvoiceNumber}</p>
                  </button>
     <br />

                <p className="text-gray-500 text-xs">Date:{formatDate(ret.saleDate).fullDate}</p>
              </td>
              <td className="p-3 border">
              
                <p className="text-xs text-blue-700"> {ret.returnInvoiceNumber}</p>
              </td>
              <td className="p-3 border">{formatDate( ret.returnDate).humanReadable}</td>
              <td className="p-3 border text-red-700">{ret.notes}</td>
              <td className="p-3 border">
                <p>
                  <span className="font-medium">{ret.returnItems.length}</span> item
                </p>
               {ret.returnItems.reduce((total:number, item:any) => total + item.quantity, 0)} units
              </td>
              <td className="p-3 border text-right font-semibold">
                ₹  {ret.totalAmount} 
              </td>
              <td className="p-3 border text-center">
                <button className="text-blue-600 flex justify-center items-center hover:underline text-sm" onClick={()=>navigate("/")}>
                  <FaEye />
                  <span className="ml-2">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReturnsList;
