import React from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  productName: string;
  productCode: string;
  description: string;
  productCategory: string;
  stock: number;
  unitOfMeasures: string;
  reOrderLevel: number;
  lastStockUpdate: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
};

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();

  const getStockStatus = (stock: number, reOrderLevel: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= reOrderLevel) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">📦 Product List</h2>

      <table className="min-w-[1000px] w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Product</th>
            <th className="p-3 border text-left">Product Code</th>
            <th className="p-3 border text-left">Category</th>
            <th className="p-3 border text-left">Stock Status</th>
            <th className="p-3 border text-left">Stock</th>
            <th className="p-3 border text-left">Price</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod) => {
            const stockStatus = getStockStatus(prod.stock, prod.reOrderLevel);

            return (
              <tr key={prod.id} className="border-t">
                <td className="p-3 border">
                  <p className="font-medium">{prod.productName}</p>
                  <p className="text-xs text-gray-500">{prod.unitOfMeasures}</p>
                </td>
                <td className="p-3 border">{prod.productCode}</td>
                <td className="p-3 border">{prod.productCategory}</td>
                <td className="p-3 border">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stockStatus === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : stockStatus === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stockStatus}
                  </span>
                </td>
                <td className="p-3 border">
                  <p>{prod.stock}</p>
                  <p className="text-xs text-gray-500">
                    Min: {prod.reOrderLevel}
                  </p>
                </td>
                <td className="p-3 border">
                  ₹{prod.sellingPrice.toLocaleString()}
                  <p className="text-xs text-gray-500">
                    Cost: ₹{prod.costPrice.toLocaleString()}
                  </p>
                </td>
                <td className="p-3 border text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      title="View"
                      onClick={() =>
                        navigate(`/home/inventory/product/${prod.id}`)
                      }
                    >
                      <Eye
                        size={16}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </button>
                    <button
                      title="Edit"
                      onClick={() =>
                        navigate(`/home/inventory/product/edit/${prod.id}`)
                      }
                    >
                      <Pencil
                        size={16}
                        className="text-gray-600 hover:text-gray-800"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
