import React from "react";
import ProceedToReturn from "./ProceedToReturn";

type ReturnSummaryProps = {
  itemCount: number;
  totalQuantity: number;
  taxAmount:number;
  totalValue: number;
  onClick: () => void ;
  isLoading:boolean
};

const SalesReturnSummary: React.FC<ReturnSummaryProps> = ({
  itemCount,
  totalQuantity,
  totalValue,
  taxAmount,
  onClick,
  isLoading
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
        <div className="flex justify-between">
          <span>Total TaxAmount:</span>
          <span className="font-medium">₹{taxAmount}</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-base font-semibold text-black">
          <span>Total Value:</span>
          <span>₹{totalValue + taxAmount}</span>
        </div>
      </div>
        <ProceedToReturn  isLoading={isLoading} onClick={onClick}/>
    </div>
  );
};

export default SalesReturnSummary;
