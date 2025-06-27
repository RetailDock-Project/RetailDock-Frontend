import React from "react";

const InventorySummary: React.FC = () => {
  return (
    <div className="bg-white border shadow rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Inventory Summary</h2>
      <div className=" text-center">
        <div className="border rounded-lg p-4 shadow-sm mb-3">
          <h3 className="text-sm text-gray-500">Value in Stock</h3>
          <p className="text-xl font-bold text-blue-600">₹2,37,500</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm mb-3">
          <h3 className="text-sm text-gray-500">Potential Revenue</h3>
          <p className="text-xl font-bold text-green-600">₹3,24,975</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm mb-3">
          <h3 className="text-sm text-gray-500">Potential Profit</h3>
          <p className="text-xl font-bold text-emerald-600">₹87,475</p>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
