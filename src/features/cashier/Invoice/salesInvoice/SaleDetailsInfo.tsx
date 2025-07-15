import React from "react";




type saleDetailInfoProps={
  invoiceDetails:any;
}

const SaleDetailInfo: React.FC<saleDetailInfoProps> = ({invoiceDetails}) => {
  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Sale Details
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
        <div>
          <span className="font-medium">Sale ID:</span><span className="font-medium text- pl-2">{invoiceDetails?.saleId}</span> 
        </div>
        <div>
          <span className="font-medium">Sale Status:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
            Received
          </span>
        </div>
        <div>
          <span className="font-medium">Customer:</span> {invoiceDetails?.customerName}
        </div>
        <div>
          <span className="font-medium">Invoice Number:</span> <span className="font-medium text-violet-700 text- pl-2">{invoiceDetails?.invoiceNumber}</span>
        </div>
        <div>
          <span className="font-medium">Sale Date:</span> {new Date(invoiceDetails?.saleDate).toLocaleDateString()}
        </div>
        {invoiceDetails?.paymentMode=="Credit" &&
        <div>
          <span className="font-medium">Received Date:</span> {invoiceDetails?.dueDate}
        </div>
}
        <div>
          <span className="font-medium">Payment Method:</span><span>{invoiceDetails?.paymentMode}</span>
        </div>
        <div>
          <span className="font-medium">Payment Status:</span>{" "}
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
            Paid
          </span>
        </div>
      </div>

      <div className="mt-4">
        {/* <p className="text-sm text-gray-600">
          <span className="font-medium">Notes:</span> Purchased directly from
          supplier due to low inventory. Items inspected and verified upon
          receipt.
        </p> */}
      </div>
    </div>
  );
};

export default SaleDetailInfo;
