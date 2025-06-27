import React, { useState } from "react";

const ProductPricing: React.FC = () => {
  const [pricing, setPricing] = useState({
    costPrice: "",
    sellingPrice: "",
    mrp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPricing((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl mt-6 border shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Pricing</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cost Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cost Price (₹)
          </label>
          <input
            type="text"
            name="costPrice"
            value={pricing.costPrice}
            onChange={handleChange}
            placeholder="Enter cost price"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Selling Price (₹)
          </label>
          <input
            type="text"
            name="sellingPrice"
            value={pricing.sellingPrice}
            onChange={handleChange}
            placeholder="Enter selling price"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* MRP */}
        <div>
          <label className="block text-sm font-medium mb-1">MRP (₹)</label>
          <input
            type="text"
            name="mrp"
            value={pricing.mrp}
            onChange={handleChange}
            placeholder="Enter MRP"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
