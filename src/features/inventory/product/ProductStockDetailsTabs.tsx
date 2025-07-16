import React, { useState } from "react";
import StockInfo from "./StockInfo";
import ProductImages from "./ProductImages";
import StockHistory from "./StockHistory";
import ProductDetailsInfo from "./ProductDetailsInfo";
import type { ProductDetails } from "./ProductDetail";

interface ProductDetailsTabsProps {
  product: ProductDetails;
}

const ProductDetailsTabs: React.FC<ProductDetailsTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");

  return (
    <div className="bg-white rounded-xl shadow-md border p-6 space-y-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "details"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Stock History
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "details" && (
        <>
          <StockInfo
            stock={product.stock}
            reOrderLevel={product.reOrderLevel}
          />{" "}
          <ProductImages images={product.productImagesBase64} />
          <ProductDetailsInfo product={product} />
        </>
      )}
      {activeTab === "history" && <StockHistory id={product.id} />}
    </div>
  );
};

export default ProductDetailsTabs;
