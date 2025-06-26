import React from "react";
import { FaEye, FaEdit, FaFilePdf } from "react-icons/fa";

export type PurchaseOrder = {
  poNumber: string;
  orderedDate: string;
  receivedDate?: string;
  supplier: string;
  invoice: string;
  paymentMethod: string;
  items: number;
  amount: number;
  orderStatus: "Pending" | "Completed" | "Cancelled";
};

type PurchaseOrderListProps = {
  data: PurchaseOrder[];
};

export const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({
  data,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">PO Details</th>
            <th className="px-4 py-3">Supplier</th>
            <th className="px-4 py-3">Invoice</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Order Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3">
                <div className="font-semibold text-blue-600">
                  {order.poNumber}
                </div>
                <div className="text-gray-500 text-xs">
                  Ordered: {order.orderedDate}
                  {order.receivedDate && <> • Received: {order.receivedDate}</>}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-800">{order.supplier}</td>
              <td className="px-4 py-3">
                <div>{order.invoice}</div>
                <div className="text-xs text-gray-500">
                  {order.paymentMethod}
                </div>
              </td>
              <td className="px-4 py-3 text-center">{order.items}</td>
              <td className="px-4 py-3 text-green-700 font-medium">
                ₹{order.amount.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    order.orderStatus === "Completed"
                      ? "bg-green-100 text-green-800"
                      : order.orderStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>

              <td className="px-4 py-3 space-x-3">
                <button
                  className="inline-flex items-center text-sm text-blue-600 hover:underline"
                  title="View"
                >
                  <FaEye className="mr-1" />
                  View
                </button>

                <button
                  className="inline-flex items-center text-sm text-gray-600 hover:underline"
                  title="Edit"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>

                <button
                  className="inline-flex items-center text-sm text-red-600 hover:underline"
                  title="Download PDF"
                  onClick={() => console.log("Download PDF")}
                >
                  <FaFilePdf className="mr-1" />
                  PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
