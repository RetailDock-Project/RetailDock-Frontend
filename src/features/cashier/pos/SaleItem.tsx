import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import toast from "react-hot-toast";

type Props = {
product:any
 saleItem:any
  onChangePrice:(val:number)=>void;
  onChangeDiscountAmount:(val:number)=>void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

const SaleItem: React.FC<Props> = ({
  product,
 saleItem,
 onChangePrice,
 onChangeDiscountAmount,
  onIncrement,
  onDecrement,
  onRemove,
}) => {

const productPrice = saleItem?.unitPrice;
const productDiscountPrice = saleItem?.discountAmount;
const quantity = saleItem?.quantity;




const changeProductPrice = (value: number) => {
  if (value > product.mrp) {
    toast.error("Price cannot exceed MRP");
    return;
  }
  
  if (value < product.costPrice) {
    toast.error("Price is under CostPrice");
    return;
  }
  


  

  onChangePrice(value);
};

const onChangeProductDiscountPrice = (value: number) => {
  const priceAfterDiscount = productPrice - value;
  if (priceAfterDiscount < product.costPrice) {
    toast.error("Discount too high. Price goes below cost!");
  onChangeDiscountAmount(value);
  }
  onChangeDiscountAmount(value);
};


const onRemoveProduct=()=>{
  
  onRemove();
}

  return (
<div className="border p-2 rounded-md mb-2 shadow-sm bg-white text-xs">
  <div className="flex justify-between items-center mb-1">
    <div>
      <p className="font-semibold text-gray-800">{product?.productName}</p>
      <p className="text-gray-500">MRP: ₹{product?.mrp.toLocaleString()}/{product?.unitOfMeasures} <span className="pl-2">stock:{product?.stock} </span>  <span className="pl-2">cost:{product?.costPrice}</span>  </p>
 
    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={()=>{
          onDecrement();
      
        }}
        className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-sm">{quantity}</span>
      <button
   
        onClick={()=>{
          onIncrement();
          
          // setQuantity((prev)=>prev+1);
        
        }}
        className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
  <div className="flex items-end gap-2 mb-2">
  {/* Price */}
  <div>
    <label className="block text-gray-600 text-xs mb-0.5">Price</label>
    <input
      type="number"
  value={productPrice}
      max={product.mrp}
      min={0}
      onChange={(e) => changeProductPrice(Number(e.target.value))}
      className="w-24 px-2 py-0.5 border border-gray-300 rounded text-xs"
    />
  </div>

  {/* Discount */}
  <div>
    <label className="block text-gray-600 text-xs mb-0.5">Discount</label>
    <input
    
    min={0}
      type="number"
        value={productDiscountPrice}
      onChange={(e) => onChangeProductDiscountPrice(Number(e.target.value))}
      className="w-24 px-2 py-0.5 border border-gray-300 rounded text-xs"
    />
  </div>

  {/* Tax */}
  <div>
    <label className="block text-gray-600 text-xs mb-0.5">Tax</label>
    <div className="w-20 px-2 py-0.5 border border-gray-300 rounded text-xs bg-gray-100">
      {product?.taxRate}%
    </div>
  </div>
</div>



  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-600">Total</p>
      <p className="text-sm font-bold text-green-700">
        ₹{((productPrice - productDiscountPrice) * quantity).toLocaleString()}
      </p>
    </div>
    <button
      onClick={()=>onRemoveProduct()}
      className="text-red-500 hover:text-red-700"
      title="Remove"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</div>


  );
};

export default SaleItem;
