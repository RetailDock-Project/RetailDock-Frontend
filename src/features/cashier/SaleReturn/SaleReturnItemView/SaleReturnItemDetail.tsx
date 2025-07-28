import React from "react";
import { formatDate } from "../../../../utils/formatDate";




type saleReturnItemDetailProps={
  SaleReturnDetails:any;
}

const SaleReturnItemDetail: React.FC<saleReturnItemDetailProps> = ({SaleReturnDetails}) => {
  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Sale Return Details
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
      
        <div>
             <span className="font-medium">Return Date:</span> {formatDate(SaleReturnDetails?.returnDate).fullDate}
        
        </div>
    
        <div>
          <span className="font-medium">Invoice Number:</span> <span className="font-medium text-violet-700 text- pl-2">{SaleReturnDetails?.invoiceNumber}</span>
        </div>
            <div>
          <span className="font-medium">Customer:</span> {SaleReturnDetails?.customerName}
        </div>
        <div>
    <span className="font-medium">Created Date:</span> {formatDate(SaleReturnDetails?.createdAt).fullDate}
        </div>
        <div>
     <span className="font-medium">Return Status:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
           Completed
          </span>
        </div>
  
   

        <div>
          <span className="font-medium">Payment Method:</span><span>{SaleReturnDetails?.paymentMode}</span>
        </div>
        <div>
           <span className="font-medium">Sale Date:</span><span>{formatDate(SaleReturnDetails?.saleDate).fullDate}</span>
        </div>
        <div>
           <span className="font-medium">Sale Invoice:</span><span>{SaleReturnDetails?.saleInvoiceNumber}</span>
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

export default SaleReturnItemDetail;
