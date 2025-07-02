import React from "react";
import POSProductCard from "./POSProductCard";

const mockProducts = [
  { name: "Samsung Galaxy M13", price: 12999, stock: 25 },
  { name: "HP Printer Ink Black", price: 999, stock: 5 },
  { name: "Boat Headphones", price: 2499, stock: 12 },
  { name: "Mi Power Bank", price: 1499, stock: 8 },
  { name: "Dell Mouse", price: 899, stock: 15 },
  { name: "Lenovo Laptop Bag", price: 1299, stock: 20 },
  { name: "USB-C Cable 1.5m", price: 399, stock: 30 },
  { name: "Logitech Keyboard", price: 2299, stock: 18 },
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
