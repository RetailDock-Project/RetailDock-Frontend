import React from "react";
import { getBase64ImageSrc } from "../../../utils/getBase64ImageSrc";
import type { ProductDetails } from "./ProductDetail";

interface ProductDetailsInfoProps {
  product: ProductDetails;
}

const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ product }) => {
  const {
    productCode,
    productCategory,
    productName,
    description,
    sellingPrice,
    costPrice,
    taxRate,
    barCodeImageBase64,
  } = product;

  return (
    <div className="bg-white rounded-xl space-y-4 text-sm">
      <h2 className="text-lg font-semibold mb-4">Product Details</h2>

      {/* ✅ Barcode on Top */}
      {barCodeImageBase64 && (
        <div>
          <p className="text-sm font-medium text-gray-700">Barcode:</p>
          <p className="mb-1">{productCode}</p>
          <img
            src={getBase64ImageSrc(barCodeImageBase64)}
            alt="Barcode"
            className="h-16 w-auto"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="font-medium text-gray-700">SKU:</span>
          <p>{productCode}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Category:</span>
          <p>{productCategory}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Product Name:</span>
          <p>{productName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Selling Price:</span>
          <p className="text-green-600 font-semibold">₹{sellingPrice}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Cost Price:</span>
          <p className="text-gray-800">₹{costPrice}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Tax Rate:</span>
          <p>{taxRate}%</p>
        </div>
      </div>

      <div>
        <span className="font-medium text-gray-700">Description:</span>
        <p className="mt-1 text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
