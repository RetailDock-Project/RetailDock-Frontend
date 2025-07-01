import React from "react";

type Props = {
  name: string;
  price: number;
  stock: number;
};

const POSProductCard: React.FC<Props> = ({ name, price, stock }) => {
  return (
    <div className="bg-white rounded-md border p-4 shadow-sm text-center">
      <div className="w-full h-24 bg-gray-100 mb-2 flex items-center justify-center text-gray-300 text-sm">
        Image
      </div>
      <p className="text-sm font-medium truncate">{name}</p>
      <p className="text-sm text-gray-800 mt-1">₹{price}</p>
      <p
        className={`text-xs mt-1 ${
          stock > 10
            ? "text-green-600"
            : stock > 0
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        Stock: {stock}
      </p>
    </div>
  );
};

export default POSProductCard;
