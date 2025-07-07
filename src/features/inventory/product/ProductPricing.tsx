import React from "react";

type PricingData = {
  costPrice: number;
  sellingPrice: number;
  mrp: number;
};

type Props = {
  pricingData: PricingData;
  setPricingData: (data: Partial<PricingData>) => void;
};

const ProductPricing: React.FC<Props> = ({ pricingData, setPricingData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow only numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPricingData({ [name]: parseFloat(value || "0") });
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
            value={pricingData.costPrice}
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
            value={pricingData.sellingPrice}
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
            value={pricingData.mrp}
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
