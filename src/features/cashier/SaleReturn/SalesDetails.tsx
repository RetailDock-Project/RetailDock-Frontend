import React from "react";

const SalesDetails = () => (
  <div className="bg-white border rounded-xl shadow p-6 my-6">
    <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Sales:</p>
        <p className="font-medium text-gray-800">1</p>
      </div>
      <div>
        <p className="text-gray-500">Supplier:</p>
        <p className="font-medium text-gray-800">Samsung Electronics</p>
      </div>
      <div>
        <p className="text-gray-500">Invoice:</p>
        <p className="font-medium text-gray-800">INV-2458</p>
      </div>
      <div>
        <p className="text-gray-500">Date:</p>
        <p className="font-medium text-gray-800">May 10, 2025</p>
      </div>
    </div>
  </div>
);
export { SalesDetails };
