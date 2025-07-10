import React from "react";

type OrderSummaryProps = {
  itemsCount: number;
  subtotal: number;
  totalTax: number;
  grandTotal: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemsCount,
  subtotal,
  totalTax,
  grandTotal,
}) => {
  return (
    <div className="w-full bg-white border rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Items:</span>
        <span className="font-medium">{itemsCount}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Total Tax:</span>
        <span className="font-medium">₹{totalTax.toFixed(2)}</span>
      </div>

      <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-gray-800">
        <span>Grand Total:</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
