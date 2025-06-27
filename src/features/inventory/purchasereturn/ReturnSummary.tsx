import React from "react";

type ReturnSummaryProps = {
  itemCount: number;
  totalQuantity: number;
  totalValue: number;
};

const ReturnSummary: React.FC<ReturnSummaryProps> = ({
  itemCount,
  totalQuantity,
  totalValue,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Return Summary</h2>

      <div className="text-sm space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Items to Return:</span>
          <span className="font-medium">{itemCount}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Quantity:</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-base font-semibold text-black">
          <span>Total Value:</span>
          <span>₹{totalValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReturnSummary;
