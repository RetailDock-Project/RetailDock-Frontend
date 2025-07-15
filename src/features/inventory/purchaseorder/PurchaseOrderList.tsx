import React from "react";
import { FaEye, FaFilePdf } from "react-icons/fa";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

type PurchaseOrderListProps = {
  data: PurchaseOrders[];
};

export type PurchaseOrders = {
  purchaseOrderId: string;
  purchaseOrderNumber: string;
  supplier: Supplier;
  orderDate: string;
  orderStatus: "Pending" | "Completed" | "Cancelled";
  netAmount: number;
  totalAmount: number;
  taxAmount: number;
  createdBy: string;
};

export type Supplier = {
  name: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
};

export const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow border">
        <p className="text-sm">No purchase orders found.</p>
      </div>
    );
  }

  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">PO Details</th>
            <th className="px-4 py-3">Supplier</th>
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
                  {order.purchaseOrderNumber}
                </div>
                <div className="text-gray-500 text-xs">
                  Ordered: {formatDate(order.orderDate).humanReadable}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-800">{order.supplier.name}</td>
              <td className="px-4 py-3 text-green-700 font-medium">
                ₹{order.totalAmount.toLocaleString()}
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
                  onClick={() =>
                    navigate(
                      `/home/inventory/purchase-order/${order.purchaseOrderId}`
                    )
                  }
                >
                  <FaEye className="mr-1" />
                  View
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
