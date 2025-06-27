import React from "react";
import { Eye, Pencil } from "lucide-react";

type Product = {
  name: string;
  brand: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  status: "Active" | "Inactive";
};

const products: Product[] = [
  {
    name: "Samsung Galaxy M13",
    brand: "Samsung Electronics",
    sku: "SM-M13-BLK",
    category: "Smartphone",
    stock: 25,
    minStock: 10,
    price: 12999,
    cost: 9500,
    stockStatus: "In Stock",
    status: "Active",
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📦 Product List</h2>

      <table className="min-w-[1000px] w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Product</th>
            <th className="p-3 border text-left">SKU</th>
            <th className="p-3 border text-left">Category</th>
            <th className="p-3 border text-left">Stock Status</th>
            <th className="p-3 border text-left">Stock</th>
            <th className="p-3 border text-left">Price</th>
            <th className="p-3 border text-left">Status</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 border">
                <p className="font-medium">{prod.name}</p>
                <p className="text-xs text-gray-500">{prod.brand}</p>
              </td>
              <td className="p-3 border">{prod.sku}</td>
              <td className="p-3 border">{prod.category}</td>
              <td className="p-3 border">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    prod.stockStatus === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : prod.stockStatus === "Low Stock"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {prod.stockStatus}
                </span>
              </td>
              <td className="p-3 border">
                <p>{prod.stock}</p>
                <p className="text-xs text-gray-500">Min: {prod.minStock}</p>
              </td>
              <td className="p-3 border">
                ₹{prod.price.toLocaleString()}
                <p className="text-xs text-gray-500">
                  Cost: ₹{prod.cost.toLocaleString()}
                </p>
              </td>
              <td className="p-3 border">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    prod.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {prod.status}
                </span>
              </td>
              <td className="p-3 border text-center">
                <div className="flex justify-center gap-2">
                  <button title="View">
                    <Eye
                      size={16}
                      className="text-blue-600 hover:text-blue-800"
                    />
                  </button>
                  <button title="Edit">
                    <Pencil
                      size={16}
                      className="text-gray-600 hover:text-gray-800"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
