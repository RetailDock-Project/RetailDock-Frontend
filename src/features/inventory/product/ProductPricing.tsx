import React, { useState, useEffect } from "react";

type PricingData = {
  sellingPrice: number;
  mrp: number;
};

type Props = {
  pricingData: PricingData;
  setPricingData: (data: Partial<PricingData>) => void;
};

const ProductPricing: React.FC<Props> = ({ pricingData, setPricingData }) => {
  const [errors, setErrors] = useState({
    costPrice: "",
    sellingPrice: "",
    mrp: "",
  });

  const [touched, setTouched] = useState({
    costPrice: false,
    sellingPrice: false,
    mrp: false,
  });

  // Local state for string input values
  const [localValues, setLocalValues] = useState({
    sellingPrice: pricingData.sellingPrice.toString(),
    mrp: pricingData.mrp.toString(),
  });

  useEffect(() => {
    // Sync when editing existing values (e.g., fetch completed)
    setLocalValues({
      sellingPrice: pricingData.sellingPrice.toString(),
      mrp: pricingData.mrp.toString(),
    });
  }, [pricingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    setLocalValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    const numericValue = value === "" ? 0 : parseFloat(value);
    setPricingData({ [name]: numericValue });
  };

  useEffect(() => {
    const { sellingPrice, mrp } = pricingData;
    const newErrors = { costPrice: "", sellingPrice: "", mrp: "" };

    // if (touched.costPrice && touched.sellingPrice && costPrice > sellingPrice) {
    //   newErrors.sellingPrice =
    //     "Selling price should be greater than or equal to cost price.";
    // }

    if (touched.sellingPrice && touched.mrp && sellingPrice > mrp) {
      newErrors.mrp = "MRP should be greater than or equal to selling price.";
    }

    setErrors(newErrors);
  }, [pricingData, touched]);

  return (
    <div className="bg-white p-6 rounded-xl mt-6 border shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Pricing</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cost Price */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">
            Cost Price (₹)
          </label>
          <input
            type="text"
            name="costPrice"
            value={localValues.costPrice}
            onChange={handleChange}
            placeholder="Enter cost price"
            className={`w-full border rounded-md px-3 py-2 text-sm ${
              errors.costPrice ? "border-red-500" : ""
            }`}
          />
          {errors.costPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.costPrice}</p>
          )}
        </div> */}

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Selling Price (₹)
          </label>
          <input
            type="text"
            name="sellingPrice"
            value={localValues.sellingPrice}
            onChange={handleChange}
            placeholder="Enter selling price"
            className={`w-full border rounded-md px-3 py-2 text-sm ${
              errors.sellingPrice ? "border-red-500" : ""
            }`}
          />
          {errors.sellingPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>
          )}
        </div>

        {/* MRP */}
        <div>
          <label className="block text-sm font-medium mb-1">MRP (₹)</label>
          <input
            type="text"
            name="mrp"
            value={localValues.mrp}
            onChange={handleChange}
            placeholder="Enter MRP"
            className={`w-full border rounded-md px-3 py-2 text-sm ${
              errors.mrp ? "border-red-500" : ""
            }`}
          />
          {errors.mrp && (
            <p className="text-red-500 text-xs mt-1">{errors.mrp}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
