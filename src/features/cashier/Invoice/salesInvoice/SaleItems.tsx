import React from "react";


type saleItemsProps={
items:any[];
subTotal:number;
discountAmount:number;
taxAmount:number;
totalAmount:number;
}


const SaleItems: React.FC<saleItemsProps> = ({items,subTotal,discountAmount,totalAmount,taxAmount}) => {
  

  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">
        🛒 Sale Items ({items?.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 font-medium border">Product Details</th>
              <th className="p-2 font-medium border text-center">Quantity</th>
              <th className="p-2 font-medium border text-right">Unit Price</th>
              <th className="p-2 font-medium border text-right">TaxRate</th>
              <th className="p-2 font-medium border text-right">SubTotal</th>
              <th className="p-2 font-medium border text-right">Tax</th>

              <th className="p-2 font-medium border text-right">Discount</th>
              <th className="p-2 font-medium border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">
                  <p className="font-medium">{item?.productName}</p>
                  
                  <p className="text-xs text-gray-500">Batch: {item?.unitName}</p>
                </td>
                <td className="p-2 text-center border font-medium text-green-700">
                  {item?.quantity}
                </td>
                <td className="p-2 text-right border">
                  ₹{item?.unitPrice.toLocaleString()}
                </td>
                <td className="p-2 text-right border">
                  {item?.taxRate.toLocaleString()}%
                </td>
                <td className="p-2 text-right border">
                  {item?.taxableAmount.toLocaleString()}
                </td>
                <td className="p-2 text-right border">
                  {item?.totalTaxAmount}
                </td>
                <td className="p-2 text-right border">
                  {item?.discountAmount.toLocaleString()}
                </td>
                <td className="p-2 text-right border font-semibold">
                  ₹{item?.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 text-sm">
        <div className="space-y-1 text-right">
          <p>
            <span className="font-medium">Subtotal:</span> ₹
            {subTotal}
          </p>
          <p>
            <span className="font-medium">Discount:</span> ₹
            {discountAmount}
          </p>
          <p>
            <span className="font-medium">Total Tax:</span> ₹
            {taxAmount}
          </p>
          <p>
            <span className="font-medium">Total Amount:</span> ₹
            {totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleItems;
