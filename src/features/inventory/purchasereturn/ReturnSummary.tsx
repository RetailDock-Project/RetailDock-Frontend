import React from "react";

type ReturnSummaryProps = {
  itemCount: number;
  totalQuantity: number;
  totalValue: number;
  totalTax: number;
};

const ReturnSummary: React.FC<ReturnSummaryProps> = ({
  itemCount,
  totalQuantity,
  totalValue,
  totalTax,
}) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md border"
      aria-label="Return Summary Card"
    >
      <h2 className="text-lg font-semibold mb-4">Return Summary</h2>

      <div className="text-sm space-y-3 text-gray-700">
        <div className="flex justify-between" aria-label="Item Count">
          <span className="text-gray-600">Items to Return:</span>
          <span className="font-medium text-gray-800">{itemCount}</span>
        </div>

        <div className="flex justify-between" aria-label="Total Quantity">
          <span className="text-gray-600">Total Quantity:</span>
          <span className="font-medium text-gray-800">{totalQuantity}</span>
        </div>

        <hr className="my-3" />

        <div
          className="flex justify-between text-base text-black"
          aria-label="Total Value"
        >
          <span>Total Tax:</span>
          <span>₹{totalTax.toFixed(2).toLocaleString()}</span>
        </div>
        <div
          className="flex justify-between text-base font-semibold text-black"
          aria-label="Total Value"
        >
          <span>Total Value:</span>
          <span>₹{totalValue.toFixed(2).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReturnSummary;
