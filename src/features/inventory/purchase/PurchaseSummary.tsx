import React, { useMemo } from "react";
import type { PurchaseItem } from "./PurchaseTypes";

type Props = {
  items: PurchaseItem[];
  gstType?: "CGST_SGST" | "IGST";
  discount?: number;
  onDiscountChange?: (discount: number) => void;
};

const PurchaseSummary: React.FC<Props> = ({
  items,
  gstType = "CGST_SGST",
  discount = 0,
  onDiscountChange,
}) => {
  // Calculate all values using useMemo for performance
  const { subtotal, taxDetails, grandTotal } = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitCost,
      0
    );

    const taxDetails = items.reduce(
      (acc, item) => {
        const taxableAmount = item.quantity * item.unitCost;
        const taxAmount = taxableAmount * (item.gstRate / 100);

        if (gstType === "CGST_SGST") {
          const halfRate = item.gstRate / 2;
          return {
            ...acc,
            cgst: acc.cgst + (taxableAmount * halfRate) / 100,
            sgst: acc.sgst + (taxableAmount * halfRate) / 100,
            totalTax: acc.totalTax + taxAmount,
          };
        }
        return {
          ...acc,
          igst: acc.igst + taxAmount,
          totalTax: acc.totalTax + taxAmount,
        };
      },
      { cgst: 0, sgst: 0, igst: 0, totalTax: 0 }
    );

    const grandTotal = subtotal + taxDetails.totalTax - discount;

    return { subtotal, taxDetails, grandTotal };
  }, [items, gstType, discount]);

  return (
    <div className="w-full bg-white border rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Purchase Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({items.length} items):
          </span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Total Tax:</span>
          <span className="font-medium">₹{taxDetails.totalTax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Discount:</span>
          <div className="flex items-center gap-2">
            {onDiscountChange && (
              <input
                type="number"
                min="0"
                max={subtotal}
                value={discount}
                onChange={(e) => onDiscountChange(Number(e.target.value))}
                className="w-20 border rounded px-2 py-1 text-right"
              />
            )}
            <span
              className={`font-medium ${discount > 0 ? "text-red-600" : ""}`}
            >
              -₹{discount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="border-t pt-3 mt-2 flex justify-between font-semibold text-lg text-gray-800">
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PurchaseSummary);
