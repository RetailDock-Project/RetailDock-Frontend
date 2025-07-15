import React, { useEffect } from "react";


type saleDetailsProps={
  customerInfo:any
}
const SalesDetails: React.FC<saleDetailsProps> = ({customerInfo}) => {

  return (
    <div className="bg-white border rounded-xl shadow p-6 my-6">
      <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Invoice:</p>
          <p className="font-medium text-gray-800">{customerInfo?.invoiceNumber}</p>
        </div>
        <div>
          <p className="text-gray-500">Customer:</p>
          <p className="font-medium text-gray-800">{customerInfo?.customerName}</p>
        </div>
        <div>
          <p className="text-gray-500">Date:</p>
          <p className="font-medium text-gray-800">{new Date(customerInfo?.saleDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500">TotalAmount:</p>
          <p className="font-medium text-gray-800">₹ {customerInfo?.totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export { SalesDetails };
