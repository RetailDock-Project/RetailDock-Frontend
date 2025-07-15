import { CheckSquare } from "lucide-react";
import React, { useEffect, useState } from "react";


type selectedItemsToSRProps={
  saleItems:any;
  handleChangeReason:(id:string,reason:string)=>void;
  handleChangeQuantity:(id:string,quantity:number)=>void;
  handleSelectedItem:(id:string)=>void
  handleSelectAllItems:()=>void
}


export const SelectItemsToSaleReturn: React.FC<selectedItemsToSRProps> = ({saleItems,handleChangeQuantity,handleChangeReason,handleSelectedItem,handleSelectAllItems}) => {
 

  return (
    <div className="bg-white border rounded-xl shadow p-6">
    <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold text-gray-800">
    Select Items to Return
  </h2>

  {saleItems?.length > 0 && (
    <button
      onClick={handleSelectAllItems}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
    >
      <CheckSquare size={16} />
      Select All Items
    </button>
  )}
</div>

     
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Sold Item</th>
              <th className="p-2 text-center">Already Returned</th>
              <th className="p-2 text-center">Return Qty</th>
              <th className="p-2 text-left">Reason</th>
              
              <th className="p-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {saleItems?.map((item:any, index:number) => (
              <tr key={item.productId} className="border-t">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.selected}
                    
                      onChange={(e) =>
                        handleSelectedItem(item.productId)
                      }
                    />
                    <div className="pl-2">
                      <p className="font-medium text-gray-800">{item.productName}</p>
                      <p className="text-xs text-gray-500">₹{item.unitPrice}/{item.unitName}</p>
                 
                    </div>
                  </div>
                </td>
                <td className="p-2 text-center">    
                   <p className="text-xs text-gray-500">{item.quantity}</p></td>
                <td className="p-2 text-center">    
                   <p className="text-xs text-gray-500">{item.alreadyReturnedQuantity}</p></td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.returnQuantity}
                 disabled={!item.selected}
                    className="w-16 text-center border rounded px-2 py-1"
                    min={0}
                    max={item.quantity-item.alreadyReturnedQuantity}
                    onChange={(e) => handleChangeQuantity(item.productId,Number(e.target.value))}
                    
                   
                  />
                </td>
                <td className="p-2">
                  <input
                    className=" border rounded px-2 py-1"
                    value={item.reason}
                    disabled={!item.selected}
                    onChange={(e) =>
                      handleChangeReason(item.productId,  e.target.value)
                    }
                  />
                 
                </td>
              
                <td className="p-2 text-right">₹ {item.unitPrice * item.returnQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
