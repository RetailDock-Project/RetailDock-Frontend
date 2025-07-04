import React from "react";

const PurchaseSummary: React.FC = () => {
  return (
    <div className="w-full bg-white border rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Purchase Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Total Items:</span>
        <span className="font-medium">0</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">₹0</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Tax:</span>
        <span className="font-medium">₹0</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Discount:</span>
        <span className="font-medium text-red-600">₹0</span>
      </div>

      <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-gray-800">
        <span>Grand Total:</span>
        <span>₹0</span>
      </div>
    </div>
  );
};

export default PurchaseSummary;
