import React from "react";

type Props = {
  discount:number,
  subtotal: number;
  gstPercent: number;
};

const SaleSummary: React.FC<Props> = ({ discount,subtotal, gstPercent }) => {
  const discountAmt =(discount);
  const gstAmount = ((subtotal-discountAmt) * gstPercent) / 100;
  const total = subtotal + gstAmount;

  return (
    <div className="text-sm text-right space-y-1 mt-4 border-t pt-4">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>
       <div className="flex justify-between">
        <span>discount</span>
        <span>₹{discountAmt.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>GST</span>
        <span>₹{gstAmount.toLocaleString()}</span>
      </div>
     
      <div className="flex justify-between font-semibold text-base border-t pt-2">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SaleSummary;
