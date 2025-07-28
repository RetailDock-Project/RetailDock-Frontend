import React, { useEffect, useState } from "react";
import { getReturnedProductCount } from "../../../../services/api/cashierApi/cashierApi";


type returnItemsProps={
items:any;
subTotal:number;

taxAmount:number;
totalAmount:number;
}


const ReturnItems: React.FC<returnItemsProps> = ({items,subTotal,totalAmount,taxAmount}) => {


// const [returnedQuantities, setReturnedQuantities] = useState<Record<string, number>>({});
// useEffect(() => {
//   const fetchReturnedQuantities = async () => {
//     const quantities: Record<string, number> = {};

//     for (const item of items) {
//       try {
//         const count = await getReturnedProductCount(item.saleId, item.productId);
//         quantities[`${item.saleId}-${item.productId}`] = count;
//       } catch (error) {
//         console.log(error, "errorFromGetReturnedProductCount");
//       }
//     }

//     setReturnedQuantities(quantities);
//   };

//   if (items?.length > 0) {
//     fetchReturnedQuantities();
//   }
// }, [items]);


  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">
        🛒 Return Items ({items?.length})
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

              <th className="p-2 font-medium border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item:any, index:number) => (
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
            
                <td className="p-2 text-right border font-semibold">
                  ₹{item?.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6 text-sm">
  <div className="w-64 space-y-2 text-right bg-gray-50 p-4 rounded-lg shadow-sm">
    <div className="flex justify-between">
      <span className="font-medium text-gray-700">Subtotal:</span>
      <span className="text-gray-800">₹{subTotal}</span>
    </div>
 
    <div className="flex justify-between">
      <span className="font-medium text-gray-700">Total Tax:</span>
      <span className="text-gray-800">₹{taxAmount}</span>
    </div>

    <hr className="border-t-2 border-gray-300 my-2" />

    <div className="flex justify-between text-base font-semibold text-gray-900">
      <span>Total Amount:</span>
      <span>₹{totalAmount}</span>
    </div>
  </div>
</div>

    </div>
  );
};

export default ReturnItems;
