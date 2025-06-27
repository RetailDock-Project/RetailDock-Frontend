import React from "react";

const PurchaseOrderDetailInfo: React.FC = () => {
  return (
    <div className=" p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📄 Purchase Information
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
        <div>
          <span className="font-medium">Purchase Order:</span> PO-2025-0001
        </div>
        <div>
          <span className="font-medium">Order Status:</span>{" "}
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
            Completed
          </span>
        </div>
        <div>
          <span className="font-medium">Invoice Number:</span> INV-2458
        </div>
        <div>
          <span className="font-medium">Payment Status:</span>{" "}
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
            Paid
          </span>
        </div>
        <div>
          <span className="font-medium">Order Date:</span> May 10th, 2025
        </div>
        <div>
          <span className="font-medium">Received Date:</span> May 12th, 2025
        </div>
        <div>
          <span className="font-medium">Payment Method:</span> Bank Transfer
        </div>
        <div>
          <span className="font-medium">Payment Terms:</span> Net 30 days
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Notes:</span> Bulk order for electronics
          section. All items received in good condition.
        </p>
      </div>
    </div>
  );
};

export default PurchaseOrderDetailInfo;
