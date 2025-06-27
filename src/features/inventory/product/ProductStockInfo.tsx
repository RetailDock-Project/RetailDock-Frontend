import React, { useState } from "react";

const ProductStockInfo: React.FC = () => {
  const [stock, setStock] = useState({
    currentStock: "",
    minStock: "",
    maxStock: "",
    openingStock: "",
    reorderLevel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setStock((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white p-6 border rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Stock Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Current Stock
          </label>
          <input
            type="text"
            name="currentStock"
            value={stock.currentStock}
            onChange={handleChange}
            placeholder="Enter current stock"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Reorder Level */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reorder Level
          </label>
          <input
            type="text"
            name="reorderLevel"
            value={stock.reorderLevel}
            onChange={handleChange}
            placeholder="Enter reorder level"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductStockInfo;
