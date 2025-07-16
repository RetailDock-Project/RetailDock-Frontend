import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  name: string;
  price: number;
  MRP:number;
  stock:number;
  taxRate:number;
 
  onChangePrice:(val:number)=>void;
  onChangeDiscountAmount:(val:number)=>void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

const SaleItem: React.FC<Props> = ({
  name,
  price,
  MRP,
  stock,
  taxRate,
 
 onChangePrice,
 onChangeDiscountAmount,
  onIncrement,
  onDecrement,
  onRemove,
}) => {

const [productPrice,setProductPrice]=useState(price);
const [productDiscountPrice,setProductDiscountPrice]=useState(0);
const [quantity,setQuantity]=useState(1);
const changeProductPrice=(price:number)=>{
setProductPrice(price);
onChangePrice(price);
}
const onChangeProductDicountPrice=(price:number)=>{
setProductDiscountPrice(price);
onChangeDiscountAmount(price);
}
  return (
<div className="border p-2 rounded-md mb-2 shadow-sm bg-white text-xs">
  <div className="flex justify-between items-center mb-1">
    <div>
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-gray-500">MRP: ₹{MRP.toLocaleString()}</p>
    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={()=>{
          onDecrement();
          setQuantity((prev)=>prev !=0 ? prev - 1 : prev );
        }}
        className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-sm">{quantity}</span>
      <button
        onClick={()=>{
          onIncrement();
          setQuantity((prev)=>prev+1);
          // setQuantity((prev)=>prev < stock?prev + 1: prev);
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
      onChange={(e) => changeProductPrice(Number(e.target.value))}
      className="w-24 px-2 py-0.5 border border-gray-300 rounded text-xs"
    />
  </div>

  {/* Discount */}
  <div>
    <label className="block text-gray-600 text-xs mb-0.5">Discount</label>
    <input
      type="number"
      value={productDiscountPrice}
      onChange={(e) => onChangeProductDicountPrice(Number(e.target.value))}
      className="w-24 px-2 py-0.5 border border-gray-300 rounded text-xs"
    />
  </div>

  {/* Tax */}
  <div>
    <label className="block text-gray-600 text-xs mb-0.5">Tax</label>
    <div className="w-20 px-2 py-0.5 border border-gray-300 rounded text-xs bg-gray-100">
      {taxRate}%
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
      onClick={onRemove}
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
