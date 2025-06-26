import React, { useState } from "react";
import { Button } from "../../../components/ui/reusable/Button";

const products = ["iPhone 15", "Samsung Galaxy", "Pixel 8", "Realme Narzo"];

const AddItemSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);

  const filteredProducts = products.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    // Add item logic here
    alert("Item added!");
  };

  return (
    <div className="p-6 bg-white border rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Add Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Product Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product
          </label>
          <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <ul className="mt-1 border rounded-md bg-white max-h-40 overflow-auto shadow text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => setSearchTerm(product)}
                  >
                    {product}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">No products found</li>
              )}
            </ul>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={1}
          />
        </div>

        {/* Unit Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Unit Cost
          </label>
          <input
            type="number"
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
          />
        </div>
      </div>

      {/* Add Button */}
      <div className="text-right">
        <Button
          size="sm"
          variant="primary"
          className=" py-2"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default AddItemSection;
