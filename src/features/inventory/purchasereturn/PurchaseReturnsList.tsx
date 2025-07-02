import React from "react";
import { FaEye } from "react-icons/fa6";

type PurchaseReturn = {
  returnId: string;
  createdBy: string;
  createdAt: string;
  purchaseId: string;
  invoiceNumber: string;
  purchaseDate: string;
  supplier: string;
  gst: string;
  returnDate: string;
  status: "Processed" | "Pending" | "Cancelled";
  reason: string;
  itemCount: number;
  unitCount: number;
  totalValue: number;
};

const returns: PurchaseReturn[] = [
  {
    returnId: "RET-2025-0001",
    createdBy: "Jane Smith",
    createdAt: "Jun 10, 2025 at 10:15 AM",
    purchaseId: "P-2025-0145",
    invoiceNumber: "INV-2458",
    purchaseDate: "May 10, 2025",
    supplier: "Samsung Electronics",
    gst: "27AABCS1234C1Z5",
    returnDate: "Jun 12, 2025",
    status: "Processed",
    reason: "Defective units",
    itemCount: 2,
    unitCount: 5,
    totalValue: 90900,
  },
];

const statusColorMap = {
  Processed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const PurchaseReturnsList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📋 Purchase Return List</h2>
      <table className="min-w-[1200px] w-full  text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Return Details</th>
            <th className="p-3 border text-left">Original Purchase</th>
            <th className="p-3 border text-left">Supplier</th>
            <th className="p-3 border text-left">Return Date</th>
            {/* <th className="p-3 border text-left">Status</th> */}
            <th className="p-3 border text-left">Reason</th>
            <th className="p-3 border text-left">Items</th>
            <th className="p-3 border text-right">Total Value</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((ret, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 border">
                <p className="font-medium">{ret.returnId}</p>
                <p className="text-gray-600 text-xs">
                  Created by {ret.createdBy}
                </p>
                <p className="text-gray-500 text-xs">{ret.createdAt}</p>
              </td>
              <td className="p-3 border">
                <p className="font-medium">{ret.purchaseId}</p>
                <p className="text-gray-600 text-xs">
                  Invoice: {ret.invoiceNumber}
                </p>
                <p className="text-gray-500 text-xs">{ret.purchaseDate}</p>
              </td>
              <td className="p-3 border">
                <p className="font-medium">{ret.supplier}</p>
                <p className="text-gray-500 text-xs">GST: {ret.gst}</p>
              </td>
              <td className="p-3 border">{ret.returnDate}</td>
              {/* <td className="p-3 border">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    statusColorMap[ret.status]
                  }`}
                >
                  {ret.status}
                </span>
              </td> */}
              <td className="p-3 border text-gray-700">{ret.reason}</td>
              <td className="p-3 border">
                <p>
                  <span className="font-medium">{ret.itemCount}</span> items
                </p>
                <p className="text-xs text-gray-600">{ret.unitCount} units</p>
              </td>
              <td className="p-3 border text-right font-semibold">
                ₹{ret.totalValue.toLocaleString()}
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
