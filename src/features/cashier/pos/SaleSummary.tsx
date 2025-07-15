import React from "react";

type Props = {
  discount: number;
  subtotal: number;
  taxAmount: number;
};

const SaleSummary: React.FC<Props> = ({ discount, subtotal, taxAmount }) => {
  const total = subtotal + taxAmount;

  return (
    <div className="text-sm text-right space-y-1 mt-4 border-t pt-4">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount</span>
        <span>₹{discount.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>GST</span>
        <span>₹{taxAmount.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold text-base border-t pt-2">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SaleSummary;
