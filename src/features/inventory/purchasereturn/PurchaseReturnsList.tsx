import React from "react";
import { FaEye } from "react-icons/fa6";

type PurchaseReturn = {
  id: string;
  invoiceNumber: string;
  originalInvoiceNumber: string;
  returnDate: string;
  reason: string;
  returnedQuantity: number;
  totalAmount: number;
};

type Props = {
  list: PurchaseReturn[];
};

const PurchaseReturnsList: React.FC<Props> = ({ list }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📋 Purchase Return List</h2>
      <table className="min-w-[900px] w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Return ID</th>
            <th className="p-3 border text-left">Original Invoice</th>
            <th className="p-3 border text-left">Return Date</th>
            <th className="p-3 border text-left">Reason</th>
            <th className="p-3 border text-left">Returned Qty</th>
            <th className="p-3 border text-right">Total Value</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ret, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 border font-medium">{ret.invoiceNumber}</td>
              <td className="p-3 border">{ret.originalInvoiceNumber}</td>
              <td className="p-3 border">{ret.returnDate}</td>
              <td className="p-3 border text-gray-700">{ret.reason}</td>
              <td className="p-3 border">{ret.returnedQuantity}</td>
              <td className="p-3 border text-right font-semibold">
                ₹{ret.totalAmount.toLocaleString()}
              </td>
              <td className="p-3 border text-center">
                <button className="text-blue-600 flex justify-center items-center hover:underline text-sm">
                  <FaEye /> <span className="ml-2">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseReturnsList;
