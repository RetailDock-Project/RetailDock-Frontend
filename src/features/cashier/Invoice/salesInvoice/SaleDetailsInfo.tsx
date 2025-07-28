import React from "react";
import { formatDate } from "../../../../utils/formatDate";




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
             <span className="font-medium">Sale Date:</span> {formatDate(invoiceDetails?.saleDate).fullDate}
        
        </div>
        <div>
          <span className="font-medium">Customer:</span> {invoiceDetails?.customerName}
        </div>
        <div>
          <span className="font-medium">Invoice Number:</span> <span className="font-medium text-violet-700 text- pl-2">{invoiceDetails?.invoiceNumber}</span>
        </div>
        <div>
     <span className="font-medium">Sale Status:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
           Completed
          </span>
        </div>
        {invoiceDetails?.paymentMod=="Credit" &&
        <div>
          <span className="font-medium">Due Date:</span> {formatDate(invoiceDetails?.dueDate).fullDate}
        </div>
}
        <div>
          <span className="font-medium">Payment Method:</span><span>{invoiceDetails?.paymentMod}</span>
        </div>
        <div>
       
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
