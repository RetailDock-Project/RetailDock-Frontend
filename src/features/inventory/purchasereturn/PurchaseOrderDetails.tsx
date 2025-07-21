import React from "react";

type Supplier = {
  name: string;
};

type Purchase = {
  purchaseInvoiceNumber: string | null;
  supplierDetails: Supplier;
  supplierInvoiceNumber: string | null;
  purchasedate: string; // ISO string
};

type Props = {
  purchase: Purchase;
};

const PurchaseOrderDetails: React.FC<Props> = ({ purchase }) => {
  const {
    purchaseInvoiceNumber,
    supplierDetails,
    supplierInvoiceNumber,
    purchasedate,
  } = purchase;

  const formattedDate = new Date(purchasedate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border rounded-xl shadow p-6 my-6">
      <h2 className="text-lg font-semibold mb-4">Purchase Details</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Purchase:</p>
          <p className="font-medium text-gray-800">
            {purchaseInvoiceNumber || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Supplier:</p>
          <p className="font-medium text-gray-800">
            {supplierDetails?.name || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Invoice:</p>
          <p className="font-medium text-gray-800">
            {supplierInvoiceNumber || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Date:</p>
          <p className="font-medium text-gray-800">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export { PurchaseOrderDetails };
