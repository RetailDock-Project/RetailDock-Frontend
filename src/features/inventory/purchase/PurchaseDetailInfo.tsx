import React from "react";

type Props = {
  purchase?: any; // You can replace 'any' with a proper type/interface later
};

const PurchaseDetailInfo: React.FC<Props> = ({ purchase }) => {
  if (!purchase) return null;

  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Purchase Details
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
        <div>
          <span className="font-medium">Purchase ID:</span>{" "}
          {purchase.purchaseInvoiceNumber || "N/A"}
        </div>
        <div>
          <span className="font-medium">Purchase Status:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
            Received
          </span>
        </div>
        <div>
          <span className="font-medium">Supplier:</span>{" "}
          {purchase.supplierDetails?.name || "N/A"}
        </div>
        <div>
          <span className="font-medium">Invoice Number:</span>{" "}
          {purchase.supplierInvoiceNumber || "N/A"}
        </div>
        <div>
          <span className="font-medium">Purchase Date:</span>{" "}
          {purchase.purchasedate
            ? new Date(purchase.purchasedate).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailInfo;
