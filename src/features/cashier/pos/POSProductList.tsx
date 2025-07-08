import React from "react";
import POSProductCard from "./POSProductCard";

const mockProducts = [
  { name: "Samsung Galaxy M13", price: 12999, stock: 25 },
  { name: "HP Printer Ink Black", price: 999, stock: 5 },

];

const POSProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockProducts.map((product, index) => (
        <POSProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default POSProductList;
