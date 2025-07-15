import React from "react";
import type { Product } from "./PointOfSale";



type Props = {
  product: Product;
};

const POSProductCard: React.FC<Props> = ({ product }) => {
  const getStockColor = () => {
    if (product.stock > 10) return "text-green-600";
    if (product.stock > 0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-2xl border p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
<div className="w-full h-16 bg-gray-100 mb-3 flex items-center justify-center rounded-md text-gray-800 text-lg font-semibold tracking-wide">
  {product.productName}
</div>


      {/* <div className="text-sm font-semibold truncate text-gray-900">{product.productName}</div> */}
      <div className="text-xs text-gray-500 mb-2 mt-2">{product.productCategory}</div>

      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-gray-600">Selling Price:</span>
        <span className="font-medium text-gray-800">₹{product.sellingPrice}</span>
      </div>

      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-gray-600">MRP:</span>
        <span className="line-through text-gray-400">₹{product.mrp}</span>
      </div>

      <div className={`text-xs mt-2 font-medium ${getStockColor()}`}>
        Stock: {product.stock}
      </div>
    </div>
  );
};

export default POSProductCard;
