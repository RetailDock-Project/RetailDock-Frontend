import React, { useEffect, useState } from "react";

type ProductStockInfoProps = {
  reorderLevel: number;
  setReorderLevel: (value: number) => void;
};

const ProductStockInfo: React.FC<ProductStockInfoProps> = ({
  reorderLevel,
  setReorderLevel,
}) => {
  const [localValue, setLocalValue] = useState(reorderLevel.toString());

  useEffect(() => {
    setLocalValue(reorderLevel.toString());
  }, [reorderLevel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive integers
    if (/^\d*$/.test(value)) {
      setLocalValue(value);
      setReorderLevel(value === "" ? 0 : parseInt(value, 10));
    }
  };

  return (
    <div className="bg-white p-6 border rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Stock Information</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Reorder Level */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reorder Level
          </label>
          <input
            type="text"
            name="reorderLevel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={localValue}
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
