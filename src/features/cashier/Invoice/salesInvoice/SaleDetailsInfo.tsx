import React from "react";

const SaleDetailInfo: React.FC = () => {
  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Purchase Details
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
        <div>
          <span className="font-medium">Purchase ID:</span> PUR-2025-0042
        </div>
        <div>
          <span className="font-medium">Purchase Status:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
            Received
          </span>
        </div>
        <div>
          <span className="font-medium">Supplier:</span> Samsung Electronics
        </div>
        <div>
          <span className="font-medium">Invoice Number:</span> INV-5674
        </div>
        <div>
          <span className="font-medium">Purchase Date:</span> July 2nd, 2025
        </div>
        <div>
          <span className="font-medium">Received Date:</span> July 4th, 2025
        </div>
        <div>
          <span className="font-medium">Payment Method:</span> UPI
        </div>
        <div>
          <span className="font-medium">Payment Status:</span>{" "}
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
            Paid
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Notes:</span> Purchased directly from
          supplier due to low inventory. Items inspected and verified upon
          receipt.
        </p>
      </div>
    </div>
  );
};

export default SaleDetailInfo;
