import React from "react";

const StockInfo: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Stock Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Current Stock:</span>
          <p>25 units</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Minimum Stock:</span>
          <p>10 units</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Status:</span>
          <p className="text-green-600 font-semibold">In Stock</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
