import React from "react";

const ProductDetailsInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md space-y-4 text-sm">
      <h2 className="text-lg font-semibold mb-4">Product Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="font-medium text-gray-700">SKU:</span>
          <p>SM-M13-BLK</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Category:</span>
          <p>Electronics</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Barcode:</span>
          <p>8901234567890</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Supplier:</span>
          <p>Samsung Electronics</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Selling Price:</span>
          <p className="text-green-600 font-semibold">₹12,999</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Cost Price:</span>
          <p className="text-gray-800">₹9,500</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Tax Rate:</span>
          <p>18%</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Margin:</span>
          <p>27%</p>
        </div>
      </div>

      <div>
        <span className="font-medium text-gray-700">Description:</span>
        <p className="mt-1 text-gray-800">
          Samsung Galaxy M13 smartphone with 4GB RAM and 64GB storage.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
