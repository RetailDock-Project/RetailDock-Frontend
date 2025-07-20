import React from "react";
import type { OrderItem } from "./PurchaseOrderTypes";

type Props = {
  items: OrderItem[];
};

const OrderItems: React.FC<Props> = ({ items }) => {
  const subtotal = items?.reduce((acc, item) => acc + item.netTotal, 0);
  const totalTax = items?.reduce((acc, item) => acc + item.taxAmount, 0);
  const totalAmount = items?.reduce((acc, item) => acc + item.totalAmount, 0);

  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">
        📦 Order Items ({items?.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium border">Product Details</th>
              <th className="p-3 font-medium border text-center">Ordered</th>
              <th className="p-3 font-medium border text-center">Received</th>
              <th className="p-3 font-medium border text-right">Unit Cost</th>
              <th className="p-3 font-medium border text-right">Net Total</th>

              <th className="p-3 font-medium border text-right">Tax</th>
              <th className="p-3 font-medium border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 border">
                  <p className="font-medium">{item?.productName}</p>
                </td>
                <td className="p-3 text-center border">{item?.quantity}</td>
                <td className="p-3 text-center border text-green-700 font-medium">
                  {item?.receivedQuantity}
                </td>
                <td className="p-3 text-right border">
                  ₹{item?.ratePerPiece.toLocaleString()}
                </td>

                <td className="p-3 text-right border">
                  ₹{item?.netTotal.toLocaleString()}
                </td>
                <td className="p-3 text-right border">
                  ₹{item?.taxAmount.toLocaleString()}
                </td>
                <td className="p-3 text-right border font-semibold">
                  ₹{item?.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 text-sm">
        <div className="space-y-1 text-right">
          <p>
            <span className="font-medium">Subtotal:</span> ₹{subtotal}
          </p>
          <p>
            <span className="font-medium">Total Tax:</span> ₹{totalTax}
          </p>
          <p>
            <span className="font-medium">Total Amount:</span> ₹
            {totalAmount?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
