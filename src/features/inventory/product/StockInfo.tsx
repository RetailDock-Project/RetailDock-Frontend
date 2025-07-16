import React from "react";

const StockInfo: React.FC<{ stock: number; reOrderLevel: number }> = ({
  stock,
  reOrderLevel,
}) => {
  let status = "In Stock";
  let statusClass = "text-green-600";

  if (stock === 0) {
    status = "Out of Stock";
    statusClass = "text-red-600";
  } else if (stock <= reOrderLevel) {
    status = "Low Stock";
    statusClass = "text-yellow-600";
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Stock Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Current Stock:</span>
          <p>{stock} units</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Minimum Stock:</span>
          <p>{reOrderLevel} units</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Status:</span>
          <p className={`font-semibold ${statusClass}`}>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
